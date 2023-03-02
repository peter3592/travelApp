import { useRef, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import styled from "styled-components";
import determineImageCss from "../../../../../utils/determineImageCss";

const photoContainerDimension = 60; // px

export default function WallPostNewPlace({
  children,
  placePhoto,
  placeId,
  onPhotoClick,
}) {
  const [imageCss, setImageCss] = useState("");
  const [loading, setLoading] = useState(true);

  const imageRef = useRef();

  const imageLoadHandler = () => {
    setImageCss(
      determineImageCss(
        imageRef.current.width,
        imageRef.current.height,
        photoContainerDimension,
        photoContainerDimension
      )
    );

    setLoading(false);
  };

  return (
    <Div photoContainerDimension={photoContainerDimension} imageCss={imageCss}>
      <BiLocationPlus className="icon" />
      <div className="imgContainer">
        <img
          src={placePhoto}
          alt=""
          onLoad={imageLoadHandler}
          ref={imageRef}
          className={loading ? "hide" : ""}
          data-placeid={placeId}
          crossorigin="anonymous"
          onClick={(e) => onPhotoClick(e)}
        />
      </div>
      {/* <div className="wallPost__text">{children}</div> */}
      <div className="postContent">{children}</div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  .icon {
    font-size: 2.4rem;

    height: 3rem;
    flex-basis: 3rem;
    flex-shrink: 0;
    /* background-color: red; */
    color: var(--color-blue);
    transform: scale(1.2);
  }

  .strong {
    font-weight: bold;
    text-decoration: none;
    color: var(--color-blue);
    cursor: pointer;
    /* display: block; */
  }

  .imgContainer {
    /* width: ${({ photoContainerDimension }) =>
      `${photoContainerDimension}px;`}; */
    height: ${({ photoContainerDimension }) => `${photoContainerDimension}px;`};
    flex-basis: ${({ photoContainerDimension }) =>
      `${photoContainerDimension}px;`};
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    transition: 0.25s all;

    :hover {
      transform: scale(1.05);
    }

    img {
      width: 100%;
      cursor: pointer;
      ${({ imageCss }) => imageCss};
    }
  }

  .hide {
    opacity: 0;
  }

  .wallLink {
    display: flex;
    align-items: center;
  }

  .postContent {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* .wallPost__flag {
    width: 32px;
    height: 24px;

    img {
      width: 100%;
      height: 100%;
    }
  } */
`;
