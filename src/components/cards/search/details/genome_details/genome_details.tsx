import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BackButton } from "../../../../shared/back_button.style.tsx";
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
} from "./genome_details.styles.tsx";
import { API_ENDPOINTS, buildFileDownloadUrl, triggerFileDownload } from "../../../../../config/api.ts";
import { useGET } from "../../../../../hooks/useGet.tsx";


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

type FileResource = {
  path?: string;
};

type GenomeFileItem = {
  type?: string;
  file?: FileResource;
};

type AnnotationFileItem = {
  type?: string;
  file?: FileResource;
};

const FASTA_FILE_TYPE = "FASTA_GZ";
const FAI_FILE_TYPE = "FAI";
const GZI_FILE_TYPE = "GZI";
const GFF3_GZ_FILE_TYPE = "GFF3_GZ";

const findFilePathByType = <T extends { type?: string; file?: { path?: string } }>(
  files: T[] = [],
  targetType: string
): string | null => {
  const matchedFile = files.find((fileItem) => fileItem.type === targetType && fileItem.file?.path);

  return matchedFile?.file?.path ?? null;
};

const GenomeDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [hasFastaFile, setHasFastaFile] = useState(false);
  const [fastaFilePath, setFastaFilePath] = useState<string | null>(null);


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
      navigate(`/organisms/${biosampleId}`, {
        state: { returnedFromGenome: true },
        replace: true
      });
    } else {
      navigate("/tools/search");
    }
  };

  useEffect(() => {
    const path = findFilePathByType<GenomeFileItem>(genomeResult?.genomeFiles, FASTA_FILE_TYPE);
    setHasFastaFile(Boolean(path));
    setFastaFilePath(path);
  }, [genomeResult]);

  const handleDownloadFasta = () => {
    if (!fastaFilePath) {
      console.error('No FASTA file available for download');
      return;
    }

    const fileName = `${genomeResult?.accesionId || 'genome'}.fasta`;
    triggerFileDownload(fastaFilePath, fileName);
  };

  const handleDownloadGff3 = (annotation: any) => {
    const filePath = annotation?.filePath;
    const fileName = `${genomeResult?.accesionId || 'genome'}_${annotation.name.toLowerCase().replace(' ', '_')}.gff3`;
    triggerFileDownload(filePath, fileName);
  };

  const handleVisualizeJBrowser = () => {
    try {
      if (!fastaFilePath) {
        console.error('No FASTA file available for visualization');
        return;
      }

      const faiFilePath = findFilePathByType<GenomeFileItem>(genomeResult?.genomeFiles, FAI_FILE_TYPE);
      const gziFilePath = findFilePathByType<GenomeFileItem>(genomeResult?.genomeFiles, GZI_FILE_TYPE);

      const annotations =
        genomeResult?.annotations
          ?.map((annotation: any) => {
            const gff3Path = findFilePathByType<AnnotationFileItem>(annotation.files, GFF3_GZ_FILE_TYPE);

            if (!gff3Path) {
              return null;
            }

            return {
              name: annotation.name,
              filePath: buildFileDownloadUrl(gff3Path)
            };
          })
          .filter((annotationItem: { name: string; filePath: string } | null): annotationItem is { name: string; filePath: string } => Boolean(annotationItem)) || [];

      const data = {
        name: genomeResult?.name || 'Ppersica',
        accessionId: genomeResult?.accesionId || 'Ppersica_298_v2.0',
        speciesName: genomeResult?.biosample?.speciesName || 'Prunus persica',
        fastaFile: buildFileDownloadUrl(fastaFilePath),
        faiFile: faiFilePath ? buildFileDownloadUrl(faiFilePath) : undefined,
        gziFile: gziFilePath ? buildFileDownloadUrl(gziFilePath) : undefined,
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

      {hasFastaFile && (
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


      {hasFastaFile && (
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
