import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BackButton } from "../Shared/BackButtom.style.tsx";
import { useGET } from "../../hooks/useGet.tsx";
import { API_ENDPOINTS } from "../../config/api.ts";
import {
  BiosampleContainer,
  BiosampleHeader,
  BiosampleTitle,
  SpeciesName,
  BiosampleName,
  BiosampleInfo,
  InfoSection,
  InfoLabel,
  InfoValue,
  GenomesSection,
  GenomesTitle,
  GenomesList,
  GenomeItem,
  GenomeName,
  GenomeId,
  TimestampSection,
  TimestampLabel,
  TimestampValue
} from "./OrganismDetails.styles.tsx";

const mockBiosample = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Salmonella enterica subsp. enterica serovar Typhimurium",
  user_fk: "123e4567-e89b-12d3-a456-426614174000",
  tax_id: "90371",
  metadata: {
    collection_date: "2023-05-15",
    collection_location: "University Hospital, Microbiology Lab",
    isolation_source: "Clinical specimen",
    host: "Homo sapiens",
    disease: "Gastroenteritis",
    antimicrobial_resistance: ["ampicillin", "tetracycline"],
    plasmid_presence: true,
    sequencing_platform: "Illumina NovaSeq 6000",
    coverage: "100x"
  },
  created_at: "2023-06-01T10:30:00Z",
  species_name: "Salmonella enterica subsp. enterica serovar Typhimurium"
};

const BiosampleDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const biosampleUrl = useMemo(() => `${API_ENDPOINTS.BIOSAMPLES}${id}`, [id]);

  const { result: biosampleResult, error: biosampleError, request: biosampleRequest } = useGET(biosampleUrl);

  useEffect(() => {
    if (id) {
      biosampleRequest();
    }
  }, [id]);

  useEffect(() => {
    if (biosampleError) {
      console.error('Error fetching biosample:', biosampleError);
      console.error('Failed URL:', biosampleUrl);
    }
  }, [biosampleError]);

  const handleBack = () => {
    navigate("/tools/search");
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

  return (
    <BiosampleContainer>
      <BiosampleHeader>
        <BackButton onClick={handleBack} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {t("comparative.genomics.shared.back.button")}
        </BackButton>

        <BiosampleTitle>
          <SpeciesName>{biosampleResult?.speciesName || "Loading..."}</SpeciesName>
          {biosampleResult?.name && (
            <>
              {" - "}
              <BiosampleName>{biosampleResult.name}</BiosampleName>
            </>
          )}
        </BiosampleTitle>
      </BiosampleHeader>

      <BiosampleInfo>
        <InfoSection>
          <InfoLabel>Biosample ID:</InfoLabel>
          <InfoValue>{biosampleResult?.id || "Loading..."}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Taxonomy ID:</InfoLabel>
          <InfoValue>{biosampleResult?.taxId || "Loading..."}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Species:</InfoLabel>
          <InfoValue>{biosampleResult?.speciesName || "Loading..."}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>User ID:</InfoLabel>
          <InfoValue>{mockBiosample.user_fk || "Not specified"}</InfoValue>
        </InfoSection>

        <TimestampSection>
          <TimestampLabel>Created:</TimestampLabel>
          <TimestampValue>{formatDate(biosampleResult?.createdAt || Date.now())}</TimestampValue>
        </TimestampSection>
      </BiosampleInfo>

      {biosampleResult?.genomes && biosampleResult.genomes.length > 0 && (
        <GenomesSection>
          <GenomesTitle>Associated Genomes ({biosampleResult.genomes.length})</GenomesTitle>
          <GenomesList>
            {biosampleResult.genomes.map((genome: any, index: number) => (
              <GenomeItem key={index}>
                <GenomeName>{genome.name}</GenomeName>
                <GenomeId>Accession: {genome.accesionId}</GenomeId>
              </GenomeItem>
            ))}
          </GenomesList>
        </GenomesSection>
      )}
    </BiosampleContainer>
  );
};

export default BiosampleDetails;
