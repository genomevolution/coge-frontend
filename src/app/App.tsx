import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import Search from '../components/Search';
import ComparativeGenomics from '../components/ComparativeGenomics';
import OrganismDetails from '../components/OrganismDetails';
import GenomeDetails from '../components/GenomeDetails';
import JBrowse from '../components/JBrowse';
import { ThemeProvider } from 'styled-components';
import { theme } from '../types/theme';
import { AppContainer, MainContent } from './App.styles';
import { Routes, Route, useLocation } from 'react-router-dom';

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
            <Route path="/biosamples/:id" element={<OrganismDetails />} />
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