import styled from "styled-components";

export const CogGenomicsNavbar = styled.nav`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.dark_green} 0%, ${({ theme }) => theme.colors.dark_green} 40%, ${({ theme }) => theme.colors.lt_green} 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const NavbarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;  
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;


export const NavbarCenter = styled.div`
  flex: 1;
  text-align: center;
`;

export const NavbarBrand = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavMenu = styled.div<{ isActive?: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isActive }) => isActive ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.dark_green} 0%, ${({ theme }) => theme.colors.lt_green} 100%);
    padding: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #f8f9fa;
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Hamburger = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  background: white;
  position: relative;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background: white;
    transition: all 0.3s ease;
  }

  &::before {
    transform: translateY(-8px);
  }

  &::after {
    transform: translateY(8px);
  }
`;