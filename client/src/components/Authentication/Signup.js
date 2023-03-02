import { useEffect, useState } from "react";
import { useAuthContext, useUIContext } from "../../store/context";
import styled from "styled-components";
import fetchAPI from "../../utils/fetchAPI";
import Button from "../UI/Button";
import LoadingSpinner2 from "../UI/LoadingSpinner2";

export default function Signup({ setAuthState }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [loadingPhoto, setLoadingPhoto] = useState(true);
  const [initialLoadFinished, setInitialLoadFinished] = useState(false);

  const { setCurrentUser, signup } = useAuthContext();
  const { setModal } = useUIContext();

  useEffect(() => {
    (async () => {
      await generateImage();
      setInitialLoadFinished(true);
    })();
  }, [generateImage]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 6)
      return setModal({
        type: "error",
        message: "Password must have at least 6 characters",
      });

    if (password.includes(" "))
      return setModal({
        type: "error",
        message: "Password cannot include space",
      });

    if (password !== passwordConfirm)
      return setModal({
        type: "error",
        message: "Passwords are not the same",
      });

    const { ok, data, message } = await signup(
      username,
      password,
      passwordConfirm,
      userPhoto
    );

    if (!ok) {
      setModal({ type: "error", message });
      return;
    }

    setModal({ type: "success", message: "Account created" });

    setTimeout(() => {
      // navigate("/");
      setCurrentUser(data.user);
      setModal(null);
    }, [1500]);
  };

  const generateImage = async () => {
    setLoadingPhoto(true);

    const { ok, data } = await fetchAPI("api/v1/users/generate-photo");

    if (!ok) {
      setUserPhoto("img/anonymousPhoto.jpg");
      setModal({ type: "error", message: "Unable to generate photo" });
      setLoadingPhoto(false);
      return;
    }

    setUserPhoto(data.photo);
    if (!initialLoadFinished)
      setModal({ type: "info", message: "Click on photo to generate new one" });
    setLoadingPhoto(false);
  };

  return (
    <Div>
      <Form onSubmit={submitHandler} photoUrl={userPhoto}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          minLength="4"
          maxLength="10"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          // autoComplete="current-password"
          placeholder="Password"
          minLength="6"
          required
        />
        <input
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          // autoComplete="current-password"
          placeholder="Confirm password"
          required
        />
        <div className="imgContainer">
          {loadingPhoto ? (
            <LoadingSpinner2 />
          ) : (
            <img
              src={userPhoto}
              className="imgContainer__image"
              onClick={generateImage}
            />
          )}
        </div>

        <Button type="secondary" medium>
          Sign Up
        </Button>
      </Form>
      <Button type="primary" medium onClick={() => setAuthState("login")}>
        Back to Login
      </Button>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  input {
    width: 20rem;
    padding: 1.1rem 0.8rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    font-size: 1.3rem;
    background-color: var(--color-light-blue);
    color: var(--color-primary);
  }

  .imgContainer {
    width: 10rem;
    height: 10rem;
    position: relative;
    margin-bottom: 1rem;

    align-self: center;
    cursor: pointer;
    box-shadow: 0px 0px 6px 4px var(--color-primary);

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
