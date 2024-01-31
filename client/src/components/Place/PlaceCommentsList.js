import PlaceComment from "./PlaceComment";
import { Container } from "./PlaceCommentsList.styled";

export default function PlaceCommentsList({ comments, type }) {
  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Container type={type}>
      {sortedComments.map((comment) => {
        return (
          <PlaceComment
            key={comment._id}
            author={comment.author}
            text={comment.text}
            commentId={comment._id}
            type={type}
          />
        );
      })}
      <div className="dummy" />
    </Container>
  );
}
