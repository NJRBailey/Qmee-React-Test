import React from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import LaunchList from './components/LaunchList';
import LoadMore from './components/LoadMore';

// List of launches
// View details of specific launch
// Use images provided by API
// Build interesting feature

// Show 10 launches by default
// Filter box for dates
// 'Load ten more' button at bottom

class App extends React.Component {
  state = {
    launches: [],
    total_launch_count: null,
    next_launch: {
      flight_number: null,
      mission_name: null,
      launch_date_utc: null
    },
    background_image_url: null
  };

  componentDidMount() {
    // Get launches
    axios
      .get('https://api.spacexdata.com/v3/launches?order=DESC&limit=10&offset=0')
      .then((res) => {
        this.setState({launches: res.data})
      });
    // Get number of launches
    axios
    .get('https://api.spacexdata.com/v3/launches?sort=DESC&filter=flight_number')
    .then((res) => {
      this.setState({total_launch_count: res.data.length})
    });
    // Get next launch time
    axios
    .get('https://api.spacexdata.com/v3/launches/next?filter=flight_number,mission_name,launch_date_utc')
    .then((res) => {
      this.setState({next_launch: res.data})
    });
    // Get background image
    axios
    .get('https://api.spacexdata.com/v3/launches/13?filter=links/flickr_images')
    .then((res) => {
      this.setState({background_image_url: res.data.links.flickr_images[1]})
    });
  }

  loadLaunches = () => {
    let offset = this.state.launches.length;
    axios
      .get('https://api.spacexdata.com/v3/launches?order=DESC&limit=10&offset=' + offset)
      .then((res) => {
        this.setState({ launches: this.state.launches.concat(res.data) });
      });
  }

  render() {
    if (this.state.launches.length !== this.state.total_launch_count) {
      return (
        <div className="App">
            <Header next_launch={this.state.next_launch} />
            <LaunchList launches={this.state.launches} />
            <LoadMore loadLaunches={this.loadLaunches} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header next_launch={this.state.next_launch} />
          <LaunchList launches={this.state.launches} />
        </div>
      );
    }
  }
}

export default App;
