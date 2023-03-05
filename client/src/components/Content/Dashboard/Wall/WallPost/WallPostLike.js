import { AiOutlineLike } from "react-icons/ai";
import styled from "styled-components";
export default function WallPostLike({ children }) {
  return (
    <Div>
      <AiOutlineLike className="icon" />
      <div className="postContent">{children}</div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  /* transition: all 1s; */

  .icon {
    height: 3rem;
    width: 3rem;
    /* flex-basis: 3rem;
    flex-shrink: 0; */
    color: var(--color-pink);
    /* transition: all 1s; */
  }

  .strong {
    font-weight: bold;
    text-decoration: none;
    color: var(--color-pink);
    cursor: pointer;
  }

  .wallLink {
    display: flex;
    align-items: center;
    /* gap: 0.3rem; */
  }

  .postContent {
    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1; */

    display: flex;
    justify-content: flex-start;
    align-items: center;

    flex-wrap: wrap;
  }
`;
