import { useState } from "react";
import { useAuthContext, useUIContext } from "../../store/context";
import styled from "styled-components";
import Button from "../UI/Button";

export default function Login({ setAuthState }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthContext();
  const { setModal } = useUIContext();

  const submitHandler = async (e) => {
    e.preventDefault();

    const ok = await login(username, password);

    if (!ok)
      return setModal({
        type: "error",
        message: "Invalid username or password",
      });

    setModal(null);
  };

  return (
    <Div>
      <Form onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          // autoComplete="email"
          placeholder="Username"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          // autoComplete="current-password"
          placeholder="Password"
          required
        />
        <Button type="primary" medium>
          Login
        </Button>
      </Form>
      <Button type="secondary" medium onClick={() => setAuthState("signup")}>
        Create Account
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
  align-items: center;
  gap: 1.5rem;

  input {
    width: 20rem;
    padding: 1.1rem 0.8rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    font-size: 1.3rem;
    background-color: var(--color-light-blue);
    /* color: var(--color-gray); */
    color: var(--color-primary);

    :last-of-type {
      margin-bottom: 1rem;
    }
  }
`;
