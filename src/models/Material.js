const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["audio", "quiz", "video", "text"] },
  language: String,
  audioUrl: String,
  questions: [
    {
      text: String,
      options: [String],
      answer: String,
    },
  ],
});

module.exports = mongoose.model("Material", materialSchema);
