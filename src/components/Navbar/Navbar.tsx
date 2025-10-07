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
  Hamburger,
  LanguageSwitcher,
  LanguageButton
} from './Navbar.styles';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

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
          <LanguageSwitcher>
            <LanguageButton
              isActive={i18n.language === 'en'}
              onClick={() => handleLanguageChange('en')}
              title={t("comparative.genomics.language.english")}
            >
              🇺🇸
            </LanguageButton>
            <LanguageButton
              isActive={i18n.language === 'es'}
              onClick={() => handleLanguageChange('es')}
              title={t("comparative.genomics.language.spanish")}
            >
              🇪🇸
            </LanguageButton>
          </LanguageSwitcher>
          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger />
          </MobileMenuButton>
        </NavbarRight>
      </NavbarContainer>
    </CogGenomicsNavbar>
  );
};

export default Navbar;
