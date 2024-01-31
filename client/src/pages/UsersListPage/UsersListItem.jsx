import { useNavigate } from "react-router-dom";

import { Button, Heart } from "../../components/UI";
import { useUIContext } from "../../store/context";
import { LiUsersList } from "./UsersListItem.styled";

export default function UserListItem({ user }) {
  const navigate = useNavigate();

  const { breakpoints } = useUIContext();

  return (
    <LiUsersList breakpoints={breakpoints}>
      <div className="left">
        <div className="topLevel" />
        <div className="photoContainer">
          <img
            src={user.photo}
            alt={`${user.username}s photo`}
            crossorigin="anonymous"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "img/anonymousPhoto.jpg";
            }}
          />
        </div>
        <div className="heartContainer" title="Total likes">
          <Heart likes={user.count?.likes ?? "-"} noPointer highlighted />
          <div className="heartContainer__title">TOTAL LIKES</div>
        </div>
      </div>
      <div className="right">
        <div className="topLevel">
          <span className="username">{user.username}</span>
        </div>
        <div className="details">
          <div className="countries">
            <div className="title">COUNTRIES</div>
            <div className="value">{user.count?.countries ?? "-"}</div>
          </div>
          <div className="places">
            <div className="title">PLACES</div>
            <div className="value">{user.count?.places ?? "-"}</div>
          </div>
        </div>
        <Button small smallMobile onClick={() => navigate("/" + user.username)}>
          SEE MAP
        </Button>
      </div>
    </LiUsersList>
  );
}
