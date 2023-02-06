require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
const Note = require("./models/note");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// const app = express();

// const PORT = process.env.PORT || 3001;

// // Middleware declaration
// const requestLogger = (request, response, next) => {
//   console.log("Method: ", request.method);
//   console.log("Path: ", request.path);
//   console.log("Body: ", request.body);
//   console.log("---");
//   next();
// };

// // UnknownEndpoint Middleware
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// /**
//  * Error handling middleware
//  * @param {error, request, response, next}
//  * @returns {JSON Error}
//  */
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "Malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return response.status(400).json({ error: error.message });
//   }

//   next(error);
// };

// // middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use(requestLogger);
// app.use(express.static("build"));

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// app.get("/api/notes", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
//   return;
// });

// // GET: fetches a single resource
// app.get("/api/notes/:id", (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (!note) {
//         return response.status(404).end();
//       }
//       response.json(note);
//     })
//     .catch((error) => next(error));
// });

// // DELETE Remove a single resource
// app.delete("/api/notes/:id", (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then((result) => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// // POST Add a new resource
// app.post("/api/notes", (request, response, next) => {
//   const body = request.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   note
//     .save()
//     .then((savedNote) => {
//       response.json(savedNote);
//     })
//     .catch((error) => next(error));
// });

// // PUT - Update the database
// app.put("/api/notes/:id", (request, response, next) => {
//   const { content, important } = request.body;

//   Note.findByIdAndUpdate(
//     request.params.id,
//     { content, important },
//     { new: true, runValidators: true, context: "query" }
//   )
//     .then((updatedNote) => {
//       response.json(updatedNote);
//     })
//     .catch((error) => next(error));
// });

// /**
//  *
//  * @param {no params}
//  * @returns {integer}
//  */
// function generateId() {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

//   return maxId + 1;
// }

// app.use(unknownEndpoint);

// app.use(errorHandler);

// // const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
