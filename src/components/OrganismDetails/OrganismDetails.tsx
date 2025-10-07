import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  TimestampLabel,
  TimestampValue
} from "./OrganismDetails.styles.tsx";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};


const BiosampleDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();


  const { id } = useParams<{ id: string }>();
  const [refreshKey, setRefreshKey] = useState(0);

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


  useEffect(() => {
    const isReturningFromNavigation = location.state?.returnedFromGenome;
    
    if (isReturningFromNavigation) {
      setRefreshKey(prev => prev + 1);
      
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  const handleBack = () => {
    navigate("/tools/search");
  };

  const handleGenomeClick = (genomeId: string) => {
    navigate(`/genomes/${genomeId}`, {
      state: {
        fromBiosample: true,
        biosampleId: id
      }
    });
  };

  return (
    <BiosampleContainer key={refreshKey}>
      <BiosampleHeader>
        <BackButton onClick={handleBack} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {t("comparative.genomics.shared.back.button")}
        </BackButton>

        <BiosampleTitle>
          <SpeciesName>{biosampleResult?.speciesName || t("comparative.genomics.genome.details.loading")}</SpeciesName>
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
          <InfoLabel>{t("comparative.genomics.organism.details.biosampleId")}:</InfoLabel>
          <InfoValue>{biosampleResult?.id || t("comparative.genomics.genome.details.loading")}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>{t("comparative.genomics.organism.details.taxId")}:</InfoLabel>
          <InfoValue>{biosampleResult?.taxId || t("comparative.genomics.genome.details.loading")}</InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>{t("comparative.genomics.organism.details.species")}:</InfoLabel>
          <InfoValue>{biosampleResult?.speciesName || t("comparative.genomics.genome.details.loading")}</InfoValue>
        </InfoSection>

        <InfoSection>
          <TimestampLabel>{t("comparative.genomics.organism.details.createdAt")}:</TimestampLabel>
          <TimestampValue>{formatDate(biosampleResult?.createdAt || Date.now())}</TimestampValue>
        </InfoSection>
      </BiosampleInfo>

      {biosampleResult?.genomes && biosampleResult.genomes.length > 0 && (
        <GenomesSection>
          <GenomesTitle>{t("comparative.genomics.organism.details.genomes")} ({biosampleResult.genomes.length})</GenomesTitle>
          <GenomesList>
            {biosampleResult.genomes.map((genome: any, index: number) => (
              <GenomeItem key={index} onClick={() => handleGenomeClick(genome.id)}>
                <GenomeName>{genome.name}</GenomeName>
                <GenomeId>{t("comparative.genomics.organism.details.accessionId")}: {genome.accesionId}</GenomeId>
              </GenomeItem>
            ))}
          </GenomesList>
        </GenomesSection>
      )}
    </BiosampleContainer>
  );
};

export default BiosampleDetails;
