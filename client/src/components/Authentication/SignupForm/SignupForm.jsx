import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUIContext } from "../../../store/context";
import { Button, LoadingDataSpinner } from "../../UI";
import { Container, Form } from "./SignupForm.styled";
import {
  usernameLimits,
  passwordLimits,
  confirmPasswordLimits,
} from "../../../utils";
import { useSignup } from "../../../api/hooks/useSignup";
import { useGeneratePhoto } from "../../../api/hooks/useGeneratePhoto";

export function SignupForm({ setAuthState }) {
  const { setModal } = useUIContext();
  const { signup } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { photo, isSuccess, isLoading, isFetching, refetch, error } =
    useGeneratePhoto();

  useEffect(() => {
    if (!isLoading && isSuccess)
      setModal({ type: "info", message: "Click on photo to generate new one" });
  }, [isLoading, isSuccess, setModal]);

  const submitHandler = async (formData, e) => {
    e.preventDefault();

    const { username, password, passwordConfirm } = formData;

    if (password !== passwordConfirm)
      return setModal({
        type: "error",
        message: "Passwords are not the same",
      });

    signup([username, password, passwordConfirm, photo]);
  };

  const generateImage = async () => {
    await refetch();

    if (error) setModal({ type: "error", message: "Unable to generate photo" });
  };

  const signupErrorsHandler = () => {
    let message;

    if (errors.passwordConfirm?.message)
      message = errors.passwordConfirm.message;
    if (errors.password?.message) message = errors.password.message;
    if (errors.username?.message) message = errors.username.message;

    if (message)
      return setModal({
        type: "error",
        message,
      });

    setModal({
      type: "error",
      message: "Creating user error",
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitHandler, signupErrorsHandler)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", usernameLimits)}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", passwordLimits)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          {...register("passwordConfirm", confirmPasswordLimits)}
        />
        <div className="imgContainer">
          {isFetching ? (
            <LoadingDataSpinner />
          ) : (
            <img
              src={!error ? photo : "img/anonymousPhoto.jpg"}
              className="imgContainer__image"
              onClick={generateImage}
              crossorigin="anonymous"
              alt="Generated photo"
              style={{ color: "transparent" }}
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
    </Container>
  );
}
