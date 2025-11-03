import React from 'react';
import SummaryCard from '../summary_card';
import GenomicTools from '../genomic_tools';
import { HomePageContainer } from './home_page.styles';

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <SummaryCard />
      <GenomicTools />
    </HomePageContainer>
  );
};

export default HomePage;
