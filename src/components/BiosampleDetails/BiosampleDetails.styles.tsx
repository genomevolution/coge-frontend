import styled from "styled-components";

export const BiosampleContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  overflow-y: auto;
`;

export const BiosampleHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lt_green};
  padding-bottom: 1rem;
`;

export const BiosampleTitle = styled.h1`
  color: ${({ theme }) => theme.colors.dark_green};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 2rem;
  margin: 0;
  line-height: 1.2;
`;

export const SpeciesName = styled.span`
  font-style: italic;
`;

export const BiosampleName = styled.span`
  font-style: normal;
`;

export const BiosampleInfo = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  color: #495057;
  font-size: 14px;
  min-width: 120px;
`;

export const InfoValue = styled.span`
  color: #212529;
  font-size: 14px;
  text-align: right;
  word-break: break-word;
  max-width: 400px;
`;


export const TimestampSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-top: 2px solid #dee2e6;
  margin-top: 0.75rem;
`;

export const TimestampLabel = styled.span`
  font-weight: 600;
  color: #495057;
  font-size: 14px;
`;

export const TimestampValue = styled.span`
  color: #212529;
  font-size: 14px;
  font-style: italic;
`;

export const GenomesSection = styled.div`
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
`;

export const GenomesTitle = styled.h3`
  color: ${({ theme }) => theme.colors.dark_green};
  font-family: ${({ theme }) => theme.fonts.main};
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

export const GenomesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const GenomeItem = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.lt_green};
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
    background-color: white;
  }
`;

export const GenomeName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #212529;
  font-size: 16px;
  font-weight: 600;
`;

export const GenomeId = styled.span`
  font-size: 14px;
  font-family: monospace;
  color: #6c757d;
`;
