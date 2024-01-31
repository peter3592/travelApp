import { AiOutlineLike } from "react-icons/ai";

import { useUIContext } from "../../../store/context";
import { Container } from "./WallPostLike.styled";

export default function WallPostLike({ children }) {
  const { breakpoints } = useUIContext();

  return (
    <Container breakpoints={breakpoints}>
      <AiOutlineLike className="icon" />
      <div className="postContent">{children}</div>
    </Container>
  );
}
