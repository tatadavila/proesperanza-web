import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import '@styles/css/navbar.css';
import logo from '@images/logos/Icon_Esperanza.jpg';
import letter from '@images/logos/Letter_Esperanza.png';
import { Container } from '@components/global';
import {
  Nav,
  NavItem,
  // Brand,
  StyledContainer,
  NavListWrapper,
  MobileMenu,
  Mobile,
} from './style';

import { ReactComponent as MenuIcon } from '@static/icons/menu.svg';
import { Link } from 'gatsby';

const NAV_ITEMS = ['Proyecto', 'Brands', 'Team', 'FAQ'];

class Navbar extends Component {
  state = {
    mobileMenuOpen: false,
  };

  toggleMobileMenu = () => {
    this.setState(prevState => ({ mobileMenuOpen: !prevState.mobileMenuOpen }));
  };

  closeMobileMenu = () => {
    if (this.state.mobileMenuOpen) {
      this.setState({ mobileMenuOpen: false });
    }
  };

  getNavAnchorLink = item => (
    <AnchorLink href={`#${item.toLowerCase()}`} onClick={this.closeMobileMenu}>
      {item}
    </AnchorLink>
  );

  getNavList = ({ mobile = false }) => (
    <NavListWrapper mobile={mobile}>
      <Scrollspy
        items={NAV_ITEMS.map(item => item.toLowerCase())}
        currentClassName="active"
        mobile={mobile}
        offset={-64}
      >
        {NAV_ITEMS.map(navItem => (
          <NavItem key={navItem}>{this.getNavAnchorLink(navItem)}</NavItem>
        ))}
      </Scrollspy>
    </NavListWrapper>
  );

  render() {
    const { mobileMenuOpen } = this.state;

    return (
      <Nav {...this.props}>
        <StyledContainer>
          <Link to="/">
            <div class="logo-container">
              <img src={logo} class="logo" alt="Logo Proyecto Esperanza" />
              <img src={letter} class="letter" alt="Letra Proyecto Esperanza" />
            </div>
          </Link>
          <Mobile>
            <button onClick={this.toggleMobileMenu} style={{ color: 'black' }}>
              <MenuIcon />
            </button>
          </Mobile>

          <Mobile hide>{this.getNavList({})}</Mobile>
        </StyledContainer>
        <Mobile>
          {mobileMenuOpen && (
            <MobileMenu>
              <Container>{this.getNavList({ mobile: true })}</Container>
            </MobileMenu>
          )}
        </Mobile>
      </Nav>
    );
  }
}

export default Navbar;
