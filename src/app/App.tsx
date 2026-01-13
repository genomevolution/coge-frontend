
import Footer from '../components/landing/footer';
import Navbar from '../components/landing/navbar/navbar'; 
import HomePage from '../components/landing/home';
import Search from '../components/cards/search/menu';
import ComparativeGenomics from '../components/cards/comparative_genomics';
import OrganismDetails from '../components/cards/search/details/organism_details/organism_details';
import JBrowse from '../components/cards/search/jbrowse';
import { ThemeProvider } from 'styled-components';
import { theme } from '../types/theme';
import { Routes, Route, useLocation } from 'react-router-dom';
import GenomeDetails from '../components/cards/search/details/genome_details';
import { AppContainer, MainContent } from './app.styles';


function App() {
  const location = useLocation();
  const isJBrowseRoute = location.pathname === '/jbrowse';

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        {!isJBrowseRoute && <Navbar />}
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/search" element={<Search />} />
            <Route path="/tools/comparative-genomics" element={<ComparativeGenomics />} />
            <Route path="/organisms/:id" element={<OrganismDetails />} />
            <Route path="/genomes/:id" element={<GenomeDetails />} />
            <Route path="/jbrowse" element={<JBrowse />} />
          </Routes>
        </MainContent>
        {!isJBrowseRoute && <Footer />}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 

