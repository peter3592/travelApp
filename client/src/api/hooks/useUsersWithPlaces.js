import { useQueries } from "@tanstack/react-query";
import { getUserPlacesAPI } from "../apiPlaces";

const calcCountries = (places) => {
  const countries = new Set();

  places.forEach((place) => countries.add(place.country.name));

  return countries.size;
};

const calcLikes = (places) => {
  let likes = 0;

  places.forEach((place) => (likes += place.likes.length));

  return likes;
};

export function useUsersWithPlaces(users) {
  const usersWithPlaces = useQueries({
    queries: users
      ? users.map((user) => {
          return {
            queryKey: ["users", "userPlacesWithCounts", user.username],
            queryFn: () => getUserPlacesAPI(user.username),
            select: (data) => {
              user.count = {};

              user.count.places = data.length;
              user.count.countries = calcCountries(data);
              user.count.likes = calcLikes(data);

              return user;
            },
          };
        })
      : [], // if users is undefined, an empty array will be returned
  });

  return usersWithPlaces;
}
