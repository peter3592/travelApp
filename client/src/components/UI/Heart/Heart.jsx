import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Container } from "./Heart.styled";
import { useState } from "react";

export function Heart({ likes, size, highlighted, noPointer, onHeartClick }) {
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    if (!onHeartClick) return;

    setClicked(true);
    onHeartClick();
  };

  return (
    <Container
      size={size}
      highlighted={highlighted}
      onClick={clickHandler}
      noPointer={noPointer}
    >
      {highlighted ? (
        <>
          <IoMdHeart className="icon" />
          <IoMdHeart className={`icon ${clicked ? "icon__animated--1" : ""}`} />
          <IoMdHeart className={`icon ${clicked ? "icon__animated--2" : ""}`} />
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
