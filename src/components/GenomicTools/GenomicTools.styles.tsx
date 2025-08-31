import styled from "styled-components";

export const GenomicToolsContainer = styled.section`
  padding: 1rem 0;
  background: white;
  min-height: 50vh;
`;

export const ToolsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const ToolsHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 0.5rem;
`;

export const ToolsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.dark_green};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const ToolsSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.med_green};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ToolCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colors.lt_green};
  }
`;

export const ToolIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.dark_green};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: white;
  transition: transform 0.3s ease;

  ${ToolCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ToolTitle = styled.h3`
  color: ${({ theme }) => theme.colors.dark_green};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const ToolDescription = styled.p`
  color: #6c757d;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const ToolButton = styled.button`
  background: ${({ theme }) => theme.colors.dark_green};
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(141, 197, 62, 0.3);
  }
`;
