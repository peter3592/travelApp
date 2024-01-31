import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiForbid2Line } from "react-icons/ri";
import { useDataContext } from "../../store/context";
import { LiPlaceComment } from "./PlaceComment.styled";
import { useDeleteComment } from "../../api/hooks/useDeleteComment";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

export default function PlaceComment({ author, text, commentId, type }) {
  const { currentUser } = useCurrentUser();
  const { setPlace } = useDataContext();
  const navigate = useNavigate();
  const { deleteComment } = useDeleteComment();

  const deleteCommentHandler = () => deleteComment(commentId);

  const userClickHandler = (username) => {
    setPlace(null);
    navigate(`/${username}`);
  };

  return (
    <LiPlaceComment type={type}>
      <div className="commentContainer">
        <div className="commentTop">
          <div className="commentUser__details">
            <div className="commentUser__photo">
              <img
                src={author.photo}
                alt={`${author.photo}'s photo`}
                onClick={() => userClickHandler(author.username)}
                crossorigin="anonymous"
              />
            </div>
            <p
              className="commentUser__name"
              onClick={() => userClickHandler(author.username)}
            >
              {author.username}
            </p>
          </div>
        </div>
        <div className="comment">
          <p className="comment__text">{text}</p>
          <div>
            {currentUser._id === author._id && type === "screen" && (
              <AiTwotoneDelete
                className="icon"
                onClick={deleteCommentHandler}
              />
            )}
            {currentUser._id === author._id && type === "mobile" && (
              <RiForbid2Line className="icon" onClick={deleteCommentHandler} />
            )}
          </div>
        </div>
      </div>
      {type === "mobile" && <div className="mobileLine" />}
    </LiPlaceComment>
  );
}
