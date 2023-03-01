import styled from "styled-components";
import { useAuthContext, useUIContext } from "../../../store/context";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import SearchBar from "./SearchBar";

export default function Header() {
  const { currentUser, logout } = useAuthContext();
  const { setModal, breakpoints } = useUIContext();

  const navigate = useNavigate();

  const logoutClickHandler = async () => {
    const ok = await logout();

    if (!ok)
      return setModal({
        type: "error",
        message: "Error by logging out. Try it later",
      });

    navigate("/");
  };

  return (
    <Div breakpoints={breakpoints}>
      {currentUser && (
        <>
          <SearchBar />
          <div className="user">
            <div className="user__name">
              <Link
                to={`/${currentUser.username}`}
                className="user__name__link"
              >
                {currentUser.username}
              </Link>
            </div>
            <div className="user__photo">
              <Link to={`/${currentUser.username}`}>
                <img
                  src={currentUser.photo}
                  alt={`${currentUser.photo}'s photo`}
                  width="40"
                  height="40"
                  crossorigin="anonymous"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "img/anonymousPhoto.jpg";
                  }}
                />
              </Link>
            </div>
            <div className="logout">
              <AiOutlinePoweroff
                className="icon__logout"
                onClick={logoutClickHandler}
              />
            </div>
          </div>
        </>
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 90%;
  margin: 0 auto;
  height: var(--header-height);

  padding: ${({ breakpoints }) => {
    if (breakpoints.maxWidth800) return "0;";
    if (breakpoints.maxWidth900) return "0 2rem;";

    return "0 4rem;";
  }};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  /* 
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius); */

  .search {
    position: relative;

    input {
      border-radius: 10rem;
      background-color: #ddd;
      border: 0;
      outline: none;
      padding: 0.7rem;
      padding-left: 3rem;
      color: var(--color-darkgray);
      /* ;
      color: red; */

      ::placeholder {
        color: var(--color-gray);
        font-size: 1.2rem;
      }
    }
  }

  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ breakpoints }) => {
      if (breakpoints.maxWidth800) return "1.5rem";

      return "2.5rem;";
    }};

    &__name {
      font-weight: bold;
      font-size: 1.7rem;

      &__link {
        text-decoration: none;

        &:visited {
          color: inherit;
        }
      }
    }
  }

  .icon {
    &__glass {
      position: absolute;
      top: 50%;
      left: 5%;
      transform: translateY(-50%);
      font-size: 1.5rem;
      color: var(--color-gray);
    }
    &__logout {
      font-size: 2.5rem;
      color: red;
      cursor: pointer;
      transition: all 0.2s;

      :hover {
        transform: scale(1.1);
      }
    }
  }
`;
