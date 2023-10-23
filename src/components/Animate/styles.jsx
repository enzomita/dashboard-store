import styled from "styled-components";

export const AnimationFadeIn = styled.div`
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const AnimationFadeInLeft = styled.div`
  animation: fadeInLeft ease 1s;
  -webkit-animation: fadeInLeft ease 1s;
  -moz-animation: fadeInLeft ease 1s;
  -o-animation: fadeInLeft ease 1s;
  -ms-animation: fadeInLeft ease 1s;

  @keyframes fadeInLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeInLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const AnimationFadeInRight = styled.div`
  animation: fadeInRight ease 1s;
  -webkit-animation: fadeInRight ease 1s;
  -moz-animation: fadeInRight ease 1s;
  -o-animation: fadeInRight ease 1s;
  -ms-animation: fadeInRight ease 1s;

  @keyframes fadeInRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeInRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const AnimationFadeInTop = styled.div`
  animation: fadeInTop ease 1s;
  -webkit-animation: fadeInTop ease 1s;
  -moz-animation: fadeInTop ease 1s;
  -o-animation: fadeInTop ease 1s;
  -ms-animation: fadeInTop ease 1s;

  @keyframes fadeInTop {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @-moz-keyframes fadeInTop {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @-webkit-keyframes fadeInTop {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;