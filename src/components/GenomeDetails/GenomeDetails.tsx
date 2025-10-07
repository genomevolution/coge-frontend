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
import { API_ENDPOINTS, buildFileDownloadUrl, triggerFileDownload } from "../../config/api.ts";
import { useGET } from "../../hooks/useGet.tsx";


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

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

  const handleDownloadFasta = () => {
    const filePath = genomeResult?.filePath;
    const fileName = `${genomeResult?.accesionId || 'genome'}.fasta`;
    triggerFileDownload(filePath, fileName);
  };

  const handleDownloadGff3 = (annotation: any) => {
    const filePath = annotation?.filePath;
    const fileName = `${genomeResult?.accesionId || 'genome'}_${annotation.name.toLowerCase().replace(' ', '_')}.gff3`;
    triggerFileDownload(filePath, fileName);
  };

  const handleVisualizeJBrowser = () => {
    try {
      const annotations = genomeResult?.annotations?.map((annotation: any) => ({
        name: annotation.name,
        filePath: buildFileDownloadUrl(annotation.filePath)
      })) || [];

      const data = {
        name: genomeResult?.name || 'Ppersica',
        accessionId: genomeResult?.accesionId || 'Ppersica_298_v2.0',
        speciesName: genomeResult?.biosample?.speciesName || 'Prunus persica',
        fastaFile: buildFileDownloadUrl(genomeResult?.genomeVisualizationFiles.fasta_file_path),
        faiFile: buildFileDownloadUrl(genomeResult?.genomeVisualizationFiles.fai_file_path),
        gziFile: buildFileDownloadUrl(genomeResult?.genomeVisualizationFiles.gzi_file_path),
        annotations: annotations,
      };

      const jbrowseUrl = `${window.location.origin}/jbrowse`;
      const newTab = window.open(jbrowseUrl, '_blank');

      if (newTab) {
        newTab.addEventListener('load', () => {
          newTab.postMessage({ genomeData: data }, window.location.origin);
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
          <GenomeName>{genomeResult?.name || t("comparative.genomics.genome.details.loading")}</GenomeName>
        </GenomeTitle>
      </GenomeHeader>

      <GenomeInfo>
        <InfoSection>
          <InfoLabel>{t("comparative.genomics.genome.details.accessionId")}</InfoLabel>
          <InfoValue>{genomeResult?.accesionId || t("comparative.genomics.genome.details.loading")}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>{t("comparative.genomics.genome.details.description")}</InfoLabel>
          <InfoValue>{genomeResult?.description || t("comparative.genomics.genome.details.loading")}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>{t("comparative.genomics.genome.details.created")}</InfoLabel>
          <InfoValue>{genomeResult?.createdAt ? formatDate(genomeResult.createdAt) : t("comparative.genomics.genome.details.loading")}</InfoValue>
        </InfoSection>
      </GenomeInfo>

      {genomeResult?.filePath && (
        <GenomeSection>
          <DownloadTitle>{t("comparative.genomics.genome.details.genomeBrowser")}</DownloadTitle>
          <DownloadButtons>
            <DownloadButton onClick={handleVisualizeJBrowser}>
              <DownloadIcon>🧬</DownloadIcon>
              {t("comparative.genomics.genome.details.visualizeJBrowse")}
            </DownloadButton>
          </DownloadButtons>
        </GenomeSection>
      )}


      {genomeResult?.filePath && (
        <GenomeSection>
          <DownloadTitle>{t("comparative.genomics.genome.details.downloadGenome")}</DownloadTitle>
          <DownloadButtons>
            <DownloadButton onClick={handleDownloadFasta}>
              <DownloadIcon>📄</DownloadIcon>
              {t("comparative.genomics.genome.details.downloadFasta")}
            </DownloadButton>
          </DownloadButtons>
        </GenomeSection>
      )}


      {genomeResult?.annotations && genomeResult.annotations.length > 0 && (<AnnotationsSection>
        <AnnotationsTitle>{t("comparative.genomics.genome.details.annotations")} ({genomeResult.annotations.length})</AnnotationsTitle>
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
                    <img src="/download-icon.svg" alt={t("comparative.genomics.download")} />
                  </AnnotationDownloadIcon>
                </AnnotationDownloadButton>
              )}
            </AnnotationItem>
          ))}
        </AnnotationsList>
      </AnnotationsSection>)}


    </GenomeContainer>
  );
};

export default GenomeDetails;
