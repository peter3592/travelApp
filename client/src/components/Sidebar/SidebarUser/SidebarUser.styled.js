import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  flex-grow: 1;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  .photo {
    text-align: center;
    border-radius: var(--border-radius);
    overflow: hidden;
    width: 16rem;
    height: 16rem;
    margin: 0 auto 0.5rem;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .user .username {
    color: white;
    text-align: center;
    font-weight: 700;
    font-size: 2.9rem;
  }

  .stats {
    color: white;
    text-align: center;

    &__title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    &__number {
      font-size: 3.6rem;
      font-weight: 700;
    }

    &__countries,
    &__places {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      padding: 2rem 1rem;
      width: 90%;
    }

    &__countries {
      border-bottom: 3px solid white;
    }

    &__icon {
      font-size: 3.5rem;
      transform: translateY(13px);
    }

    &__icon,
    &__details {
      width: 8rem;
    }
  }
`;
