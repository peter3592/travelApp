import { HiOutlineRefresh } from "react-icons/hi";
import { Container } from "./LoadingDataSpinner.styled";

export function LoadingDataSpinner({ type }) {
  return (
    <Container type={type}>
      <HiOutlineRefresh className="icon" />
    </Container>
  );
}
