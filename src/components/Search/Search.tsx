import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../Shared/BackButtom.style";
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
  ResultItemType,
  PaginationContainer,
  PaginationButton,
  PaginationInfo
} from "./Search.styles";
import { useTranslation } from "react-i18next";
import { useGET } from "../../hooks/useGet";
import { API_ENDPOINTS } from "../../config/api";
interface SearchItem {
  id: string;
  name: string;
  type: "genome" | "biosample" | "experiment";
}

function parseResponse(
  result: any,
  type: "genome" | "biosample" | "experiment"
): SearchItem[] {
  if (!result || !result.data) {
    return [];
  }
  
  const data = result.data;
  return data.map((o: any) => {
    switch (type) {
      case "genome":
        return mapGenome(o);
      case "biosample":
        return mapBiosample(o);
      default:
        return null;
    }
  }).filter(Boolean);
}

const mapGenome = (genome: any) => {
  return {
    id: genome.id,
    name: genome.name,
    type: "genome",
  };
}

const mapBiosample = (biosample: any) => {
  return {
    id: biosample.id,
    name: biosample.name,
    type: "biosample",
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

const Search: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState<menuItem>("organisms");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<SearchItem[]>([]);
  const [totalPages, _] = useState(1);

  const { result: genomesResult, request: genomesRequest} =
    useGET(API_ENDPOINTS.GENOMES);
  const { result: biosamplesResult, request: biosamplesRequest} =
    useGET(API_ENDPOINTS.BIOSAMPLES);

  useEffect(() => {
    if (selectedMenu === "genomes") {
      genomesRequest();
    } else if (selectedMenu === "organisms") {
      biosamplesRequest();
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
    if (biosamplesResult && selectedMenu === "organisms") {
      setCurrentData(parseResponse(biosamplesResult, "biosample"));
    }
  }, [biosamplesResult, selectedMenu]);


  const handleBack = () => {
    navigate("/");
  };

  const handleItemClick = (item: SearchItem) => {
    if (item.type === "biosample") {
      navigate(`/biosamples/${item.id}`);
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
            Search{" "}
            {selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}
          </SearchTitle>

          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder={`Search ${selectedMenu}...`}
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
          <ResultsTitle>Results </ResultsTitle>
          <>
            <ResultsList>
              {currentData.map((item) => (
                <ResultItem key={item.id} onClick={() => handleItemClick(item)}>
                  <ResultItemTitle>{`${item.name} (${item.id})`}</ResultItemTitle>
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
                  Page {currentPage} of {totalPages} ({" "} total results)
                </PaginationInfo>
              </PaginationContainer>
            )}
          </>

        </ResultsContainer>
      </SearchArea>
    </SearchContainer>
  );
};

export default Search;

