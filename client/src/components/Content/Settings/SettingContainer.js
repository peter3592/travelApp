import styled from "styled-components";

import { BiCollapse, BiExpand } from "react-icons/bi";

export default function SettingContainer({
  title,
  children,
  type,
  expandPlaces,
  setExpandPlaces,
}) {
  const iconClickHandler = () => setExpandPlaces((prev) => !prev);

  return (
    <Div type={type}>
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
    </Div>
  );
}

const Div = styled.div`
  color: black;

  user-select: none;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 1.4rem;

  .title {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__text {
      text-align: center;
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--color-primary);
      font-family: "Fredoka One";
      letter-spacing: 1px;
    }

    &__icon {
      cursor: pointer;
      transition: 0.15s all;
      font-size: 1.7rem;

      &--expand {
        :hover {
          transform: scale(1.2);
        }
      }
      &--collapse {
        transform: scale(1.3);

        :hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .container {
    flex-grow: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({ type }) => {
      if (type === "places")
        return "overflow-y: auto; overflow-x: hidden; align-items: flex-start;";

      return "overflow: hidden;";
    }}/* overflow: hidden; */
  }
`;
