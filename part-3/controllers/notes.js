const notesRouter = require("express").Router();
const Note = require("../models/note");

/**
 * 
 * notesRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
  return;
});
 */

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

// GET: fetches a single resource
notesRouter.get("/:id", (request, response, next) => {
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
notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// POST Add a new resource
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  try {
    const savedNote = await note.save();

    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }

  // note
  //   .save()
  //   .then((savedNote) => {
  //     response.status(201).json(savedNote);
  //   })
  //   .catch((error) => next(error));
});

// PUT - Update the database
notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
