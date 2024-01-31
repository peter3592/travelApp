import { useEffect, useState } from "react";

import { useUIContext } from "../../store/context";
import { LoginForm } from "../../components/Authentication/LoginForm/LoginForm";
import { SignupForm } from "../../components/Authentication/SignupForm/SignupForm";
import AuthPagePicture from "./AuthPagePicture";
import { Container } from "./AuthPage.styled";
import {
  TIME_PICTURE_ROTATION,
  TIME_START_DISAPPEAR,
} from "../../utils/constants";

// const TIME_PICTURE_ROTATION = 9600;
// const TIME_START_DISAPPEAR = TIME_PICTURE_ROTATION - 2200;

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
};

const imagesUrl = [
  "img/travelGif3.gif",
  "img/travelGif2.gif",
  "img/travelGif4.gif",
];

const texts = [
  "Like or comment any photo",
  "Check the activity of other travelers",
  "Change the appearance of the map",
];

export function AuthPage() {
  const [authState, setAuthState] = useState("login");
  const [activePicture, setActivePicture] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { breakpoints } = useUIContext();

  useEffect(() => {
    (async () => {
      const imagesObjects = await Promise.all(
        imagesUrl.map(async (url) => await loadImage(url))
      );

      setImages(imagesObjects);

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
        <Container breakpoints={breakpoints}>
          <div className="wrapper">
            <div className="auth">
              <p className="title">
                travel<span>app</span>
              </p>
              <div className="auth__container">
                {authState === "login" && (
                  <LoginForm setAuthState={setAuthState} />
                )}
                {authState === "signup" && (
                  <SignupForm setAuthState={setAuthState} />
                )}
              </div>
            </div>
            {(authState === "login" ||
              (authState === "signup" && !breakpoints.maxWidth800)) && (
              <div className="pictures">
                {activePicture === 1 && (
                  <AuthPagePicture
                    image={images[0]}
                    time={TIME_START_DISAPPEAR}
                    text={texts[0]}
                  />
                )}
                {activePicture === 2 && (
                  <AuthPagePicture
                    image={images[1]}
                    time={TIME_START_DISAPPEAR}
                    text={texts[1]}
                  />
                )}
                {activePicture === 3 && (
                  <AuthPagePicture
                    image={images[2]}
                    time={TIME_START_DISAPPEAR}
                    text={texts[2]}
                  />
                )}
                {activePicture === 4 && (
                  <AuthPagePicture
                    image={images[3]}
                    time={TIME_START_DISAPPEAR}
                    text={texts[3]}
                  />
                )}
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
