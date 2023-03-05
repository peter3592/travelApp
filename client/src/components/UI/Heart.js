import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import styled from "styled-components";
// import useIsMounted from "../../hooks/useIsMounted";

export default function Heart(props) {
  const { likes, size, highlighted, placeLiked } = props;

  return (
    <Container
      size={size}
      highlighted={highlighted}
      onClick={props.onClick}
      className={props.className}
      placeLiked={placeLiked}
    >
      {highlighted ? (
        <>
          <IoMdHeart className="icon" />
          <IoMdHeart
            className={`icon ${placeLiked ? "icon__animated--1" : ""}`}
          />
          <IoMdHeart
            className={`icon ${placeLiked ? "icon__animated--2" : ""}`}
          />
        </>
      ) : (
        <>
          <IoMdHeart className="icon icon__white" />
          <IoMdHeartEmpty className="icon icon__empty" />
        </>
      )}
      <p>{likes}</p>
    </Container>
  );
}

const Container = styled.div`
  width: ${({ size }) => (size === "big" ? "8rem;" : "5rem;")};
  height: ${({ size }) => (size === "big" ? "8rem;" : "5rem;")};
  /* height: 5rem; */

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--color-heart);

  position: relative;

  /* padding: 2rem 0; */

  .icon {
    width: 100%;
    height: 100%;

    /* margin: 2rem 0; */

    /* background-color: white; */

    position: absolute;
    top: 0;
    left: 0;

    cursor: ${({ size }) => (size === "big" ? "pointer;" : "normal;")};

    &__white {
      color: white;
    }

    &__animated {
      &--1 {
        animation: anim1 1s;
      }

      &--2 {
        animation: anim2 1s 0.2s;
      }
    }
    /* position: relative; */
  }

  p {
    /* color: white;highlighted */
    color: ${({ highlighted }) =>
      highlighted ? "white;" : "var(--color-heart);"};
    font-size: ${({ size }) => (size === "big" ? "1.9rem;" : "1.2rem;")};
    transform: translateY(-2px);
    cursor: ${({ size }) => (size === "big" ? "pointer;" : "normal;")};
  }

  @keyframes anim1 {
    from {
      transform: scale(1);
      opacity: 1;
    }
    99% {
      transform: scale(1.5);
      opacity: 0;
    }
    to {
      transform: scale(0);
    }
  }

  @keyframes anim2 {
    from {
      transform: scale(1);
      opacity: 1;
    }
    99% {
      transform: scale(1.7);
      opacity: 0;
    }
    to {
      transform: scale(0);
    }
  }
`;
