const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

// GET: fetches a single resource
notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (!note) {
    return response.status(404).end();
  }

  response.json(note);
});

// DELETE Remove a single resource
notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// POST Add a new resource
notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

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
