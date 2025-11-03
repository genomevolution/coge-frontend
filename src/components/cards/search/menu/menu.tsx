import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../../shared/back_button.style";
import {
  SearchContainer,
  Sidebar,
  SidebarTitle,
  MenuContainer,
  MenuButton,
  MenuIcon,
  SearchArea,
  SearchHeader,
  SearchTitle,
  SearchBarContainer,
  SearchInput,
  SearchIcon,
  SearchButton,
  SearchButtonIcon,
  ResultsContainer,
  ResultsTitle,
  ResultsList,
  ResultItem,
  ResultItemTitle,
  SpeciesNameItalic,
  NameNormal,
  ResultItemType,
  PaginationContainer,
  PaginationButton,
  PaginationInfo
} from "./menu.styles";
import { useTranslation } from "react-i18next";
import { useGET } from "../../../../hooks/useGet";
import { API_ENDPOINTS } from "../../../../config/api";

interface SearchItem {
  id: string;
  name: string;
  type: "genome" | "organism" | "experiment";
  speciesName?: string;
  genomeName?: string;
}

function parseResponse(
  result: any,
  type: "genome" | "organism" | "experiment"
): SearchItem[] {
  if (!result || !result.data) {
    return [];
  }

  const data = result.data;
  return data.map((o: any) => {
    switch (type) {
      case "genome":
        return mapGenome(o);
      case "organism":
        return mapOrganism(o);
      default:
        return null;
    }
  }).filter(Boolean);
}

const mapGenome = (genome: any) => {
  return {
    id: genome.id,
    name:genome.name,
    type: "genome",
    speciesName: genome.organism.speciesName,
  };
}

const mapOrganism = (organism: any) => {
  return {
    id: organism.id,
    name: organism.name,
    speciesName: organism.speciesName,
    type: "organism",
  };
}


type menuItem = 'organisms' | 'genomes' | 'experiments';

const menuState = [
  {
    key: "organisms",
    label: "comparative.genomics.search.organisms",
    icon: "🦠",
    isOpen: false,
  },
  {
    key: "genomes",
    label: "comparative.genomics.search.genomes",
    icon: "🧬",
    isOpen: false,
  },
  {
    key: "experiments",
    label: "comparative.genomics.search.experiments",
    icon: "🔬",
    isOpen: false,
  },
]

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState<menuItem>("organisms");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<SearchItem[]>([]);
  const [totalPages, _] = useState(1);

  const { result: genomesResult, request: genomesRequest } = useGET(API_ENDPOINTS.GENOMES);
  const { result: organismsResults, request: organismRequest } = useGET(API_ENDPOINTS.ORGANISM);

  useEffect(() => {
    if (selectedMenu === "genomes") {
      genomesRequest();
    } else if (selectedMenu === "organisms") {
      organismRequest();
    } else if (selectedMenu === "experiments") {
      setCurrentData([]);
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (genomesResult && selectedMenu === "genomes") {
      setCurrentData(parseResponse(genomesResult, "genome"));
    }
  }, [genomesResult, selectedMenu]);

  useEffect(() => {
    if (organismsResults && selectedMenu === "organisms") {
      setCurrentData(parseResponse(organismsResults, "organism"));
    }
  }, [organismsResults, selectedMenu]);


  const handleBack = () => {
    navigate("/");
  };

  const handleItemClick = (item: SearchItem) => {
    if (item.type === "organism") {
      navigate(`/organisms/${item.id}`);
    } else if (item.type === "genome") {
      navigate(`/genomes/${item.id}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <SearchContainer>
      <Sidebar>
        <BackButton onClick={handleBack} style={{ marginBottom: "2rem" }}>
          {t("comparative.genomics.shared.back.button")}
        </BackButton>

        <SidebarTitle>
          {t("comparative.genomics.search.categories")}
        </SidebarTitle>

        <MenuContainer>
          {menuState.map(({ key, label, icon }) => (
            <MenuButton
              key={key}
              onClick={() => {
                setCurrentPage(1);
                setSelectedMenu(key as any);
              }}
              isActive={selectedMenu === key}
            >
              <MenuIcon>{icon}</MenuIcon>
              {t(label)}
            </MenuButton>
          ))}
        </MenuContainer>
      </Sidebar>

      <SearchArea>
        <SearchHeader>
          <SearchTitle>
            {t("comparative.genomics.search.title")}{" "}
            {selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}
          </SearchTitle>

          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder={`${t("comparative.genomics.search.placeholder")} ${selectedMenu}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <SearchIcon>🔍</SearchIcon>

            <SearchButton onClick={handleSearch}>
              <SearchButtonIcon>→</SearchButtonIcon>
            </SearchButton>
          </SearchBarContainer>
        </SearchHeader>

        <ResultsContainer>
          <ResultsTitle>{t("comparative.genomics.search.results")} </ResultsTitle>
          <>
            <ResultsList>
              {currentData.map((item) => (
                <ResultItem key={item.id} onClick={() => handleItemClick(item)}>
                  <ResultItemTitle>
                    <>
                      <SpeciesNameItalic>{item.speciesName}</SpeciesNameItalic>
                      {" - "}
                      <NameNormal>{item.name}</NameNormal>
                    </>
                  </ResultItemTitle>
                  <ResultItemType>{item.type}</ResultItemType>
                </ResultItem>
              ))}
            </ResultsList>

            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  isDisabled={currentPage === 1}
                >
                  ←
                </PaginationButton>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <PaginationButton
                    key={page}
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationButton>
                ))}

                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                >
                  →
                </PaginationButton>

                <PaginationInfo>
                  {t("comparative.genomics.search.page")} {currentPage} {t("comparative.genomics.search.of")} {totalPages} ({" "} {t("comparative.genomics.search.total")})
                </PaginationInfo>
              </PaginationContainer>
            )}
          </>
        </ResultsContainer>
      </SearchArea>
    </SearchContainer>
  );
};

export default Menu;

