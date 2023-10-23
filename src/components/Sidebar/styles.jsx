import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 20%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 64px;
  padding-left: 20px;


  animation: leftIn ease 1s;
  -webkit-animation: leftIn ease 1s;
  -moz-animation: leftIn ease 1s;
  -o-animation: leftIn ease 1s;
  -ms-animation: leftIn ease 1s;

  @keyframes leftIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @-moz-keyframes leftIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @-webkit-keyframes leftIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`