import { BiCommentDetail } from "react-icons/bi";

import { useUIContext } from "../../../store/context";
import { Container } from "./WallPostComment.styled";

export default function WallPostComment({ children }) {
  const { breakpoints } = useUIContext();

  return (
    <Container breakpoints={breakpoints}>
      <BiCommentDetail className="icon" />
      <div className="postContent">{children}</div>
    </Container>
  );
}
