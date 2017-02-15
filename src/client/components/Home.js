import React from 'react';
import { Link } from 'react-router';
import { SideBar } from './Shared';
import MainContent from './MainContent';

const links = [
  <Link key='about' to='/'>About this blog</Link>,
  <Link key='12ppm' to='/'>12PPM challenge</Link>
];

const styles = {
  display: 'flex',
  maxWidth: '1280px'
};

class Home extends React.Component {
  render() {
    return (
      <div style={styles}>
        <SideBar links={links} withBio />
        <MainContent />
      </div>
    );
  }
}

export default Home;
