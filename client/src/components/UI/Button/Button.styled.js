import styled from "styled-components";

export const Container = styled.button`
  font-family: "Fredoka One", cursive;
  border-radius: 10rem;
  outline: none;
  z-index: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s all;

  background-color: ${({ type, small }) => {
    if (type === "delete") return "var(--color-lightgray);";
    if (type === "primary") return "var(--color-primary);";
    if (type === "secondary" || small) return "var(--color-secondary);";
  }};

  border: ${({ type, small }) => {
    if (type === "delete")
      return small
        ? "2px solid var(--color-red);"
        : "4px solid var(--color-red);";
    if (type === "primary" || type === "secondary" || small)
      return "4px solid transparent;";
  }};

  color: ${({ type, small }) => {
    if (type === "delete") return "var(--color-red);";
    if (type === "primary" || type === "secondary" || small) return "white;";
  }};

  ${({ smallMobile, small, medium }) => {
    if (smallMobile) {
      return `
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      letter-spacing: 1px;
      `;
    }

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
