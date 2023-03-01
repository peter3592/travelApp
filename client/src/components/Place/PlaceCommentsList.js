import styled from "styled-components";
import PlaceComment from "./PlaceComment";

export default function PlaceCommentsList({ comments }) {
  return (
    <ListWrapper>
      {comments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((comment) => (
          <PlaceComment
            key={comment._id}
            author={comment.author}
            text={comment.text}
            commentId={comment._id}
          />
        ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;

  /* height: 25rem; */

  /* height: 20rem; */
`;
