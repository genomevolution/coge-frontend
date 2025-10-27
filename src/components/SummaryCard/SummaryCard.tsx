import React from "react";
import { useCounterAnimation } from "../../hooks";
import { StatData } from "./SummaryCard.model";
import {
  SummaryCardContainer,
  SummaryHeader,
  SummaryTitle,
  SummarySubtitle,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  Divider,
} from "./SummaryCard.styles";
import { useTranslation } from "react-i18next";

interface SummaryCardProps {
  data?: StatData;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  data = { organism: 156, genomes: 89, experiments: 234 },
}) => {
  const { t } = useTranslation();
  const organismCount = useCounterAnimation(data.organism, 800);
  const genomesCount = useCounterAnimation(data.genomes, 800);
  const experimentsCount = useCounterAnimation(data.experiments, 800);

  const stats = [
    {
      number: organismCount,
      label: t("comparative.genomics.summary.stats.organisms"),
      description: t("comparative.genomics.summary.stats.organisms.description"),
    },
    {
      number: genomesCount,
      label: t("comparative.genomics.summary.stats.genomes"),
      description: t("comparative.genomics.summary.stats.genomes.description"),
    },
    {
      number: experimentsCount,
      label: t("comparative.genomics.summary.stats.experiments"),
      description: t("comparative.genomics.summary.stats.experiments.description"),
    },
  ];

  return (
    <>
      <SummaryCardContainer>
        <SummaryHeader>
          <SummaryTitle>
            {t("comparative.genomics.summary.card.title")}
          </SummaryTitle>
          <SummarySubtitle>
            {t("comparative.genomics.summary.card.description")}
          </SummarySubtitle>
        </SummaryHeader>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number.toLocaleString()}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </SummaryCardContainer>
      <Divider />
    </>
  );
};

export default SummaryCard;
