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
  NoResultsContainer,
  ResultsList,
  ResultItem,
  ResultItemTitle,
  ResultItemType,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
  MenuAdditionalInfo,
  Tooltip,
} from "./Search.styles";
import { useTranslation } from "react-i18next";
import { useGET } from "../../hooks/useGet";
interface SearchItem {
  id: string;
  name: string;
  type: "genome" | "biosample" | "experiment";
}

const GENOMES_URL = "http://127.0.0.1:8000/genomes/";
const BIOSAMPLES_URL = "http://127.0.0.1:8000/biosamples/";

const Search: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuState, setMenuState] = useState([
    {
      key: "biosamples",
      label: t("comparative.genomics.search.biosamples"),
      icon: "🦠",
      isOpen: false,
    },
    {
      key: "genomes",
      label: t("comparative.genomics.search.genomes"),
      icon: "🧬",
      isOpen: false,
    },
    {
      key: "experiments",
      label: t("comparative.genomics.search.experiments"),
      icon: "🔬",
      isOpen: false,
    },
  ]);
  const [selectedMenu, setSelectedMenu] = useState<
    "genomes" | "biosamples" | "experiments"
  >("biosamples");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<SearchItem[]>([]);
  const [filteredData, setFilteredData] = useState<SearchItem[]>([]);
  const [currentData, setCurrentData] = useState<SearchItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  // Get data from backend
  const { result: genomesResult, request: genomesRequest } =
    useGET(GENOMES_URL);
  const { result: biosamplesResult, request: biosamplesRequest } =
    useGET(BIOSAMPLES_URL);
  const [genomes, setGenomes] = useState<SearchItem[]>([]);
  const [biosamples, setBiosamples] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (!genomesResult) {
      genomesRequest();
    } else {
      if (genomes.length === 0) {
        const parsed = parseResponse(genomesResult, "genome");
        setGenomes(parsed);
      }
    }
  }, [genomesRequest, genomesResult, genomes]);

  useEffect(() => {
    if (!biosamplesResult) {
      biosamplesRequest();
    } else {
      if (biosamples.length === 0) {
        const parsed = parseResponse(biosamplesResult, "biosample");
        setBiosamples(parsed);
        setFilteredData(parsed);
      }
    }
  }, [biosamplesResult, biosamplesRequest, biosamples]);

  // Mock data - replace with real data later
  // const mockData: SearchItem[] = [
  //   { id: "1", name: "Human Genome (GRCh38)", type: "genome" },
  //   { id: "2", name: "Mouse Genome (GRCm39)", type: "genome" },
  //   { id: "3", name: "Zebrafish Genome (GRCz11)", type: "genome" },
  //   { id: "4", name: "Homo sapiens", type: "biosample" },
  //   { id: "5", name: "Mus musculus", type: "biosample" },
  //   { id: "6", name: "Danio rerio", type: "biosample" },
  //   { id: "7", name: "RNA-seq Analysis 2024", type: "experiment" },
  //   { id: "8", name: "ChIP-seq Study", type: "experiment" },
  //   { id: "9", name: "Proteomics Analysis", type: "experiment" },
  //   { id: "10", name: "Human Genome (GRCh38) 2", type: "genome" },
  //   { id: "11", name: "Mouse Genome (GRCm39) 2", type: "genome" },
  //   { id: "12", name: "Zebrafish Genome (GRCz11) 2", type: "genome" },
  // ];

  const handleBack = () => {
    navigate("/");
  };

  const getFilteredData = () => {
    const typeMap = {
      genomes: "genome",
      biosamples: "biosample",
      experiments: "experiment",
    };

    switch (typeMap[selectedMenu]) {
      case typeMap.genomes:
        return genomes;
      case typeMap.biosamples:
        return biosamples;
      default:
        return [];
    }
  };

  useEffect(() => {
    if (filteredData.length > 0) {
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentData(filteredData.slice(startIndex, endIndex));
    }
  }, [filteredData, currentPage, setTotalPages, setCurrentData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const updateIsOpen = (key: string) => {
    let newState = [...menuState];
    for (var i = 0; i < newState.length; i++) {
      var newMenuItem = { ...newState[i] };
      if (newMenuItem.key === key) {
        newMenuItem.isOpen = !newMenuItem.isOpen;
      } else {
        newMenuItem.isOpen = false;
      }
      newState[i] = newMenuItem;
    }
    setMenuState(newState);
  };

  return (
    <SearchContainer>
      {/* Left Sidebar - Vertical Menu */}
      <Sidebar>
        <BackButton onClick={handleBack} style={{ marginBottom: "2rem" }}>
          {t("comparative.genomics.shared.back.button")}
        </BackButton>

        <SidebarTitle>
          {t("comparative.genomics.search.categories")}
        </SidebarTitle>

        <MenuContainer>
          {menuState.map(({ key, label, icon, isOpen }) => (
            <MenuButton
              key={key}
              onClick={() => {
                setCurrentPage(1);
                setSelectedMenu(key as any);
                setFilteredData(getFilteredData());
              }}
              isActive={selectedMenu === key}
            >
              <MenuIcon>{icon}</MenuIcon>
              {label}
              <MenuAdditionalInfo
                onClick={(e) => {
                  updateIsOpen(key);
                  e.stopPropagation();
                }}
              >
                ?{isOpen && <Tooltip>More info</Tooltip>}
              </MenuAdditionalInfo>
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

        {/* Results List */}
        <ResultsContainer>
          <ResultsTitle>Results ({filteredData.length})</ResultsTitle>

          {filteredData.length === 0 ? (
            <NoResultsContainer>
              <p>No {selectedMenu} found matching your search.</p>
            </NoResultsContainer>
          ) : (
            <>
              <ResultsList>
                {currentData.map((item) => (
                  <ResultItem key={item.id}>
                    <ResultItemTitle>{`${item.name} (${item.id})`}</ResultItemTitle>
                    <ResultItemType>{item.type}</ResultItemType>
                  </ResultItem>
                ))}
              </ResultsList>

              {/* Pagination */}
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
                    Page {currentPage} of {totalPages} ({filteredData.length}{" "}
                    total results)
                  </PaginationInfo>
                </PaginationContainer>
              )}
            </>
          )}
        </ResultsContainer>
      </SearchArea>
    </SearchContainer>
  );
};

export default Search;

function parseResponse(
  result: any,
  type: "genome" | "biosample" | "experiment"
): SearchItem[] {
  // extract data excluding pagination
  const data = result.data;
  return data.map((o: any) => {
    switch (type) {
      case "genome":
        return {
          id: o.accesionId,
          name: o.name,
          type: type,
        };
      case "biosample":
        return {
          id: o.taxId,
          name: o.name,
          type: type,
        };
      default:
        return null;
    }
  });
}
