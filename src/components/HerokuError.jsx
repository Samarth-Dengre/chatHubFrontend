import React from "react";
import styled from "styled-components";

function HerokuError() {
  return (
    <HerokuContainer>
      Sorry for the inconvenience, this web application might not be working at
      the time when you are viewing it because Heroku has suspended its free
      services. I am looking for alternatives of heroku which also supports web
      sockets. To view this web application please refer to this{" "}
      <a href="https://drive.google.com/file/d/1Y-JHyaCe3cdYJBnqFbcTBtOvbIlAersQ/view?usp=share_link" target='_blank'> 
        Video
      </a>
      .
    </HerokuContainer>
  );
}

export default HerokuError;

const HerokuContainer = styled.div`
  color: white;
  border-radius: 1rem;
  background-color: black;
  width: 60%;
  height: auto;
  padding: 0.8rem;
  text-align: center;
`;
