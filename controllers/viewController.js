const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get tour data from collection
  const tours = await Tour.find();

  // Render that template using tour data
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // Get data for the requested tour
  const tour = await Tour.findOne({
    slug: req.params.slug,
  }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!tour) {
    return next(new AppError("There is no tour with that name", 404));
  }

  // Render template using data
  res.status(200).set("Content-Security-Policy").render("tour", {
    title: tour.title,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).set("Content-Security-Policy").render("login", {
    title: "Log into your account",
  });
};

exports.getSignupForm = (req, res) => {
  console.log("requested signup form");
  res.status(200).render("signup", {
    title: "Sign up",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your acccount",
  });
};

exports.getMyTour = catchAsync(async (req, res, next) => {
  // Find all bookings
  const bookings = await Booking.find({
    user: req.user.id,
  });

  // Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("overview", {
    title: "My Tours",
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidator: true,
    }
  );
  res.status(200).render("account", {
    title: "Your acccount",
    user: updatedUser,
  });
});
