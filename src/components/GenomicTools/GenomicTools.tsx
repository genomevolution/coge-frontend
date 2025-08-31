import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GenomicToolsContainer,
  ToolsContent,
  ToolsHeader,
  ToolsTitle,
  ToolsSubtitle,
  ToolsGrid,
  ToolCard,
  ToolIcon,
  ToolTitle,
  ToolDescription,
  ToolButton
} from './GenomicTools.styles';
import { useTranslation } from 'react-i18next';
import { TOOLS } from './index';

const GenomicTools: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detect if we're on the HomePage or on the /tools route
  const isHomePage = location.pathname === '/';

  const handleToolSelect = (toolId: string) => {
    console.log('Navigating to:', `/tools/${toolId}`);
    navigate(`/tools/${toolId}`);
  };

  return (
    <GenomicToolsContainer>
      <ToolsContent>
        <ToolsHeader>
          <ToolsTitle>
            {isHomePage ? 'Available Tools' : t("comparative.genomics.tools")}
          </ToolsTitle>
          <ToolsSubtitle>
            {isHomePage 
              ? 'Click on any tool to get started with your genomic analysis'
              : t("comparative.genomics.tools.description")
            }
          </ToolsSubtitle>
        </ToolsHeader>

        <ToolsGrid>
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} onClick={() => handleToolSelect(tool.id)}>
              <ToolIcon>{tool.icon}</ToolIcon>
              <ToolTitle>{tool.title}</ToolTitle>
              <ToolDescription>{tool.description}</ToolDescription>
              <ToolButton onClick={(e) => {
                e.stopPropagation();
                handleToolSelect(tool.id);
              }}>
                {tool.buttonText}
              </ToolButton>
            </ToolCard>
          ))}
        </ToolsGrid>
      </ToolsContent>
    </GenomicToolsContainer>
  );
};

export default GenomicTools;
