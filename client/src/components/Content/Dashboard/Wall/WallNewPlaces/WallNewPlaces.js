import styled from "styled-components";
import { useDataContext } from "../../../../../store/context";
import WallNewPlace from "./WallNewPlace";

export default function WallNewPlaces() {
  const { recentPlaces } = useDataContext();

  return (
    <Div>
      <p className="title">NEW PLACES</p>
      <div className="container">
        {recentPlaces &&
          recentPlaces.map((place, index) => (
            <WallNewPlace key={place._id} place={place} index={index} />
          ))}
      </div>
    </Div>
  );
}

const Div = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: var(--color-primary);
  padding: 2rem 2rem;

  height: 100%;
  width: 100%;
  /* width: 16rem; */

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--color-lightgray);

  .title {
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding-bottom: 1rem;

    border-bottom: 2px solid var(--color-primary);
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 6rem;
    margin-top: 2rem;

    /* background-color: lightblue; */
    height: 100%;

    gap: 1rem;
  }
`;
