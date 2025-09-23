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
  DownloadSection,
  DownloadTitle,
  DownloadButtons,
  DownloadButton,
  DownloadIcon
} from "./GenomeDetails.styles.tsx";
import { API_ENDPOINTS } from "../../config/api.ts";
import { useGET } from "../../hooks/useGet.tsx";

const mockGenome = {
  accesion_id: "CP123456.1",
  name: "Salmonella Typhimurium ST19 Complete Genome",
  description: "Complete genome sequence of Salmonella enterica subsp. enterica serovar Typhimurium strain ST19, isolated from clinical specimen. This genome contains 4,857,432 base pairs with 4,672 predicted protein-coding genes, 22 rRNA genes, and 86 tRNA genes.",
  created_at: "2023-06-01T10:30:00Z"
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

  const handleDownloadGff3 = (annotationName: string) => {
    const annotationSource = annotationName.replace(' Annotation', '').toLowerCase();

    const gff3Content = `##gff-version 3
##source=${annotationSource}
##sequence-region ${mockGenome.accesion_id} 1 4857432
${mockGenome.accesion_id}	${annotationSource}	gene	1	100	.	+	.	ID=gene_001;Name=dnaA;product=Chromosomal replication initiator protein DnaA
${mockGenome.accesion_id}	${annotationSource}	CDS	1	100	.	+	0	ID=CDS_001;Parent=gene_001;Name=dnaA;product=Chromosomal replication initiator protein DnaA
${mockGenome.accesion_id}	${annotationSource}	gene	200	300	.	+	.	ID=gene_002;Name=gyrA;product=DNA gyrase subunit A
${mockGenome.accesion_id}	${annotationSource}	CDS	200	300	.	+	0	ID=CDS_002;Parent=gene_002;Name=gyrA;product=DNA gyrase subunit A`;

    const blob = new Blob([gff3Content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mockGenome.accesion_id}_${annotationSource}.gff3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

      {genomeResult?.annotations && genomeResult.annotations.length > 0 && (<AnnotationsSection>
        <AnnotationsTitle>Associated Annotations ({genomeResult.annotations.length})</AnnotationsTitle>
        <AnnotationsList>
          {genomeResult.annotations.map((annotation: any, index: number) => (
            <AnnotationItem key={index}>
              <AnnotationContent>
                <AnnotationName>{annotation.name}</AnnotationName>
                <AnnotationDescription>{annotation.description}</AnnotationDescription>
              </AnnotationContent>
              <AnnotationDownloadButton onClick={() => handleDownloadGff3(annotation.name)}>
                <AnnotationDownloadIcon>
                  <img src="/download-icon.svg" alt="Download" />
                </AnnotationDownloadIcon>
              </AnnotationDownloadButton>
            </AnnotationItem>
          ))}
        </AnnotationsList>
      </AnnotationsSection>)}


      {genomeResult?.filePath && (
        <DownloadSection>
          <DownloadTitle>Download Files</DownloadTitle>
          <DownloadButtons>
            <DownloadButton onClick={handleDownloadFasta}>
              <DownloadIcon>📄</DownloadIcon>
              Download FASTA
            </DownloadButton>
          </DownloadButtons>
        </DownloadSection>
      )}


    </GenomeContainer>
  );
};

export default GenomeDetails;
