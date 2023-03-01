import Wall from "./Wall/Wall";
import styled from "styled-components";

export default function Dashboard() {
  return (
    <Div>
      <Wall />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: calc(100% - var(--header-height));
  background-color: white;

  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  font-size: 5rem;

  position: relative;
`;
