const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Country name is mandatory"],
    //  unique: true,
  },
  code: {
    type: String,
    required: [true, "Country code is mandatory"],
  },
  flag: {
    type: String,
    required: [true, "Country flag is mandatory"],
  },
});

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide a name of place"],
      maxLength: [30, "Name of place cannot have more than 30 characters"],
    },
    description: String,
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
    photoTitle: {
      type: String,
      required: [true, "Please, provide a photo name"],
    },
    photoUrl: { type: String, required: [true, "Please, provide a photo"] },
    country: {
      type: countrySchema,
      required: true,
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
  this.latitude = Math.round(this.latitude * 1000000) / 1000000;
  this.longitude = Math.round(this.longitude * 1000000) / 1000000;

  next();
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
