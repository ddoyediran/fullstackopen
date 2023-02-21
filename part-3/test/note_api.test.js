const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);
const Note = require("../models/note");

// const initialNotes = [
//   {
//     content: "HTML is easy",
//     important: false,
//     date: new Date(),
//   },
//   {
//     content: "Browser can execute only JavaScript",
//     important: true,
//     date: new Date(),
//   },
// ];

// delete all data in the database and add new ones
beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
});

// test("notes are returned as json", async () => {
//   await api
//     .get("api/notes")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// }, 10000);

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);

  expect(contents).toContain("Browser can execute only JavaScript");
});

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
    //date: new Date(),
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);

  expect(contents).toContain("async/await simplifies making async calls");
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
    date: new Date(),
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
