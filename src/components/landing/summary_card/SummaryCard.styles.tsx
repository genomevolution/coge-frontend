import styled from "styled-components";

export const SummaryCardContainer = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  margin: 0.5rem auto;
  max-width: 1200px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.colors.lt_green} 20%,
    ${({ theme }) => theme.colors.med_green} 50%,
    ${({ theme }) => theme.colors.lt_green} 80%,
    transparent 100%
  );
  opacity: 0.6;
`;

export const SummaryHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const SummaryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.dark_green};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 0.3rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const SummarySubtitle = styled.p`
  color: ${({ theme }) => theme.colors.med_green};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  max-width: 350px;
  margin: 0 auto;
  line-height: 1.3;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 1rem 0.8rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.lt_green} 0%,
      ${({ theme }) => theme.colors.med_green} 100%
    );
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
`;

export const StatLabel = styled.h3`
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.med_green};
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.dark_green};
  font-family: ${({ theme }) => theme.fonts.main};
  text-align: center;
`;
