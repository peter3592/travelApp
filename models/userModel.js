const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const settingsSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["sk", "en", "de", "fr", "es"],
      default: "en",
    },
    mapType: {
      type: String,
      enum: ["m", "y"],
      default: "m",
    },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please, provide an username"],
      unique: true,
      validate: [
        validator.isAlphanumeric,
        "Please, use only letters and numbers in username",
      ],
      minLength: [4, "Username must have at least 4 characters"],
      maxLength: [15, "Username cannot have more than 15 characters"],
    },
    email: {
      type: String,
      required: [true, "Please, provide an email"],
      unique: true,
      validate: [validator.isEmail, "Please, provide valid email"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please, provide a password"],
      minLength: [4, "Password must have at least 4 characters."],
      select: false, // never show when quering users
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please, confirm your password"],
      validate: {
        // this only works with methods .save() or .create()
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    settings: {
      type: settingsSchema,
      required: true,
      default: {
        language: "en",
        mapType: "m",
      },
    },
    // passwordChangedAt: { type: Date, default: Date.now() },
    passwordChangedAt: Date,
    // active: { type: Boolean, default: true, select: false },
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

/* *****
// MIDDLEWARES
   ***** */

userSchema.pre("save", async function (next) {
  // Osetrenie aby sme sifrovali heslo iba ked dojde k zmene (k vytvoreniu)
  // hesla, nie napr. ked si uzivatel zmeni iba meno
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// Update passwordChangedAt fields after change of password but no when the document is new
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // -1000 (-1 sec) is to prevent edge situation that sometimes might occur that JWT token is created before password is changed
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// Query middlewares - filter out all deleted (inactive) users
userSchema.pre(/^find/, function (next) {
  // this = current query
  // this.find({ active: { $ne: false } });

  next();
});

/* *****
// INSTANCE METHODS
   ***** */

// Check passwords
userSchema.methods.correctPassword = async function (candinatePass) {
  // this = current document
  // we can use this.password, because password select = false in Model
  return await bcrypt.compare(candinatePass, this.password);
};

// Check if password was changed after receiving JWT
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // this = current document

  // return false = password not changed
  // return true  = password changed

  // Password was not changed yet
  if (!this.passwordChangedAt) return false;

  const changedTimestamp = parseInt(
    this.passwordChangedAt.getTime() / 1000,
    10
  );

  return JWTTimestamp < changedTimestamp;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
