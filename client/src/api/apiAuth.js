import { fetchAPI } from "../utils/fetchAPI";

export async function loginUserAPI(username, password) {
  const { user } = await fetchAPI("api/v1/users/login", "POST", {
    username,
    password,
  });

  return user;
}

export async function signupUserAPI(
  username,
  password,
  passwordConfirm,
  photo
) {
  const { user } = await fetchAPI("api/v1/users/signup", "POST", {
    username,
    password,
    passwordConfirm,
    photo,
  });

  return user;
}

export async function logoutUserAPI() {
  await fetchAPI("api/v1/users/logout", "POST", {});
}
