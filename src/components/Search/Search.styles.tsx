import styled from "styled-components";

export const SearchContainer = styled.div`
  padding: 2rem;
  height: 100vh;
  display: flex;
  gap: 2rem;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

export const SidebarTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: #495057;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MenuButton = styled.button<{ isActive: boolean }>`
  padding: 1rem;
  text-align: left;
  background-color: ${(props) =>
    props.isActive ? ({ theme }) => theme.colors.dark_green : "transparent"};
  color: ${(props) =>
    props.isActive ? "white" : ({ theme }) => theme.colors.dark_green};
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? ({ theme }) => theme.colors.lt_green : "#e9ecef"};
  }
`;

export const MenuIcon = styled.span`
  font-size: 20px;
`;

export const MenuAdditionalInfo = styled.span`
  font-size: 20px;
  margin-left: auto;
`;

export const Tooltip = styled.div`
  position: absolute;
  background: #111;
  color: #fff;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 10;
`;

export const SearchArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

export const SearchTitle = styled.h1`
  margin-bottom: 1rem;
  color: #212529;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 400px;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  font-size: 14px;
  border: 2px solid #dee2e6;
  border-radius: 6px 0 0 6px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.lt_green};
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #6c757d;
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.dark_green};
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lt_green};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SearchButtonIcon = styled.span`
  font-size: 16px;
`;

export const ResultsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ResultsTitle = styled.h3`
  margin-bottom: 1rem;
  color: #495057;
`;

export const NoResultsContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ResultItem = styled.div`
  padding: 1rem;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.lt_green};
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  }
`;

export const ResultItemTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #212529;
`;

export const ResultItemType = styled.span`
  font-size: 14px;
  color: #6c757d;
  text-transform: capitalize;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem;
`;

export const PaginationButton = styled.button<{
  isActive?: boolean;
  isDisabled?: boolean;
}>`
  padding: 0.5rem 0.75rem;
  border: 1px solid
    ${(props) => (props.isActive ? props.theme.colors.dark_green : "#dee2e6")};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.dark_green : "white"};
  color: ${(props) => (props.isActive ? "white" : "#495057")};
  border-radius: 4px;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  transition: all 0.2s;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.isActive ? props.theme.colors.lt_green : "#f8f9fa"};
    border-color: ${(props) =>
      props.isActive
        ? props.theme.colors.lt_green
        : props.theme.colors.dark_green};
  }
`;

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: #6c757d;
  margin: 0 1rem;
`;
