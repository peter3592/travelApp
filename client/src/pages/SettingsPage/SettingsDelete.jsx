import { useRef } from "react";
import { useState } from "react";
import { Button } from "../../components/UI";
import { BsFillCheckSquareFill, BsFillXCircleFill } from "react-icons/bs";
import { useUIContext } from "../../store/context";
import { Container } from "./SettingsDelete.styled";
import { useDeleteUser } from "../../api/hooks/useDeleteUser";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

export default function SettingsDelete() {
  const [passwordMode, setPasswordMode] = useState(false);
  const { currentUser } = useCurrentUser();
  const { setModal, breakpoints } = useUIContext();
  const { deleteUser } = useDeleteUser();
  const passwordInputRef = useRef();

  const submitDeletionHandler = () => {
    if (passwordInputRef.current.value.length === 0)
      return setModal({ type: "error", message: "Please, provide a password" });

    deleteUser([currentUser.username, passwordInputRef.current.value]);
  };

  const openPasswordMode = () => setPasswordMode(true);
  const closePasswordMode = () => setPasswordMode(false);

  return (
    <Container breakpoints={breakpoints}>
      {!passwordMode && !breakpoints.maxWidth500 && (
        <Button type="delete" onClick={openPasswordMode}>
          Delete Account
        </Button>
      )}
      {!passwordMode && breakpoints.maxWidth500 && (
        <Button type="delete" small onClick={openPasswordMode}>
          Delete Account
        </Button>
      )}
      {passwordMode && (
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
              onClick={closePasswordMode}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
