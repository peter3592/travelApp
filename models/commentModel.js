const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must have an author"],
    },
    place: {
      type: mongoose.Schema.ObjectId,
      ref: "Place",
      required: [true, "Comment must belong to a place"],
    },
    text: {
      type: String,
      maxLength: [100, "Comment cant have more than 100 characters"],
      required: [true, "Comment must have a text"],
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "_id username photo",
  });

  this.populate({
    path: "place",
    select: "_id name",
  });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
