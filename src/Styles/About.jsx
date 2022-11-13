import styled from "styled-components";

export const Container = styled.div`
  margin: 1rem;
  border: 1px solid white;
  width: 70%;
  max-height: 10rem;
  min-height: 4rem;
  padding: 0.5rem;
  border-radius: 1rem;
  display: flex;
  @media screen and (min-width: 720px) and (max-width: 1000px) {
    width: 98%;
  }
  .content {
    width: 95%;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .textArea{
        background-color: transparent;
        color: white;
        border: 1px solid #936dfb;
        outline: none;
        resize: none;
        padding: 7px;
        border-radius: 1rem;
    }   
  }
  .edit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%;
    transition: 200ms ease-in-out;
    :hover {
      cursor: pointer;
      color: #936dfb;
    }
  }
`;
