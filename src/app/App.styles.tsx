import styled from "styled-components";

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const MainContent = styled.main`
  flex: 1;
  background: #f8f9fa;
  padding: 0;
  margin: 0;
`;


