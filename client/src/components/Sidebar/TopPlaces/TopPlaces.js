import styled from "styled-components";
import { useDataContext } from "../../../store/context";
import TopPlaceItem from "./TopPlaceItem";

export default function TopPlaces({ username }) {
  const { topPlaces } = useDataContext();

  return (
    <Div>
      <div className="title">MOST LIKED PLACES</div>
      <div className="topPlacesContainer">
        {topPlaces.map((place) => (
          <TopPlaceItem key={place._id} place={place} />
        ))}
      </div>
    </Div>
  );
}

const Div = styled.div`
  background-color: var(--color-lightgray);
  padding: 1rem;
  width: 100%;
  height: 23rem;

  display: flex;
  flex-direction: column;

  .title {
    width: 65%;

    color: var(--color-primary);
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    /* padding: 0 4rem 1rem; */
    padding-bottom: 1rem;

    border-bottom: 2px solid var(--color-primary);

    margin-bottom: 1rem;

    align-self: center;
  }

  .topPlacesContainer {
    display: flex;
    flex-direction: column;
  }
`;
