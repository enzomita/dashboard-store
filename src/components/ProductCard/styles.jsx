import { Card } from "@mui/material";
import styled, { css } from "styled-components";

export const CardProduct = styled(Card)`
  &.MuiCard-root {
    ${props => props.$gridStyle === 'grid' && css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    `}
    margin-bottom: 40px;
    max-width: ${props => props.$gridStyle === 'grid' ? "100%" : "50%"};
    position: relative;
    overflow: visible;
    margin-right: ${props => props.$gridStyle === 'grid' ? "0" : "auto"};
    margin-left: ${props => props.$gridStyle === 'grid' ? "0" : "auto"};

    ${props => props.$isMobile && css`
      max-width: 100%;
      margin-bottom: 20px;
    `}
  }
`;