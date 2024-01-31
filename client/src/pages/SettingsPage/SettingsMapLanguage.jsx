import { BsTriangleFill } from "react-icons/bs";

import { useUIContext } from "../../store/context";
import { Container } from "./SettingsMapLanguage.styled";
import { useChangeMapLanguage } from "../../api/hooks/useChangeMapLanguage";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

const languages = ["en", "sk", "de", "fr", "es"];
const flagUrl = "https://flagcdn.com/w80/countryCode.png";

export default function SettingContainerLanguage() {
  const { currentUser } = useCurrentUser();
  const { breakpoints } = useUIContext();
  const { changeMapLanguage } = useChangeMapLanguage();

  const arrowClickHandler = (direction) => {
    let newIndex;
    const currentIndex = languages.indexOf(currentUser.settings.language);

    if (direction === "left")
      newIndex = currentIndex === 0 ? languages.length - 1 : currentIndex - 1;

    if (direction === "right")
      newIndex = currentIndex === languages.length - 1 ? 0 : currentIndex + 1;

    changeMapLanguage(languages[newIndex]);
  };

  return (
    <Container breakpoints={breakpoints}>
      <div className="flagSetup">
        <div className="arrow arrow--left">
          <BsTriangleFill onClick={() => arrowClickHandler("left")} />
        </div>
        <div className="flag">
          <img
            src={flagUrl.replace(
              "countryCode",
              currentUser.settings.language === "en"
                ? "gb"
                : currentUser.settings.language
            )}
            crossorigin="anonymous"
            alt="Active language flag"
          />
        </div>
        <div className="arrow arrow--right">
          <BsTriangleFill onClick={() => arrowClickHandler("right")} />
        </div>
      </div>
    </Container>
  );
}
