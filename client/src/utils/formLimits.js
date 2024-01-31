export const usernameLimits = {
  required: "Username is required",
  minLength: {
    value: 4,
    message: "Username must have at least 4 characters",
  },
  maxLength: {
    value: 10,
    message: "Username cannot have more than 10 characters",
  },
};

export const passwordLimits = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must have at least 6 characters",
  },
  pattern: {
    value: /^[^\s]+$/,
    message: "Password cannot include spaces",
  },
};

export const confirmPasswordLimits = {
  required: "Confirm password is required",
};

export const placeCommentLimits = {
  required: "Comment cannot be empty",
};
