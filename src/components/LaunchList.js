import React from 'react';
import Launch from './Launch';

class LaunchList extends React.Component {
  render() {
    return this.props.launches.map((launch) => (
			<Launch key={launch.flight_number} launch={launch} />
		));
  }
}

export default LaunchList;
