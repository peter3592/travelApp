import { useForm } from "react-hook-form";

import { useUIContext } from "../../../store/context";
import { Button } from "../../UI";
import { Container, Form } from "./LoginForm.styled";
import { passwordLimits, usernameLimits } from "../../../utils";
import { useLogin } from "../../../api/hooks/useLogin";

export function LoginForm({ setAuthState }) {
  const { register, handleSubmit, formState } = useForm();
  const { setModal } = useUIContext();
  const { login } = useLogin();

  const submitHandler = async (data, e) => {
    e.preventDefault();

    login([data.username, data.password]);
  };

  const loginErrorsHandler = () => {
    let errorMessage = null;

    const { errors } = formState;

    if (errors.password?.message) errorMessage = errors.password.message;
    if (errors.username?.message) errorMessage = errors.username.message;

    if (errorMessage)
      return setModal({
        type: "error",
        message: errorMessage,
      });

    setModal({
      type: "error",
      message: "Login user error",
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitHandler, loginErrorsHandler)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: usernameLimits.required,
          })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: passwordLimits.required })}
        />
        <Button type="primary" medium>
          Login
        </Button>
      </Form>
      <Button type="secondary" medium onClick={() => setAuthState("signup")}>
        Create Account
      </Button>
    </Container>
  );
}
