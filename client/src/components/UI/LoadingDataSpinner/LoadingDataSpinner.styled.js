import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ type }) => {
    if (type === "small") return "";

    return `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    `;
  }}

  .icon {
    animation: rotate 1s infinite linear;
    color: var(--color-primary);
    font-size: ${({ type }) => (type === "small" ? "1.8rem" : "3rem;")};
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
