import styled from "styled-components";

export const Container = styled.div`
  color: white;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loader {
    max-inline-size: 100%;
  }
  .upper-half {
    width: auto;
    display: flex;
    padding: 2rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    border: 2px solid #9186f3;
    border-radius: 2rem;
    .avatar-image {
      display: flex;
      width: auto;
      height: auto;
      img {
        width: 10rem;
      }
      .Change-Profile {
        background-color: blue;
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        padding: 1px;
        cursor: pointer;
        position: relative;
        right: 19%;
        top: 7rem;
      }
    }
    .user-details {
      width: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 1.5rem;
      gap: 0.6rem;
    }
  }
  .lower-half {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .updating {
      width: 10rem;
      height: 10rem;
    }
    .contact-details {
      display: flex;
      width: 100vw;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60%;
        input {
          padding: 10px;
          width: 75%;
          border-radius: 10px;
          outline: none;
          font-size: 1rem;
        }
      }

      button {
        width: 8rem;
        height: 3rem;
        font-size: 1rem;
        padding: 5px;
        font-weight: bold;
        border-radius: 1rem;
        cursor: pointer;
        outline: none;
        background-color: #9186f3;
        transition: 0.5s ease-in-out;
        :hover {
          background-color: #4e0eff;
          color: white;
        }
      }
    }
  }
  .deleteAccount {
    color: white;
    background-color: #e33636;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: large;
    margin-bottom: -2rem;
    margin-top: 1rem;
    transition: 0.2s ease-in-out;
    :hover {
      background-color: red;
    }
  }
`;
