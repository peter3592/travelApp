import { useEffect, useRef } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import styled from "styled-components";
import { useDataContext } from "../../../../store/context";
const AUTO_REFRESH_INTERVAL = 3; // [s]

export default function AutoRefresh() {
  const { autoRefresh, setAutoRefresh, reloadData } = useDataContext();

  const animationIconRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      (async () => {
        animationIconRef.current.className = "iconContainer";
        void animationIconRef.current.offsetWidth; // reset animation

        if (autoRefresh) {
          animationIconRef.current.className = "iconContainer icon--animation";
          reloadData();
        }
      })();
    }, AUTO_REFRESH_INTERVAL * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [autoRefresh]);

  return (
    <Div
      autoRefresh={autoRefresh}
      onClick={() => {
        setAutoRefresh((prev) => !prev);
      }}
    >
      <div className="iconContainer" ref={animationIconRef}>
        <HiOutlineRefresh className="icon" />
      </div>
      <p>Auto-Refresh</p>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  gap: 0.7rem;
  font-weight: bold;
  margin-bottom: 1rem;

  cursor: pointer;

  .icon {
    font-size: 2rem;
    &--animation {
      animation: 1s turn forwards cubic-bezier(0.46, 0.34, 0.31, 0.75);
    }
  }

  .iconContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  color: ${({ autoRefresh }) =>
    autoRefresh ? "var(--color-darkgray);" : "var(--color-lightgray);"};

  @keyframes turn {
    from {
      transform: rotate(0);
    }

    50% {
      color: var(--color-primary);
    }

    to {
      transform: rotate(-720deg);
    }
  }
`;
