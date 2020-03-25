import React, { Component } from 'react';

const styles = {
  section: {
    width: '100%',
    position: 'relative'
  },
  h1: {
    fontSize: '10rem',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    content: '',
    transform: 'translate(-50%, -50%)'
  }
};

class Error extends Component {
  render() {
    return (
      <main>
        <section style={styles.section}>
          <h1 style={styles.h1}>404</h1>
        </section>
      </main>
    );
  }
}

export default Error;
