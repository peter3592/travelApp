const catchAsync = require("../utils/catchAsync");
const Place = require("./../models/placeModel");
const AppError = require("../utils/AppError");
const countryCodes = require("./../utils/countryCodes");

const getCountryCode = async function (lat, lng) {
  try {
    const response = await fetch(
      `https://api.geocod.io/v1.7/reverse?api_key=${process.env.GEOCODIO_API_KEY}&q=${lat},${lng}`
    );

    const resData = await response.json();

    if (resData.results.length > 0)
      return resData.results[0].address_components.country.toLowerCase();

    // Not supported states. Get state from error message (fe: 'SK is not currently a Geocodio-supported country)
    const countryCode = resData._warnings[0].slice(0, 2).toLowerCase();
    // Fix bug countries
    if (countryCode === "-9" && lat < 51.2) return "fr"; // France
    if (countryCode === "-9" && lat > 57.9) return "no"; // Norway

    return countryCode;
  } catch (err) {
    // Fix Canada bug
    if (lat > 51 && lat < 80 && lng > -140.995 && lng < -52.4) return "ca";

    return null;
  }
};

// const getCountryFlagUrl = async function (countryCode) {
//   const countryFlag = `https://flagcdn.com/w80/${countryCode}.png`;

//   try {
//     const response = await fetch(countryFlag);

//     console.log("response", response);

//     const resData = await response.json();

//     console.log("resData", resData);

//     // Check if flag really exists
//     if (resData) return countryFlag;

//     return null;
//   } catch (err) {
//     console.log("Flag error");
//     return null;
//   }
// };

exports.createPlace = catchAsync(async function (req, res, next) {
  if (process.env.NODE_ENV === "development") {
    // console.log(newPlace);
    console.log("Cookies:", req.cookies);
  }

  const { name, latitude, longitude, photoUrl, description } = req.body;
  const photoTitle = req.file?.filename || "dummy";

  if (!latitude) return next(new AppError("Please, provide a latitude", 400));
  if (!longitude) return next(new AppError("Please, provide a longitude", 400));

  // Check if there is no place with same latitude and longitude
  const place = await Place.findOne({
    "location.coordinates": [longitude, latitude],
  });

  if (place)
    return next(
      new AppError("Place with same coordinates already exists", 400)
    );

  const countryCode = await getCountryCode(latitude, longitude);

  console.log("CC", countryCode);

  if (!countryCode)
    return res.status(400).json({
      status: "fail",
      message: "Unable to find country with this coordinates",
    });

  const countryFlag = `https://flagcdn.com/w80/${countryCode}.png`;

  const countryName =
    countryCode === "us"
      ? "United States of America"
      : JSON.parse(countryCodes.codes)[countryCode];

  const newPlace = await Place.create({
    name,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    "country.name": countryName,
    "country.flag": countryFlag,
    "country.code": countryCode,
    photoTitle,
    photoUrl,
    // description,
    // user: req.currentUser,
    user: "63a0a4275b8d6762a534d9c5",
  });

  res.status(201).json({
    status: "success",
    data: {
      place: newPlace,
    },
  });
});
