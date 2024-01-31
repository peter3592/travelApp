import { fetchAPI } from "../utils/fetchAPI";

export async function changeMapLanguageAPI(currentUser, newLanguage) {
  const data = await fetchAPI(`api/v1/users/${currentUser.username}`, "PATCH", {
    mapLanguage: newLanguage,
  });

  return data;
}

export async function changeMapTypeAPI(currentUser, newMapType) {
  const data = await fetchAPI(`api/v1/users/${currentUser.username}`, "PATCH", {
    mapType: newMapType,
  });

  return data;
}
