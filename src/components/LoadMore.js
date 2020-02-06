import React from 'react';

// Limit 10
// Offset = app loaded number
// Disable if app loaded number === max number

class LoadMore extends React.Component {
  onClick = () => {
    this.props.loadLaunches()
  }

  render() {
    return (
      <button style={buttonStyle} onClick={this.onClick}>
        Load more launches
      </button>
    );
  }
}

const buttonStyle = {
  width: '100%',
  cursor: 'pointer',
  height: '50px',
  bottomMargin: '50px',
  backgroundColor: '#282c34',
  color: 'white',
  fontSize: '2em'
}

export default LoadMore;
