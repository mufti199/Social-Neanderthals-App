const isEmpty = (string) => string.trim() === "";
const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegEx) ? true : false;
};

// Validate Sign Up

exports.validateSignupData = (data) => {
  let errors = {};

  // Email validation
  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty.";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  // Password validation
  if (isEmpty(data.password)) {
    errors.password = "Password must not be empty.";
  } else if (data.password !== data.confirmPassword) {
    errors.password = "Passwords must match";
  }

  // Handle validation
  if (isEmpty(data.handle)) {
    errors.handle = "Handle must not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

// Validate Login

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Email must not be empty";
  if (isEmpty(data.password)) errors.password = "Password must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

// Validate User Details

exports.reduceUserDetails = (data) => {
  let userDetails = {};
  // Bio
  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  // Website
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }
  // Location
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};
