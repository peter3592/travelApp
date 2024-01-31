import { fetchAPI } from "../utils/fetchAPI";

export async function deletePlaceAPI(id) {
  await fetchAPI(`api/v1/places/${id}`, "DELETE");
}

export async function getUserPlacesAPI(username) {
  const { places } = await fetchAPI(`api/v1/users/${username}/places`);

  return places.reverse();
}

export async function getRecentPlacesAPI() {
  const { recentPlaces } = await fetchAPI("api/v1/places/recent-places");

  return recentPlaces;
}

export async function getTopPlacesAPI() {
  const { topPlaces } = await fetchAPI("api/v1/places/top-places");

  return topPlaces;
}

export async function getWallPostsAPI(page, limit) {
  const { wallPosts } = await fetchAPI(
    `api/v1/wallposts?page=${page}&limit=${limit}`
  );

  return wallPosts;
}

export async function getPlaceAPI(id) {
  const { place } = await fetchAPI(`api/v1/places/${id}`);

  return place;
}

export async function addPlaceAPI(data) {
  await fetchAPI("api/v1/places/", "POST", data);
}

export async function likePlaceAPI(id) {
  const { place } = await fetchAPI(`api/v1/places/${id}/like`, "PATCH");

  return place;
}

export async function getCountryAPI(latitude, longitude) {
  const data = await fetchAPI("api/v1/places/get-country", "POST", {
    latitude,
    longitude,
  });

  return data;
}

export async function commentPlaceAPI(placeId, comment) {
  const { place } = await fetchAPI("api/v1/comments/", "POST", {
    placeId,
    text: comment,
  });

  return place;
}

export async function deleteCommentAPI(commentId) {
  await fetchAPI(`api/v1/comments/${commentId}`, "DELETE");
}

export async function getPlacesAPI() {
  const { places } = await fetchAPI("api/v1/places");

  return places;
}
