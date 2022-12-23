const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide your database password");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://noteapp:${password}@cluster0.4idts.mongodb.net/noteApp?retryWrites=true&w=majority`;

// Create Schema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

// Instance of the Schema model
const Note = mongoose.model("Note", noteSchema);

// Connect to the database
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const note = new Note({
      content: "HTML is Easy",
      date: new Date(),
      important: true,
    });

    return note.save();
  })
  .then(() => {
    console.log("note saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
