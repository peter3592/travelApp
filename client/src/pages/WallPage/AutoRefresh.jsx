import { useEffect, useRef } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { useDataContext } from "../../store/context";
import { Container } from "./AutoRefresh.styled";
import { AUTO_REFRESH_INTERVAL } from "../../utils/constants";

export default function AutoRefresh() {
  const { autoRefresh, setAutoRefresh } = useDataContext();

  const animationIconRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      animationIconRef.current.className = "iconContainer";
      void animationIconRef.current.offsetWidth; // reset animation

      if (autoRefresh)
        animationIconRef.current.className = "iconContainer icon--animation";
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [autoRefresh]);

  return (
    <Container
      autoRefresh={autoRefresh}
      onClick={() => {
        setAutoRefresh((prev) => !prev);
      }}
    >
      <div className="iconContainer" ref={animationIconRef}>
        <HiOutlineRefresh className="icon" />
      </div>
      <p>Auto-Refresh</p>
    </Container>
  );
}
