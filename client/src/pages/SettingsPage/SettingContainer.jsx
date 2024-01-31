import { BiCollapse, BiExpand } from "react-icons/bi";

import { useUIContext } from "../../store/context";
import { Container } from "./SettingContainer.styled";

export default function SettingContainer({
  title,
  children,
  type,
  expandPlaces,
  setExpandPlaces,
}) {
  const iconClickHandler = () => setExpandPlaces((prev) => !prev);

  const { breakpoints } = useUIContext();

  return (
    <Container type={type} breakpoints={breakpoints}>
      <div className="title">
        <p className="title__text">{title}</p>
        {type === "places" &&
          (expandPlaces ? (
            <BiCollapse
              className="title__icon title__icon--collapse"
              onClick={iconClickHandler}
            />
          ) : (
            <BiExpand
              className="title__icon title__icon--expand"
              onClick={iconClickHandler}
            />
          ))}
      </div>
      <div className="container">{children}</div>
    </Container>
  );
}
