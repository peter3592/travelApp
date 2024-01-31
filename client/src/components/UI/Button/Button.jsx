import { Container } from "./Button.styled";

export function Button({
  children,
  onClick,
  className,
  type,
  smallMobile,
  small,
  medium,
}) {
  return (
    <Container
      onClick={onClick}
      className={className}
      type={type}
      smallMobile={smallMobile}
      small={small}
      medium={medium}
    >
      {children}
    </Container>
  );
}
