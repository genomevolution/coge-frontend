import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BackButton } from "../Shared/BackButtom.style";
import {
  GenomeContainer,
  GenomeHeader,
  GenomeTitle,
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

const mockGenome = {
  accesion_id: "CP123456.1",
  name: "Salmonella Typhimurium ST19 Complete Genome",
  description: "Complete genome sequence of Salmonella enterica subsp. enterica serovar Typhimurium strain ST19, isolated from clinical specimen. This genome contains 4,857,432 base pairs with 4,672 predicted protein-coding genes, 22 rRNA genes, and 86 tRNA genes.",
  created_at: "2023-06-01T10:30:00Z"
};

const mockAnnotations = [
  {
    name: "Prokka Annotation",
    description: "Automated prokaryotic genome annotation using Prokka pipeline. Includes gene predictions, functional assignments, and metabolic pathway analysis."
  },
  {
    name: "ResFinder Annotation",
    description: "Antimicrobial resistance gene annotation using ResFinder database. Identified resistance genes for ampicillin, tetracycline, and streptomycin."
  },
  {
    name: "PlasmidFinder Annotation",
    description: "Plasmid replicon detection and classification. Identified IncFIB and IncFII plasmid replicons."
  },
  {
    name: "VFDB Annotation",
    description: "Virulence factor annotation using Virulence Factor Database. Identified 45 virulence-associated genes including type III secretion system components."
  }
];

const GenomeDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Check if we came from a biosample page
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

  const handleDownloadFasta = () => {

    const fastaContent = `>${mockGenome.accesion_id} ${mockGenome.name}
ATGCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG
ATGCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG
ATGCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG`;

    const blob = new Blob([fastaContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mockGenome.accesion_id}.fasta`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

        <GenomeTitle>{mockGenome.name}</GenomeTitle>
      </GenomeHeader>

      <GenomeInfo>
        <InfoSection>
          <InfoLabel>Accession ID:</InfoLabel>
          <InfoValue>{mockGenome.accesion_id}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Description:</InfoLabel>
          <InfoValue>{mockGenome.description}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Created:</InfoLabel>
          <InfoValue>{formatDate(mockGenome.created_at)}</InfoValue>
        </InfoSection>
      </GenomeInfo>

      <AnnotationsSection>
        <AnnotationsTitle>Associated Annotations ({mockAnnotations.length})</AnnotationsTitle>
        <AnnotationsList>
          {mockAnnotations.map((annotation, index) => (
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
      </AnnotationsSection>

      <DownloadSection>
        <DownloadTitle>Download Files</DownloadTitle>
        <DownloadButtons>
          <DownloadButton onClick={handleDownloadFasta}>
            <DownloadIcon>📄</DownloadIcon>
            Download FASTA
          </DownloadButton>
        </DownloadButtons>
      </DownloadSection>
    </GenomeContainer>
  );
};

export default GenomeDetails;
