import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import styled from "styled-components";
import fetchAPI from "../../../utils/fetchAPI";
import UsersSort from "./UsersSort";
import LoadingSpinner from "../../UI/LoadingSpinner";

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

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { ok, data } = await fetchAPI("api/v1/users/");

      await Promise.all(
        data.users.map(async (user) => {
          const { ok, data } = await fetchAPI(
            `api/v1/users/${user.username}/places`
          );

          user.count = {};

          user.count.places = data.places.length;
          user.count.countries = calcCountries(data.places);
          user.count.likes = calcLikes(data.places);
        })
      );

      if (ok)
        setUsers(data.users.sort((a, b) => b.count.likes - a.count.likes));

      setLoading(false);
    })();
  }, []);

  const sortUsers = (category, descending) => {
    let sortedUsers = [...users];

    if (category === "likes" || category === "places")
      sortedUsers.sort((a, b) =>
        descending
          ? b.count[category] - a.count[category]
          : a.count[category] - b.count[category]
      );

    if (category === "name")
      sortedUsers.sort((a, b) =>
        descending
          ? b.username.localeCompare(a.username)
          : a.username.localeCompare(b.username)
      );

    return setUsers(sortedUsers);
  };

  return (
    <Div>
      <UsersSort onSortChange={sortUsers} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="users">
          <ul className="users__list">
            {users.length > 0 &&
              users.map((user) => <UserListItem key={user._id} user={user} />)}
          </ul>
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  height: calc(100% - var(--header-height));
  padding: 2rem;

  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  display: flex;
  flex-direction: column;

  position: relative;

  .users {
    overflow-y: auto;
    overflow-x: hidden;

    background-color: white;

    &__list {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(25rem, 25rem));
      /* grid-template-rows: min-content; */
      justify-content: center;
    }
  }
`;
