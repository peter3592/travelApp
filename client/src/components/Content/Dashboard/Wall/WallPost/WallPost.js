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
        <p>&nbsp;liked&nbsp;</p>
        {targetUserNameUpdated}
        <p>&nbsp;place&nbsp;</p>
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
        {/* {type === "like" ? "liked" : "wrote comment on "} */}
        {/* <p>&nbsp;wrote comment on&nbsp;</p> */}
        <span>&nbsp;</span>
        <span>wrote&nbsp;</span>
        <span>comment&nbsp;</span>
        <span>on&nbsp;</span>
        {targetUserNameUpdated}
        <p>&nbsp;place&nbsp;</p>
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
    wallPostContent = (
      <WallPostNewPlace
        placePhoto={place.photoUrl}
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
        {/* <span>&nbsp;added new place&nbsp;</span> */}
        {/* {` added new place ${&#160;}`} */}
        {/* <>&nbsp;added new place&nbsp;</> */}
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
        {/* <span
          className="strong"
          data-placeid={place._id}
          onClick={placeClickHandler}
        >
          {place.name}
        </span> */}
        {/* <span>&nbsp;</span> */}
        <span>located&nbsp;</span>
        <span>in&nbsp;</span>
        <span>place&nbsp;</span>
        <span>{place.country.name}</span>
        {/* <span>{`located in ${place.country.name}`}</span> */}
        <span>&nbsp;&nbsp;</span>
        {/* <span>&nbsp;</span> */}
        <img
          src={place.country.flagUrl.replace("w80", "32x24")}
          crossorigin="anonymous"
          className="wallPost__flag"
        />
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
  width: 100%;

  overflow: hidden;

  :not(:last-of-type) {
    margin-bottom: 1.2rem;
  }

  .container {
    width: 100%;

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
    /* background-color: lightblue;
    border-left: solid black; */
    

    border-width: 0.6rem;
    /* border-width: 1.2rem; */
    border-style: solid;

    border-top-width: 0;
    border-bottom-width: 0;
    border-right-width: 0;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 1.2rem 1rem;
    font-size: 1.5rem;

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
