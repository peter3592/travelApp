import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { BsFillCheckSquareFill, BsFillXCircleFill } from "react-icons/bs";
import fetchAPI from "../../../utils/fetchAPI";
import { useAuthContext, useUIContext } from "../../../store/context";

export default function SettingsDelete() {
  const [passwordMode, setPasswordMode] = useState(false);
  const { currentUser, setCurrentUser } = useAuthContext();
  const { setModal } = useUIContext();

  const passwordInputRef = useRef();

  const submitDeletionHandler = async () => {
    if (passwordInputRef.current.value.length === 0)
      return setModal({ type: "error", message: "Please, provide a password" });

    const { ok, message } = await fetchAPI(
      `api/v1/users/${currentUser.username}`,
      "DELETE",
      {
        password: passwordInputRef.current.value,
      }
    );

    if (!ok) return setModal({ type: "error", message });

    setModal({ type: "success", message: "Account deleted" });

    setCurrentUser(null);
  };

  return (
    <Div>
      {!passwordMode ? (
        <Button type="delete" onClick={() => setPasswordMode(true)}>
          Delete Account
        </Button>
      ) : (
        <div className="passwordContainer">
          <input
            type="password"
            placeholder="Provide a password"
            ref={passwordInputRef}
          />
          <div className="buttons">
            <BsFillCheckSquareFill
              className="icon icon--submit"
              onClick={submitDeletionHandler}
            />
            <BsFillXCircleFill
              className="icon icon--cancel"
              onClick={() => setPasswordMode(false)}
            />
          </div>
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  border-top: 3px solid var(--color-red);
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  max-width: 50rem;
  margin: 0 auto;

  .passwordContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    height: 5rem;

    input {
      padding: 1.1rem 0.8rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;
      font-size: 1.3rem;
      background-color: var(--color-light-blue);
      color: var(--color-primary);
    }

    .buttons {
      display: flex;
      gap: 1rem;
    }

    .icon {
      font-size: 2.6rem;
      cursor: pointer;
      transition: all 0.1s;

      :hover {
        transform: scale(1.05);
      }

      :active {
        transform: translateY(2px) scale(1);
      }

      &--submit {
        color: var(--color-secondary);
      }

      &--cancel {
        color: var(--color-red);
      }
    }
  }
`;
