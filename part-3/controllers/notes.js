const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

// GET: fetches a single resource
notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);

    if (!note) {
      return response.status(404).end();
    }

    response.json(note);
  } catch (exception) {
    next(exception);
  }
});

// DELETE Remove a single resource
notesRouter.delete("/:id", async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// POST Add a new resource
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();

  response.status(201).json(savedNote);
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
