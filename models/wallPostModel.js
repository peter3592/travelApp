const mongoose = require("mongoose");

const wallPostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["newPlace", "like", "comment"],
      required: [true, "Type of wall post is not defined"],
    },
    sourceUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Wall post must have an origin person."],
    },
    targetUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    place: {
      type: mongoose.Schema.ObjectId,
      ref: "Place",
      required: [true, "Comment must belong to a place"],
    },
  },
  {
    timestamps: true,
  }
);

wallPostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sourceUser",
    select: "_id username photo",
  });

  this.populate({
    path: "targetUser",
    select: "_id username photo",
  });

  this.populate({
    path: "place",
    select: "_id name photoUrl smallPhotoUrl country -user",
  });

  next();
});

const WallPost = mongoose.model("WallPost", wallPostSchema);

module.exports = WallPost;
