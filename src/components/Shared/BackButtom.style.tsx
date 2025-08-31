import styled from "styled-components";

export const BackButton = styled.button`
  margin-bottom: 2rem;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.dark_green};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lt_green};
  }
`;