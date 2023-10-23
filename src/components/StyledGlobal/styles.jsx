import styled from "styled-components";

export const DashboadMainContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: ${props => props.$isMobile ? "100px" : "140px"};
  padding-bottom: 40px;
`

export const DashboardMainContainerContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`

