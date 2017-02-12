import React from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';

const styles = {
  display: 'flex'
};

class App extends React.Component {
  render() {
    return (
      <div style={styles}>
        <SideBar />
        <MainContent />
      </div>
    );
  }
}

export default App;
