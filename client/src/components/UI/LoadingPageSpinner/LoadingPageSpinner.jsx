import { Container } from "./LoadingPageSpinner.styled";

export function LoadingPageSpinner() {
  return (
    <Container>
      <div className="dot dot--1" />
      <div className="dot dot--2" />
      <div className="dot dot--3" />
    </Container>
  );
}
