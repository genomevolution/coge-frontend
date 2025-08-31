import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.black};
  color: white;
  padding: 2rem 0;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.img`
  height: 50px;
  width: auto;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    height: 40px;
  }
`;

export const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FooterMenu = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 0.9rem;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.lt_green};
  }
`;

export const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin: 0;
`;
