import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import Search from '../components/Search';
import ComparativeGenomics from '../components/ComparativeGenomics';
import { ThemeProvider } from 'styled-components';
import { theme } from '../types/theme';
import { AppContainer, MainContent } from './App.styles';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/search" element={<Search />} />
            <Route path="/tools/comparative-genomics" element={<ComparativeGenomics />} />
          </Routes>
        </MainContent>-
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 