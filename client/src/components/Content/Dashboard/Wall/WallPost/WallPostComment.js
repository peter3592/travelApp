import styled from "styled-components";

import { BiCommentDetail } from "react-icons/bi";

export default function WallPostComment({ children }) {
  return (
    <Div>
      <BiCommentDetail className="icon" />
      <div className="postContent">{children}</div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  .icon {
    height: 3rem;
    width: 3rem;
    color: var(--color-green);
  }

  .strong {
    font-weight: bold;
    text-decoration: none;
    color: var(--color-green);
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
    align-items: center; */

    display: flex;
    justify-content: flex-start;
    align-items: center;

    flex-wrap: wrap;
  }
`;
