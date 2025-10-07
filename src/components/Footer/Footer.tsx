import React from 'react';
import {
  FooterContainer,
  FooterContent,
  FooterLeft,
  LogoContainer,
  Logo,
  FooterRight,
  FooterMenu,
  FooterLink,
  Copyright
} from './Footer.styles';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
          <LogoContainer>
            <Logo 
              src="/BTILogo.png" 
              alt="BTI Logo" 
              onClick={() => window.open('https://btiscience.org/', '_blank')}
            />
            <Logo 
              src="/uniandesLogo.png" 
              alt="Uniandes Logo" 
              onClick={() => window.open('http://uniandes.edu.co/', '_blank')}
            />
          </LogoContainer>
        </FooterLeft>

        <FooterRight>
          <FooterMenu>
            <FooterLink href="#about">{t("comparative.genomics.footer.about")}</FooterLink>
            <FooterLink href="#questions">{t("comparative.genomics.footer.questions")}</FooterLink>
          </FooterMenu>
          <Copyright>
            © {currentYear} {t("comparative.genomics.footer.copyright")}
          </Copyright>
        </FooterRight>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
