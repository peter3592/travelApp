import { useTopPlaces } from "../../../api/hooks/useTopPlaces";
import TopPlaceItem from "./TopPlaceItem";
import { Container } from "./TopPlaces.styled";

export default function TopPlaces() {
  const { topPlaces } = useTopPlaces();

  return (
    <Container>
      <div className="title">MOST LIKED PLACES</div>
      <div className="topPlacesContainer">
        {topPlaces &&
          topPlaces.map((place) => (
            <TopPlaceItem key={place._id} place={place} />
          ))}
      </div>
    </Container>
  );
}
