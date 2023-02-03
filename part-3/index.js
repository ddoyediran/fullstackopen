// const { response, request } = require("express");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");
// const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3001;

// const password = process.argv[2];

// const url = `mongodb+srv://noteapp:${password}@cluster0.4idts.mongodb.net/noteApp?retryWrites=true&w=majority`;

// const Note = mongoose.model("Note", noteSchema);

// Middleware declaration
const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

// UnknownEndpoint Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

/**
 * Error handling middleware
 * @param {error, request, response, next}
 * @returns {JSON Error}
 */
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  }

  next(error);
};

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(requestLogger);
app.use(express.static("build"));

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2022-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2022-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2022-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  //response.json(notes);
  Note.find({}).then((notes) => {
    response.json(notes);
  });
  return;
});

// // GET: fetches a single resource
// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   console.log(id);
//   const note = notes.find((note) => {
//     return note.id === id;
//   });
//   if (note) {
//     return response.json(note);
//   }

//   return response.status(404).end();
// });

// GET: fetches a single resource
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }
      response.json(note);
    })
    .catch((error) => next(error));
});

// DELETE Remove a single resource
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// POST
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// PUT - Update the database
app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

/**
 *
 * @param {no params}
 * @returns {integer}
 */
function generateId() {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
}

app.use(unknownEndpoint);

app.use(errorHandler);

// const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
