import { useState } from "react";

import UserListItem from "./UsersListItem";
import UsersSort from "./UsersSort";
import { LoadingPageSpinner } from "../../components/UI";
import { Container } from "./UsersListPage.styled";
import { useUsers } from "../../api/hooks/useUsers";
import { useUsersWithPlaces } from "../../api/hooks/useUsersWithPlaces";
import useShowErrorModal from "../../api/hooks/useShowErrorModal";

export function UsersListPage() {
  const [sortedUsers, setSortedUsers] = useState(null);

  // Loading users
  const { isLoading: isLoadingUsers, error: errorUsers, users } = useUsers();
  useShowErrorModal(errorUsers, isLoadingUsers, "Loading users error");

  // Loading places of users
  const usersWithPlaces = useUsersWithPlaces(users);
  const isLoadingPlaces = usersWithPlaces.some(
    (userWithPlaces) => userWithPlaces.isLoading
  );
  const errorUserPlaces = usersWithPlaces.some(
    (userWithPlaces) => userWithPlaces.error
  );
  useShowErrorModal(
    errorUserPlaces,
    isLoadingPlaces,
    "Missing details of some user. Sorting unavailable."
  );

  const isLoading = isLoadingUsers || isLoadingPlaces;

  const sortUsers = (category, descending) => {
    let tempSortedUsers = [...users];

    if (category === "likes" || category === "places")
      tempSortedUsers.sort((a, b) =>
        descending
          ? b.count[category] - a.count[category]
          : a.count[category] - b.count[category]
      );

    if (category === "name")
      tempSortedUsers.sort((a, b) =>
        descending
          ? b.username.localeCompare(a.username)
          : a.username.localeCompare(b.username)
      );

    setSortedUsers(tempSortedUsers);
  };

  const usersComponents = sortedUsers
    ? sortedUsers?.map((user) => <UserListItem key={user._id} user={user} />)
    : users?.map((user) => <UserListItem key={user._id} user={user} />);

  return (
    <Container>
      {!isLoading && !errorUserPlaces && <UsersSort onSortChange={sortUsers} />}
      {isLoading ? (
        <LoadingPageSpinner />
      ) : (
        <div className="users">
          <ul className="users__list">{usersComponents}</ul>
        </div>
      )}
    </Container>
  );
}
