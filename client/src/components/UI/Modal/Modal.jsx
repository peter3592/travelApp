import { useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import { Container } from "./Modal.styled";

export function Modal({ modal }) {
  const lastType = useRef();

  if (modal) lastType.current = modal;

  return (
    <Container showModal={!!modal}>
      <div
        className={`center center--${
          lastType.current ? lastType.current.type : ""
        }`}
      >
        {lastType.current?.type === "success" && (
          <div className="container__icon">
            <AiFillCheckCircle className="icon" />
          </div>
        )}
        {lastType.current?.type === "info" && (
          <div className="container__icon">
            <MdError className="icon" />
          </div>
        )}
        {lastType.current?.type === "error" && (
          <div className="container__icon">
            <FaMinusCircle className="icon" />
          </div>
        )}
        <p>{lastType.current ? lastType.current.message : ""}</p>
      </div>
    </Container>
  );
}
