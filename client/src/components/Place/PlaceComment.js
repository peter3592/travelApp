import styled from "styled-components";
import {
  useAuthContext,
  useDataContext,
  useUIContext,
} from "../../store/context";
import { AiTwotoneDelete } from "react-icons/ai";
import fetchAPI from "../../utils/fetchAPI";
import { useNavigate } from "react-router-dom";

export default function PlaceComment({ author, text, commentId }) {
  const { currentUser } = useAuthContext();
  const { setPlace, reloadPlace, reloadData } = useDataContext();
  const { setModal } = useUIContext();

  const navigate = useNavigate();

  const deleteCommentHandler = async () => {
    const { ok } = await fetchAPI(`api/v1/comments/${commentId}`, "DELETE");

    if (!ok)
      return setModal({ type: "error", message: "Deleting comment error" });

    reloadPlace();
    reloadData();
    setModal({ type: "success", message: "Comment deleted" });
  };

  const userClickHandler = (username) => {
    setPlace(null);
    navigate(`/${username}`);
  };

  return (
    <Li>
      <div className="top">
        {!author && <p>Comment loading error</p>}
        {author && (
          <>
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
            <div className="trash">
              {currentUser._id === author._id && (
                <AiTwotoneDelete
                  className="icon"
                  onClick={deleteCommentHandler}
                />
              )}
            </div>
          </>
        )}
      </div>
      <p className="commentText">{text}</p>
    </Li>
  );
}

const Li = styled.li`
  padding: 1rem;
  /* background-color: black; */
  font-size: 2rem;

  position: relative;

  color: white;

  background-color: var(--color-comment);
  /* background-color: var(--color-secondary); */
  /* background-color: white; */
  border-radius: 10px;

  :not(:last-of-type) {
    margin-bottom: 1rem;
  }

  /* padding: 1rem; */

  .top {
    margin-bottom: 1.3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon {
    color: red;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }

  .commentUser {
    &__details {
      display: flex;
      align-items: center;
    }

    &__photo {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 1rem;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 5px 3px var(--color-primary);

      img {
        /* object-fit: contain; */
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }

    &__name {
      vertical-align: middle;
      font-size: 1.2rem;
      line-height: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      color: var(--color-primary);
    }
  }

  .commentText {
    font-size: 1.35rem;
    color: var(--color-darkgray);
    padding-left: 1rem;
  }
`;
