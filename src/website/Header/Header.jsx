import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.png';
import { FaDownload } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileNav = () => setIsMobileNavVisible(!isMobileNavVisible);
  const closeMobileNav = () => setIsMobileNavVisible(false);

  const handleDownloadBrochure = () => {
    // Replace with your actual PDF path in the public folder
    const pdfUrl = '/brochure.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'BurgerCompany_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HeaderContainer className={isScrolled ? 'scrolled' : ''}>
      <HeaderContent>
        <Logo to="/">
          <LogoImage src={logo} alt="The Burger Company" />
        </Logo>

        <Navbar className={isMobileNavVisible ? 'mobile-active' : ''}>
          <NavList>
            {[
              { path: '/', name: 'Home' },
              { path: '/WebIndex/about', name: 'About Us' },
              { path: '/WebIndex/menu', name: 'Our Menu' },
              { path: '/WebIndex/Galleryin', name: 'Gallery' },
              { path: '/WebIndex/Branches', name: 'Locations' },
              { path: '/WebIndex/Job', name: 'Career' },
              { path: '/WebIndex/contact', name: 'Contact Us' },
            ].map((link) => (
              <NavItem key={link.path}>
                <StyledNavLink 
                  to={link.path} 
                  onClick={closeMobileNav}
                  activeClassName="active"
                >
                  {link.name}
                </StyledNavLink>
              </NavItem>
            ))}
            
            <NavItem>
              <DownloadButton onClick={handleDownloadBrochure} title="Download Brochure">
                <FaDownload />
              </DownloadButton>
            </NavItem>
          </NavList>
        </Navbar>

        <MobileToggle onClick={toggleMobileNav}>
          {isMobileNavVisible ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
        </MobileToggle>

        <FranchiseButton to="/WebIndex/Franchise">
          Franchise Inquiry
        </FranchiseButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

// Styled Components
const HeaderContainer = styled.header`
  height: 90px;
  transition: all 0.5s;
  z-index: 997;
  background: #fff;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  &.scrolled {
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    height: 70px;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(NavLink)`
  img {
    max-height: 60px;
    transition: all 0.3s;
  }

  .scrolled & img {
    max-height: 50px;
  }
`;

const LogoImage = styled.img`
  max-height: 60px;
  transition: all 0.3s;

  .scrolled & {
    max-height: 50px;
  }
`;

const Navbar = styled.nav`
  @media (max-width: 991px) {
    position: fixed;
    top: 90px;
    right: -100%;
    width: 300px;
    height: calc(100vh - 90px);
    background: #fff;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    overflow-y: auto;
    z-index: 999;

    &.mobile-active {
      right: 0;
    }
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 991px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const NavItem = styled.li`
  position: relative;
  padding: 0 15px;

  @media (max-width: 991px) {
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #333;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: 0.3s;
  padding: 10px 0;
  position: relative;

  &:hover {
    color: rgb(228, 20, 28);
  }

  &.active {
    color: rgb(228, 20, 28);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: rgb(228, 20, 28);
    }
  }

  @media (max-width: 991px) {
    display: block;
    padding: 10px 0;

    &.active::after {
      display: none;
    }
  }
`;

const DownloadButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  padding: 10px 0;
  transition: 0.3s;
  display: flex;
  align-items: center;
  margin-top:-14px;

  &:hover {
    color: rgb(228, 20, 28);
  }

  @media (max-width: 991px) {
    padding: 10px 0;
    font-size: 24px;
  }
`;

const MobileToggle = styled.div`
  display: none;
  font-size: 28px;
  cursor: pointer;
  color: #333;

  @media (max-width: 991px) {
    display: block;
  }
`;

const FranchiseButton = styled(NavLink)`
  background: rgb(228, 20, 28);
  color: #fff;
  padding: 10px 25px;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  margin-left: 20px;

  &:hover {
    background: #280b09;
    color: #fff;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

export default Header;