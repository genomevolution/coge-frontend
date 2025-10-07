import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BackButton } from "../Shared/BackButtom.style";
import {
  GenomeContainer,
  GenomeHeader,
  GenomeTitle,
  SpeciesName,
  GenomeName,
  GenomeInfo,
  InfoSection,
  InfoLabel,
  InfoValue,
  AnnotationsSection,
  AnnotationsTitle,
  AnnotationsList,
  AnnotationItem,
  AnnotationContent,
  AnnotationName,
  AnnotationDescription,
  AnnotationDownloadButton,
  AnnotationDownloadIcon,
  GenomeSection,
  DownloadTitle,
  DownloadButtons,
  DownloadButton,
  DownloadIcon,
} from "./GenomeDetails.styles.tsx";
import { API_ENDPOINTS } from "../../config/api.ts";
import { useGET } from "../../hooks/useGet.tsx";

const GenomeDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();


  const { id } = useParams<{ id: string }>();
  const genomeUrl = useMemo(() => `${API_ENDPOINTS.GENOMES}${id}`, [id]);

  const { result: genomeResult, error: genomeError, request: genomeRequest } = useGET(genomeUrl);

  useEffect(() => {
    if (id) {
      genomeRequest();
    }
  }, [id]);


  useEffect(() => {
    if (genomeError) {
      console.error('Error fetching genome:', genomeError);
      console.error('Failed URL:', genomeUrl);
    }
  }, [genomeError]);

  const handleBack = () => {
    const fromBiosample = location.state?.fromBiosample;
    const biosampleId = location.state?.biosampleId;

    if (fromBiosample && biosampleId) {
      navigate(`/biosamples/${biosampleId}`, {
        state: { returnedFromGenome: true },
        replace: true
      });
    } else {
      navigate("/tools/search");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleDownloadFasta = async () => {
    if (!genomeResult?.filePath) {
      console.error('No file path available for download');
      return;
    }

    try {
      const downloadUrl = `http://localhost:8000/files/download?filePath=${encodeURIComponent(genomeResult.filePath)}`;

      // Create a temporary anchor element to trigger download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${genomeResult.accesionId || 'genome'}.fasta`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDownloadGff3 = async (annotation: any) => {
    if (!annotation?.filePath) {
      console.error('No annotation file path available for download');
      return;
    }

    try {
      const downloadUrl = `http://localhost:8000/files/download?filePath=${encodeURIComponent(annotation.filePath)}`;
      
      // Create a temporary anchor element to trigger download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${genomeResult?.accesionId || 'genome'}_${annotation.name.toLowerCase().replace(' ', '_')}.gff3`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading annotation file:', error);
    }
  };

  const handleVisualizeJBrowser = () => {
    try {
      // Prepare annotation data for JBrowse
      const annotations = genomeResult?.annotations?.map((annotation: any) => ({
        name: annotation.name,
        filePath: `http://localhost:8000/files/download?filePath=${encodeURIComponent(annotation.filePath)}`
      })) || [];

      const mockedGenomeData = {
        name: genomeResult?.name || 'Ppersica',
        accessionId: genomeResult?.accesionId || 'Ppersica_298_v2.0',
        speciesName: genomeResult?.biosample?.speciesName || 'Prunus persica',
        fastaFile: `http://localhost:8000/files/download?filePath=${encodeURIComponent(genomeResult?.genomeVisualizationFiles.fasta_file_path)}`, 
        faiFile: `http://localhost:8000/files/download?filePath=${encodeURIComponent(genomeResult?.genomeVisualizationFiles.fai_file_path)}`,
        gziFile: `http://localhost:8000/files/download?filePath=${encodeURIComponent(genomeResult?.genomeVisualizationFiles.gzi_file_path)}`,
        annotations: annotations,
      };

      const jbrowseUrl = `${window.location.origin}/jbrowse`;
      const newTab = window.open(jbrowseUrl, '_blank');
      
      if (newTab) {
        newTab.addEventListener('load', () => {
          newTab.postMessage({ genomeData: mockedGenomeData }, window.location.origin);
        });
      }
    } catch (error) {
      console.error('Error opening JBrowse:', error);
    }
  };

  return (
    <GenomeContainer>
      <GenomeHeader>
        <BackButton onClick={handleBack} style={{ marginBottom: "2rem" }}>
          {t("comparative.genomics.shared.back.button")}
        </BackButton>

        <GenomeTitle>
          {genomeResult?.biosample?.speciesName && (
            <>
              <SpeciesName>{genomeResult.biosample.speciesName}</SpeciesName>
              {" - "}
            </>
          )}
          <GenomeName>{genomeResult?.name || "Loading..."}</GenomeName>
        </GenomeTitle>
      </GenomeHeader>

      <GenomeInfo>
        <InfoSection>
          <InfoLabel>Accession ID:</InfoLabel>
          <InfoValue>{genomeResult?.accesionId || "Loading..."}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Description:</InfoLabel>
          <InfoValue>{genomeResult?.description || "Loading..."}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Created:</InfoLabel>
          <InfoValue>{genomeResult?.createdAt ? formatDate(genomeResult.createdAt) : "Loading..."}</InfoValue>
        </InfoSection>
      </GenomeInfo>

      {genomeResult?.filePath && (
        <GenomeSection>
          <DownloadTitle>Visualization</DownloadTitle>
          <DownloadButtons>
            <DownloadButton onClick={handleVisualizeJBrowser}>
              <DownloadIcon>🧬</DownloadIcon>
              Visualize in JBrowse2
            </DownloadButton>
          </DownloadButtons>
        </GenomeSection>  
      )}


      {genomeResult?.annotations && genomeResult.annotations.length > 0 && (<AnnotationsSection>
        <AnnotationsTitle>Associated Annotations ({genomeResult.annotations.length})</AnnotationsTitle>
        <AnnotationsList>
          {genomeResult.annotations.map((annotation: any, index: number) => (
            <AnnotationItem key={index}>
              <AnnotationContent>
                <AnnotationName>{annotation.name}</AnnotationName>
                <AnnotationDescription>{annotation.description}</AnnotationDescription>
              </AnnotationContent>
              {annotation.filePath && (
                <AnnotationDownloadButton onClick={() => handleDownloadGff3(annotation)}>
                  <AnnotationDownloadIcon>
                    <img src="/download-icon.svg" alt="Download" />
                  </AnnotationDownloadIcon>
                </AnnotationDownloadButton>
              )}
            </AnnotationItem>
          ))}
        </AnnotationsList>
      </AnnotationsSection>)}


      {genomeResult?.filePath && (
        <GenomeSection>
          <DownloadTitle>Download Files</DownloadTitle>
          <DownloadButtons>
            <DownloadButton onClick={handleDownloadFasta}>
              <DownloadIcon>📄</DownloadIcon>
              Download FASTA
            </DownloadButton>
          </DownloadButtons>
        </GenomeSection>
      )}



    </GenomeContainer>
  );
};

export default GenomeDetails;
