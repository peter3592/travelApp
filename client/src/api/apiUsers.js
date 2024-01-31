import { fetchAPI } from "../utils/fetchAPI";

export async function getUserAPI(username) {
  const data = await fetchAPI(`api/v1/users/${username}`);

  return data;
}

export async function getCheckUserAPI() {
  const { user } = await fetchAPI("api/v1/users/check-user");

  return user;
}

export async function getUsersAPI() {
  const { users } = await fetchAPI("api/v1/users");

  return users;
}

export async function getGeneratedPhotoAPI() {
  const { photo } = await fetchAPI("api/v1/users/generate-photo");

  return photo;
}

export async function deleteUserAPI(username, password) {
  await fetchAPI(`api/v1/users/${username}`, "DELETE", {
    password,
  });
}
