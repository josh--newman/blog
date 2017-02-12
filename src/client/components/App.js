import React from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';

const styles = {
  display: 'flex',
  maxWidth: '1280px'
};

const links = [
  { href: '#', label: 'About this blog' },
  { href: '#', label: '12PPM challenge' }
];

class App extends React.Component {
  render() {
    return (
      <div style={styles}>
        <SideBar links={links} withBio />
        <MainContent />
      </div>
    );
  }
}

export default App;
