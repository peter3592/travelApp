import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { FaRegTimesCircle } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import { ImArrowDown } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useDataContext, useUIContext } from "../../store/context";
import PlaceCommentsList from "./PlaceCommentsList";
import { Heart } from "../UI";
import { placeCommentLimits } from "../../utils";
import { Mobile, Screen } from "./PlaceSidebar.styled";
import { useLikePlace } from "../../api/hooks/useLikePlace";
import { useCommentPlace } from "../../api/hooks/useCommentPlace";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

export default function PlaceSidebar({ titleColor, type }) {
  const [openMobileComments, setOpenMobileComments] = useState(false);
  const { place, setPlace } = useDataContext();
  const { currentUser } = useCurrentUser();

  const { setModal } = useUIContext();
  const navigate = useNavigate();
  const { likePlace } = useLikePlace();
  const { commentPlace } = useCommentPlace();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const likePlaceHandler = () => likePlace(place._id);

  const commentSubmitHandler = async (data, e) => {
    e.preventDefault();

    commentPlace([place._id, data.commentText]);

    e.target.reset();
  };

  const commentErrorsHandler = () => {
    if (errors.commentText?.message)
      setModal({
        type: "error",
        message: errors.commentText.message,
      });
  };

  const userClickHandler = () => {
    setPlace(null);
    navigate(`/${place.user.username}`);
  };

  if (type === "mobile")
    return (
      <Mobile openMobileComments={openMobileComments}>
        <div className="top">
          <FaRegTimesCircle
            className="exitIcon"
            onClick={() => {
              setPlace(null);
              setOpenMobileComments(false);
            }}
          />
          <div className="top__details">
            <div className="user">
              <div className="user__photo">
                <img
                  src={place.user.photo}
                  alt={`${place.user.username}'s photo`}
                  onClick={userClickHandler}
                  crossorigin="anonymous"
                />
              </div>
              <div className="user__details">
                <div className="user__name" onClick={userClickHandler}>
                  {place.user.username}
                </div>
              </div>
            </div>
            <div className="place">
              <p className="place__name">{place.name}</p>
              {place.description && (
                <p className="place__description">{place.description}</p>
              )}
            </div>
            <div className="icons">
              <Heart
                likes={place.likes.length}
                highlighted={place.likes.includes(currentUser._id)}
                onHeartClick={likePlaceHandler}
              />
            </div>
          </div>
          <div
            className={
              openMobileComments
                ? "top__arrowContainer rotated"
                : "top__arrowContainer"
            }
          >
            <ImArrowDown
              onClick={() => setOpenMobileComments((prev) => !prev)}
              className="top__arrow"
            />
          </div>
        </div>
        <div className="mobileComments">
          <form
            onSubmit={handleSubmit(commentSubmitHandler, commentErrorsHandler)}
            className="form"
          >
            <input
              type="text"
              placeholder="Write comment ..."
              id="placeImage"
              className="comment"
              {...register("commentText", {
                required: placeCommentLimits.required,
              })}
            />
            <div className="addCommentIcon">
              <button type="submit">
                <RiSendPlane2Fill className="icon" />
              </button>
            </div>
          </form>
          <PlaceCommentsList comments={place.comments} type="mobile" />
        </div>
      </Mobile>
    );

  if (type === "screen")
    return (
      <Screen titleColor={titleColor}>
        <FaRegTimesCircle className="exitIcon" onClick={() => setPlace(null)} />
        <div className="helperBox">
          <div className="sectionTop">
            <div className="user">
              <div className="user__photo">
                <img
                  src={place.user.photo}
                  alt={`${place.user.username}'s photo`}
                  onClick={userClickHandler}
                  crossorigin="anonymous"
                />
              </div>
              <div className="user__details">
                <div className="user__name" onClick={userClickHandler}>
                  {place.user.username}
                </div>
                <Moment className="user__date" format="DD.MM.YYYY, HH:mm">
                  {place.createdAt}
                </Moment>
              </div>
            </div>
            <p className="place__name">{place.name}</p>
            {place?.description && (
              <p className="place__description">{place.description}</p>
            )}
          </div>
          <div className="heartContainer">
            <Heart
              likes={place.likes.length}
              size="big"
              highlighted={place.likes.includes(currentUser._id)}
              onHeartClick={likePlaceHandler}
            />
          </div>
          <div className="sectionComments">
            <form
              onSubmit={handleSubmit(
                commentSubmitHandler,
                commentErrorsHandler
              )}
              className="form"
            >
              <input
                type="text"
                placeholder="Write comment ..."
                id="placeImage"
                className="comment"
                {...register("commentText", {
                  required: placeCommentLimits.required,
                })}
              />
              <div className="addCommentIcon">
                <button type="submit">
                  <RiSendPlane2Fill className="icon" />
                </button>
              </div>
            </form>
            <PlaceCommentsList comments={place.comments} type="screen" />
          </div>
        </div>
      </Screen>
    );
}
