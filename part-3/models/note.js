const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

// Connect to the mongodb
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Create the schema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

// Transform the schema object
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// export the mongoose model
module.exports = mongoose.model("Note", noteSchema);
