const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide a name of place"],
      maxLength: [25, "Name of place cannot have more than 25 characters"],
    },
    description: {
      type: String,
      maxLength: [70, "Description cannot have more than 70 characters"],
    },
    location: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
        required: [true, "Place location is mandatory"],
      },
      coordinates: [Number],
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    photoCloudName: {
      type: String,
      required: [true, "Please, provide a photo name"],
    },
    photoUrl: { type: String, required: [true, "Please, provide a photo"] },
    smallPhotoUrl: String,
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    country: {
      name: {
        type: String,
        required: [true, "Country name is mandatory"],
      },
      code: {
        type: String,
        required: [true, "Country code is mandatory"],
      },
      flagUrl: {
        type: String,
        required: [true, "Country flag is mandatory"],
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Place must belong to a user."],
    },
  },
  {
    // Aby sme videli virtuálne properties,
    // musíme pridať aj options objekt do definície Schema
    //  toJSON: { virtuals: true },
    //  toObject: { virtuals: true },
    // Mongoose assigns each of your schemas an id virtual getter by default.
    // We don't wanna see it.
    // id: false,
    timestamps: true,
  }
);

placeSchema.index({ location: "2dsphere" }); // Geospatial index

/* *****
// MIDDLEWARES
   ***** */
placeSchema.pre("save", function (next) {
  // Round to 6 decimal place
  this.location.coordinates[0] =
    Math.round(this.location.coordinates[0] * 1000000) / 1000000;
  this.location.coordinates[1] =
    Math.round(this.location.coordinates[1] * 1000000) / 1000000;

  next();
});

placeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "_id username photo",
  });

  next();
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
