import { useRecentPlaces } from "../../../api/hooks/useRecentPlaces";
import WallNewPlace from "./WallNewPlace";
import { Container } from "./WallNewPlaces.styled";

export default function WallNewPlaces() {
  const { recentPlaces } = useRecentPlaces();

  return (
    <Container>
      <p className="title">NEW PLACES</p>
      <div className="container">
        {recentPlaces &&
          recentPlaces.map((place, index) => (
            <WallNewPlace key={place._id} place={place} index={index} />
          ))}
      </div>
    </Container>
  );
}
