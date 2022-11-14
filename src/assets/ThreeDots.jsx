import React from "react";
import styled from "styled-components";
function ThreeDots() {
  return (
    <Container>
      <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Container>
  );
}

export default ThreeDots;

const Container = styled.div`
  body {
    background: #253645;
  }

  .dots {
    width: 0;
    height: 0;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .dot {
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  .dot:before,
  .dot:after {
    content: "";
    width: 22px;
    height: 22px;
    border-radius: 50px;
    background: #c5eff7;
    position: absolute;
    left: 50%;
    transform: translateX(-14px);
    margin-left: -11px;
    margin-top: -11px;
  }
  .dot:after {
    transform: translateX(14px);
  }
  @-webkit-keyframes dots-move-0 {
    0% {
      transform: translateX(-14px) rotate(0deg);
    }
    50%,
    100% {
      transform: translateX(-14px) rotate(180deg);
    }
  }
  @keyframes dots-move-0 {
    0% {
      transform: translateX(-14px) rotate(0deg);
    }
    50%,
    100% {
      transform: translateX(-14px) rotate(180deg);
    }
  }
  @-webkit-keyframes dots-visibility-0 {
    0% {
      visibility: visible;
    }
    50%,
    100% {
      visibility: hidden;
    }
  }
  @keyframes dots-visibility-0 {
    0% {
      visibility: visible;
    }
    50%,
    100% {
      visibility: hidden;
    }
  }
  .dot:nth-child(1) {
    transform: translateX(-14px) rotate(0deg);
    -webkit-animation: dots-move-0 0.7s -0s ease-in infinite;
    animation: dots-move-0 0.7s -0s ease-in infinite;
  }
  .dot:nth-child(1):before {
    -webkit-animation: dots-visibility-0 0.7s -0s infinite;
    animation: dots-visibility-0 0.7s -0s infinite;
  }
  @-webkit-keyframes dots-move-1 {
    0% {
      transform: translateX(14px) rotate(180deg);
    }
    50%,
    100% {
      transform: translateX(14px) rotate(0deg);
    }
  }
  @keyframes dots-move-1 {
    0% {
      transform: translateX(14px) rotate(180deg);
    }
    50%,
    100% {
      transform: translateX(14px) rotate(0deg);
    }
  }
  @-webkit-keyframes dots-visibility-1 {
    0% {
      visibility: visible;
    }
    50%,
    100% {
      visibility: hidden;
    }
  }
  @keyframes dots-visibility-1 {
    0% {
      visibility: visible;
    }
    50%,
    100% {
      visibility: hidden;
    }
  }
  .dot:nth-child(2) {
    transform: translateX(14px) rotate(0deg);
    -webkit-animation: dots-move-1 0.7s -0.35s ease-in infinite;
    animation: dots-move-1 0.7s -0.35s ease-in infinite;
  }
  .dot:nth-child(2):before {
    -webkit-animation: dots-visibility-1 0.7s -0.35s infinite;
    animation: dots-visibility-1 0.7s -0.35s infinite;
  }
`;
