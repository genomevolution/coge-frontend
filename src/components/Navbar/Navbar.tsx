import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import {
  CogGenomicsNavbar,
  NavbarContainer,
  NavbarLeft,
  NavbarCenter,
  NavbarRight,
  NavbarBrand,
  NavMenu,
  MobileMenuButton,
  Hamburger
} from './Navbar.styles';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <CogGenomicsNavbar>
      <NavbarContainer>
        <NavbarLeft>
          <NavbarBrand>
            {t("comparative.genomics.title")}
          </NavbarBrand>
        </NavbarLeft>

        <NavbarCenter>
          <NavMenu isActive={isMenuOpen}>
          </NavMenu>
        </NavbarCenter>

        <NavbarRight>  
          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger />
          </MobileMenuButton>
        </NavbarRight>
      </NavbarContainer>
    </CogGenomicsNavbar>
  );
};

export default Navbar;
