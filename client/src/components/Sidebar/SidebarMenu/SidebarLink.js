import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SidebarLink({ icon, text, endpoint, active }) {
  return (
    <MyLink
      to={endpoint}
      style={{ textDecoration: "none" }}
      active={active ? 1 : 0}
    >
      {active && (
        <div className="active">
          <div className="active__rightRadius active__rightRadius--top">
            <div className="active__rightRadius__circle active__rightRadius__circle--top" />
          </div>
          <div className="active__rightRadius active__rightRadius--bottom">
            <div className="active__rightRadius__circle active__rightRadius__circle--bottom" />
          </div>
        </div>
      )}
      <div className="linkContainer">
        <div className="icon">{icon}</div>
        <div className="text">{text.toUpperCase()}</div>
      </div>
    </MyLink>
  );
}

const MyLink = styled(Link)`
  color: ${({ active }) => (active ? "var(--color-primary);" : "white;")};
  position: relative;
  padding: 1rem 2.5rem;
  width: 100%;

  /* display: flex;
  flex-direction: row !important; */
  :not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .linkContainer {
    display: flex;
    justify-content: start;
    align-items: center;
    /* text-align: left; */
  }

  .icon {
    font-size: 2.5rem;
    z-index: 2;
    margin-right: 1rem;
    transform: translateY(2px);
    transition: transform 0.2s;
  }

  :hover {
    .icon {
      /* transform: translateY(2px) scale(1.1); */
      transform: ${({ active }) =>
        active ? "translateY(2px)" : "translateY(2px) scale(1.1)"};
    }
  }

  .text {
    font-size: 1.7rem;
    z-index: 2;
    /* transform: translateY(-2px); */
  }

  .active {
    /* display: ${({ active }) => (active ? "block" : "none")}; */
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;

    /* width: 50rem; */
    width: 24.6rem;
    height: 100%;

    border-top-left-radius: 10rem;
    border-bottom-left-radius: 10rem;

    z-index: 1;

    &__rightRadius {
      position: absolute;

      width: 3rem;
      height: 3rem;
      background-color: white;

      overflow: hidden;

      &__circle {
        width: 200%;
        height: 200%;
        border-radius: 10rem;
        background-color: var(--color-primary);

        /* background-color: red; */

        transform: translateX(-1px);

        cursor: default;

        position: absolute;
        top: 0;
        right: 0;

        &--top {
          transform: translateX(-1px) translateY(-50%);
        }
      }

      &--top {
        top: -3rem;
        right: 0;
      }
      &--bottom {
        bottom: -3rem;
        right: 0;
      }
    }
  }
`;
