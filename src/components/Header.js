import React from 'react';
import moment from 'moment';

// Title
// Timer to next launch

class Header extends React.Component {
  render() {
    const {flight_number, mission_name, launch_date_utc} = this.props.next_launch;
    const next_launch_time = moment(launch_date_utc);
    const time_to_next = moment().to(next_launch_time);
    return (
      <header style={headerStyle}>
        <h1>SpaceX Launch Data</h1>
        Next launch 🚀 Flight {flight_number} ({mission_name}) {time_to_next}
      </header>
    );
  }
}

const headerStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  padding: '10px',
  fontSize: 'medium'
}

export default Header;
