import {
  useAuthContext,
  useDataContext,
  useUIContext,
} from "../../../../../store/context";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import fetchAPI from "../../../../../utils/fetchAPI";
import styled from "styled-components";
import WallPostLike from "./WallPostLike";
import WallPostComment from "./WallPostComment";
import WallPostNewPlace from "./WallPostNewPlace";

export default function WallPost({
  hide,
  type,
  sourceUser,
  targetUser,
  place,
  createdAt,
}) {
  const { setPlace, reloadData } = useDataContext();
  const { currentUser } = useAuthContext();
  const { setModal } = useUIContext();

  const placeClickHandler = async (e) => {
    const placeId = e.target.dataset.placeid;

    const { ok, data } = await fetchAPI(`api/v1/places/${placeId}`);

    if (!ok) {
      reloadData();
      return setModal({
        type: "error",
        message: "Place does not exists anymore",
      });
    }

    setPlace(data.place);
  };

  let sourceUserNameUpdated = sourceUser.username;

  let targetUserNameUpdated = (
    <Link to={`/${targetUser?.username}`} className="strong">
      <div className="wallLink">
        {targetUser?.username + "'s"}
        <div className="photoContainer">
          <img src={targetUser?.photo} crossorigin="anonymous" />
        </div>
      </div>
    </Link>
  );

  if (currentUser.username === sourceUser.username)
    sourceUserNameUpdated = "You";

  if (
    currentUser.username === sourceUser.username &&
    sourceUser.username === targetUser?.username
  )
    targetUserNameUpdated = "your own";

  if (
    currentUser.username === targetUser?.username
    // && currentUser.username !== targetUser
  )
    targetUserNameUpdated = "your";

  if (
    sourceUser.username === targetUser?.username &&
    currentUser.username !== sourceUser.username
  )
    targetUserNameUpdated = "his own";

  const date = <Moment format="HH:mm, DD.MM.YYYY">{createdAt}</Moment>;

  let wallPostContent;

  if (type === "like")
    wallPostContent = (
      <WallPostLike>
        <Link to={`/${sourceUser.username}`} className="strong">
          <div className="wallLink">
            {sourceUserNameUpdated}
            <div className="photoContainer">
              <img src={sourceUser.photo} crossorigin="anonymous" />
            </div>
          </div>
        </Link>
        <span>&nbsp;liked&nbsp;</span>
        <span>{targetUserNameUpdated}</span>
        <span>&nbsp;place&nbsp;</span>
        <span
          className="strong"
          data-placeid={place._id}
          onClick={placeClickHandler}
        >
          {place.name}
        </span>
      </WallPostLike>
    );

  if (type === "comment")
    wallPostContent = (
      <WallPostComment>
        <Link to={`/${sourceUser.username}`} className="strong">
          <div className="wallLink">
            {sourceUserNameUpdated}
            <div className="photoContainer">
              <img src={sourceUser.photo} crossorigin="anonymous" />
            </div>
          </div>
        </Link>{" "}
        <span>&nbsp;wrote&nbsp;</span>
        <span>comment</span>
        <span>&nbsp;on&nbsp;</span>
        <span>{targetUserNameUpdated}</span>
        <span>&nbsp;place&nbsp;</span>
        <span
          className="strong"
          data-placeid={place._id}
          onClick={placeClickHandler}
        >
          {place.name}
        </span>
      </WallPostComment>
    );

  // New place wall post
  if (type === "newPlace") {
    // console.log("place:", place);

    wallPostContent = (
      <WallPostNewPlace
        placePhoto={place.smallPhotoUrl}
        countryFlagUrl={place.country.flagUrl}
        placeId={place._id}
        onPhotoClick={placeClickHandler}
      >
        <Link to={`/${sourceUser.username}`} className="strong">
          <div className="wallLink">
            {sourceUserNameUpdated}
            <div className="photoContainer">
              <img src={sourceUser.photo} crossorigin="anonymous" />
            </div>
          </div>
        </Link>
        <span>added&nbsp;</span>
        <span>new&nbsp;</span>
        <span>place&nbsp;</span>
        {place.name.split(" ").map((word) => (
          <span
            className="strong"
            data-placeid={place._id}
            onClick={placeClickHandler}
          >
            {word}&nbsp;
          </span>
        ))}
        <span>located&nbsp;</span>
        <span>in&nbsp;</span>
        <span className="country">
          <span>{place.country.name}&nbsp;&nbsp;</span>
          {/* <div className="cube"> */}
          <img
            src={place.country.flagUrl.replace("w80", "32x24")}
            crossorigin="anonymous"
          />
          {/* </div> */}
        </span>
      </WallPostNewPlace>
    );
  }

  return (
    <Div type={type}>
      <p className="date">{date}</p>
      <div className="container">{wallPostContent}</div>
    </Div>
  );
}

const Div = styled.div`
  :not(:last-of-type) {
    margin-bottom: 1.2rem;
  }

  line-height: 20px;

  /* .cube {
    width: 32px;
    height: 24px;
    background-color: purple;

    display: flex;
    justify-content: center;
    align-items: center;
  } */

  .container {
    ${({ type }) => {
      if (type === "newPlace")
        return ` 
      background-color: var(--color-light-blue);
      border-color:  var(--color-blue);
      `;

      if (type === "comment")
        return ` 
      background-color: var(--color-light-green);
      border-color:  var(--color-green);
      `;

      if (type === "like")
        return ` 
        background-color: var(--color-light-pink);
        border-color:  var(--color-pink);
      `;
    }}

    border-width: 0.6rem;
    border-style: solid;

    border-top-width: 0;
    border-bottom-width: 0;
    border-right-width: 0;

    padding: 1rem 1rem;
    font-size: 1.3rem;

    border-radius: 5px;
  }

  .date {
    font-size: 1rem;
    color: var(--color-gray);
  }

  .photoContainer {
    height: 2.4rem;
    width: 2.4rem;

    border-radius: 50%;

    overflow: hidden;
    margin: 0 0.3rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
