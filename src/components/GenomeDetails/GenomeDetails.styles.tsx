import styled from "styled-components";

export const GenomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  overflow-y: auto;
`;

export const GenomeHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lt_green};
  padding-bottom: 1rem;
`;

export const GenomeTitle = styled.h1`
  color: ${({ theme }) => theme.colors.dark_green};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 2rem;
  margin: 0;
  line-height: 1.2;
`;

export const SpeciesName = styled.span`
  font-style: italic;
`;

export const GenomeName = styled.span`
  font-style: normal;
`;

export const GenomeInfo = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  max-width: 600px;
  line-height: 1.4;
`;

export const AnnotationsSection = styled.div`
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const AnnotationsTitle = styled.h3`
  color: ${({ theme }) => theme.colors.dark_green};
  font-family: ${({ theme }) => theme.fonts.main};
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

export const AnnotationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const AnnotationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  transition: all 0.2s;
`;

export const AnnotationContent = styled.div`
  flex: 1;
`;

export const AnnotationName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #212529;
  font-size: 16px;
  font-weight: 600;
`;

export const AnnotationDescription = styled.p`
  margin: 0;
  color: #6c757d;
  font-size: 14px;
  line-height: 1.4;
`;

export const GenomeSection = styled.div`
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const DownloadTitle = styled.h3`
  color: ${({ theme }) => theme.colors.dark_green};
  font-family: ${({ theme }) => theme.fonts.main};
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

export const DownloadButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.dark_green};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lt_green};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DownloadIcon = styled.span`
  font-size: 16px;
`;

export const AnnotationDownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.dark_green};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.dark_green};

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark_green};
    color: white;
    transform: scale(1.1);

    img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const AnnotationDownloadIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    transition: filter 0.2s ease;
  }
`;
