import styled from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;


export const LoaderEl = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display:grid;
  -webkit-mask: conic-gradient(from 15deg,#0000,#000);
  animation: l26 1s infinite steps(12);
  
  &, &:before, &:after {
    background:
      radial-gradient(closest-side at 50% 12.5%,
      ${props => props.theme.palette.primary.main} 96%,#0000) 50% 0/20% 80% repeat-y,
      radial-gradient(closest-side at 12.5% 50%,
      ${props => props.theme.palette.primary.main} 96%,#0000) 0 50%/80% 20% repeat-x;
  }
  &:before, &:after {
    content: "";
    grid-area: 1/1;
    transform: rotate(30deg);
  }
  &:after {
    transform: rotate(60deg);
  }

  @keyframes l26 {
    100% {transform:rotate(1turn)}
  }
`;