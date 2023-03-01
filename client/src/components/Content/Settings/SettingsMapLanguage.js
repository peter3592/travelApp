import styled from "styled-components";
import { BsTriangleFill } from "react-icons/bs";
import { useState } from "react";
import fetchAPI from "../../../utils/fetchAPI";
import { useAuthContext, useUIContext } from "../../../store/context";

const languages = ["en", "sk", "de", "fr", "es"];
const flagUrl = "https://flagcdn.com/w80/countryCode.png";

export default function SettingContainerLanguage() {
  const { currentUser } = useAuthContext();
  const { setModal } = useUIContext();

  const [language, setLanguage] = useState(currentUser.settings.language);

  const arrowClickHandler = async (direction) => {
    const currentIndex = languages.indexOf(language);
    let newIndex;

    if (direction === "left") {
      newIndex = currentIndex === 0 ? languages.length - 1 : currentIndex - 1;
    }
    if (direction === "right") {
      newIndex = currentIndex === languages.length - 1 ? 0 : currentIndex + 1;
    }

    const newLanguage = languages[newIndex];

    const { ok } = await fetchAPI(
      `api/v1/users/${currentUser.username}`,
      "PATCH",
      { mapLanguage: newLanguage }
    );

    if (!ok)
      return setModal({
        type: "error",
        message: "Changing map language error",
      });

    setLanguage(newLanguage);
    currentUser.settings.language = newLanguage;
  };

  return (
    <Div>
      {/* <p className="title">MAP LANGUAGE</p> */}
      <div className="flagSetup">
        <div className="arrow arrow--left">
          <BsTriangleFill onClick={() => arrowClickHandler("left")} />
        </div>
        <div className="flag">
          <img
            src={flagUrl.replace(
              "countryCode",
              language === "en" ? "gb" : language
            )}
            crossorigin="anonymous"
          />
        </div>
        <div className="arrow arrow--right">
          <BsTriangleFill onClick={() => arrowClickHandler("right")} />
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  /* overflow: hidden; */

  .flagSetup {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .flag {
    width: 9rem;
    height: 6.2rem;
    border: 6px solid var(--color-secondary);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .arrow {
    color: var(--color-primary);
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    &--left {
      transform: rotate(-90deg);
      :hover {
        transform: rotate(-90deg) scale(1.1);
      }
      /* :active {
        transform: rotate(-90deg) scale(1.1) translateY(-2px);
      } */
    }
    &--right {
      transform: rotate(90deg);
      :hover {
        transform: rotate(90deg) scale(1.1);
      }
      /* :active {
        transform: rotate(90deg) scale(1.1) translateY(-2px);
      } */
    }
  }
`;
