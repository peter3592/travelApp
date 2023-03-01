import { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";
import InitialPagePicture from "./InitialPagePicture";
import { useUIContext } from "../../store/context";

const TIME_PICTURE_ROTATION = 9600;
const TIME_DISAPPEAR_START = TIME_PICTURE_ROTATION - 2200;
// const PHOTOS_COUNT = 4;

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
};

const imagesUrl = [
  "img/travelGif1.gif",
  "img/travelGif2.gif",
  "img/travelGif3.gif",
  "img/travelGif4.gif",
];

const texts = [
  "Use flags to quickly move around the map",
  "Check the activity of other travelers",
  "Like or comment any photo",
  "Change the appearance of the map",
];

// const

export default function InitialPage() {
  const [authState, setAuthState] = useState("login");
  const [activePicture, setActivePicture] = useState(1);

  const [images, setImages] = useState([]);
  // const [texts, setTexts] = useState([]);

  const [loading, setLoading] = useState(true);

  const { breakpoints } = useUIContext();

  useEffect(() => {
    (async () => {
      const imagesObjects = await Promise.all(
        imagesUrl.map(async (url) => await loadImage(url))
      );

      setImages(imagesObjects);
      // setTexts(photoTexts);

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      const id = setInterval(() => {
        setActivePicture((prev) => {
          if (prev === imagesUrl.length) return 1;
          return prev + 1;
        });
      }, [TIME_PICTURE_ROTATION]);

      return () => clearInterval(id);
    }
  }, [loading]);

  return (
    <>
      {!loading && (
        <Div breakpoints={breakpoints}>
          <div className="wrapper">
            <div className="auth">
              <p className="title">
                travel<span>app</span>
              </p>
              <div className="auth__container">
                {authState === "login" && <Login setAuthState={setAuthState} />}
                {authState === "signup" && (
                  <Signup setAuthState={setAuthState} />
                )}
              </div>
            </div>
            <div className="pictures">
              {/* <InitialPagePicture
                image={images[activePicture - 1]}
                time={TIME_DISAPPEAR_START}
                text={texts[activePicture - 1]}
              /> */}
              {activePicture === 1 && (
                <InitialPagePicture
                  image={images[0]}
                  time={TIME_DISAPPEAR_START}
                  text={texts[0]}
                />
              )}

              {activePicture === 2 && (
                <InitialPagePicture
                  image={images[1]}
                  time={TIME_DISAPPEAR_START}
                  text={texts[1]}
                />
              )}
              {activePicture === 3 && (
                <InitialPagePicture
                  image={images[2]}
                  time={TIME_DISAPPEAR_START}
                  text={texts[2]}
                />
              )}
              {activePicture === 4 && (
                <InitialPagePicture
                  image={images[3]}
                  time={TIME_DISAPPEAR_START}
                  text={texts[3]}
                />
              )}
            </div>
          </div>
        </Div>
      )}
    </>
  );
}

const Div = styled.div`
  background-color: var(--color-primary);
  border: 2rem solid var(--color-primary);

  width: 100%;
  height: 100%;

  .title {
    font-family: "Fredoka One", cursive;
    text-align: center;
    color: var(--color-primary);

    span {
      color: var(--color-secondary);
    }

    ${({ breakpoints }) => {
      if (breakpoints.maxWidth800)
        return ` 
        font-size: 6rem;
        `;
      if (breakpoints.maxWidth900)
        return ` 
        font-size: 5rem;
        `;

      return ` 
      font-size: 6rem;
        `;
    }}
  }

  .wrapper {
    width: 100%;
    height: 100%;

    border-radius: var(--border-radius);
    display: flex;
    overflow: hidden;
    background: white;
    padding: 4rem;
    flex-direction: row;

    ${({ breakpoints }) => {
      if (breakpoints.maxWidth800)
        return ` 
        flex-direction: column;
        align-items: center;
        `;
    }}

    .auth {
      width: 50%;
      display: flex;
      flex-direction: column;

      &__container {
        flex-grow: 1;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .pictures {
      padding: 6rem 8rem;
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      ${({ breakpoints }) => {
        if (breakpoints.maxWidth800)
          return "height: 30rem; padding: 1.5rem 0 1.5rem 4rem;";
        if (breakpoints.maxWidth900) return "padding: 1.5rem 0 1.5rem 4rem;";
        if (breakpoints.maxWidth1000) return "padding: 3rem 4rem;";
      }}
    }
  }
`;
