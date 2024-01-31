import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useDataContext, useUIContext } from "../../../store/context";
import WallPostLike from "./WallPostLike";
import WallPostComment from "./WallPostComment";
import WallPostNewPlace from "./WallPostNewPlace";
import { Container } from "./WallPost.styled";
import { usePlace } from "../../../api/hooks/usePlace";
import { useCurrentUser } from "../../../api/hooks/useCurrentUser";

export default function WallPost({
  type,
  sourceUser,
  targetUser,
  place,
  createdAt,
}) {
  const { setPlace } = useDataContext();
  const { breakpoints } = useUIContext();
  const { refetch } = usePlace(place._id);
  const { currentUser } = useCurrentUser();

  const placeClickHandler = async () => {
    const { data: refetchedPlace } = await refetch();

    setPlace(refetchedPlace);
  };

  let sourceUserNameUpdated = sourceUser.username;

  let targetUserNameUpdated = (
    <Link to={`/${targetUser?.username}`} className="strong">
      <div className="wallLink">
        {targetUser?.username + "'s"}
        <div className="photoContainer">
          <img
            src={targetUser?.photo}
            crossorigin="anonymous"
            alt="Default user photo"
          />
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

  if (currentUser.username === targetUser?.username)
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
              <img
                src={sourceUser.photo}
                crossorigin="anonymous"
                alt="Default user photo"
              />
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
              <img
                src={sourceUser.photo}
                crossorigin="anonymous"
                alt="Default user photo"
              />
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

  if (type === "newPlace") {
    // New place wall post
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
              <img
                src={sourceUser.photo}
                crossorigin="anonymous"
                alt="Default user photo"
              />
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
          {breakpoints.maxWidth500 ? (
            <img
              src={place.country.flagUrl.replace("w80", "16x12")}
              crossorigin="anonymous"
              alt={`Flag of ${place.country.name}`}
            />
          ) : (
            <img
              src={place.country.flagUrl.replace("w80", "24x18")}
              crossorigin="anonymous"
              alt={`Flag of ${place.country.name}`}
            />
          )}
        </span>
      </WallPostNewPlace>
    );
  }

  return (
    <Container type={type} breakpoints={breakpoints}>
      <p className="date">{date}</p>
      <div className="container">{wallPostContent}</div>
    </Container>
  );
}
