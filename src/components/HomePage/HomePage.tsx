import React from 'react';
import SummaryCard from '../SummaryCard';
import GenomicTools from '../GenomicTools';
import { HomePageContainer } from './HomePage.styles';

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <SummaryCard />
      <GenomicTools />
    </HomePageContainer>
  );
};

export default HomePage;
