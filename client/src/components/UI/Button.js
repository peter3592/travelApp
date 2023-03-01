import styled from "styled-components";

export default function Button({
  children,
  onClick,
  className,
  type,
  small,
  medium,
}) {
  return (
    <Btn
      onClick={onClick}
      className={className}
      type={type}
      small={small}
      medium={medium}
    >
      {children}
    </Btn>
  );
}

const Btn = styled.button`
  font-family: "Fredoka One", cursive;
  border-radius: 10rem;
  outline: none;
  z-index: 500;

  ////////
  margin: 0 auto;
  ////////

  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s all;

  background-color: ${({ type, small }) => {
    if (type === "primary") return "var(--color-primary);";
    if (type === "secondary" || small) return "var(--color-secondary);";
    if (type === "delete") return "var(--color-lightgray);";
  }};

  border: ${({ type, small }) => {
    if (type === "primary" || type === "secondary" || small)
      return "4px solid transparent;";
    if (type === "delete") return "4px solid var(--color-red);";
  }};

  color: ${({ type, small }) => {
    if (type === "primary" || type === "secondary" || small) return "white;";
    if (type === "delete") return "var(--color-red);";
  }};

  ${({ small, medium }) => {
    if (small) {
      return `
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
      letter-spacing: 1px;
      `;
    }

    if (medium) {
      return `
      padding: 1rem 1.3rem;
      font-size: 1.4rem;
      letter-spacing: 1px;
      width: 16rem;
      `;
    }

    return `
      padding: 1.2rem 1.6rem;
      font-size: 1.5rem;
      `;
  }}

  :hover {
    transform: scale(1.05);
  }

  :active {
    transform: scale(1) translateY(4px);
  }
`;
