import React from 'react';
import moment from 'moment';

// View details of specific launch
// Use images provided by API
// Build interesting feature

class Launch extends React.Component {
  state = {
    key: this.props.launch.flight_number,
    images: [],
    collapsed: true
  }

  getStyle = () => {
    if (moment() < moment(this.props.launch.launch_date_utc)) {
      return {
        background: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted',
        marginBottom: '5px',
        textAlign: 'left'
      }
    } else {
      return {
        background: '#cfcfcf',
        padding: '10px',
        borderBottom: '1px #ccc dotted',
        marginBottom: '5px',
        textAlign: 'left'
      }
    }
  }

  toggleShowHide = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    const { launch } = this.props;
    const { rocket, launch_site} = launch;
    const { cores } = rocket.first_stage;
    const { block, payloads } = rocket.second_stage;

    let all_core_data = [];
    for (let i = 0; i < cores.length; i++) {
      let core_data = [];
      for (let key in cores[i]) {
        if (cores[i][key] !== null && cores[i][key] !== '') {
          const list_id = 'core_' + i + '_' + key;
          core_data.push(
            <li key={list_id}>
              {prettifyString(key)}: {cores[i][key].toString()}
            </li>
          );
        }
      }
      all_core_data.push(core_data);
    }

    let all_payload_data = [];
    for (let i = 0; i < payloads.length; i++) {
      let payload_data = [];
      for (let key in payloads[i]) {
        if (
            payloads[i][key] !== null
            && payloads[i][key] !== ''
            && payloads[i][key] !== []
          ) {
          const list_id = 'payload_' + i + '_' + key;

          if (key === 'orbit_params') {
            let orbit_data = [];
            const orbit_params = payloads[i][key];
            for (let orbit_key in orbit_params) {
              if (orbit_params[orbit_key] !== null) {
                orbit_data.push(
                  <li key={list_id + '_' + orbit_key}>
                    {prettifyString(orbit_key)}: {orbit_params[orbit_key].toString()}
                  </li>
                );
              }
            }
            payload_data.push(
              <ul key={list_id}>
                {orbit_data.map((datum) => {
                  return datum;
                })}
              </ul>
            );
          } else {
            payload_data.push(
              <li key={list_id}>
                {prettifyString(key)}: {payloads[i][key].toString()}
              </li>
            );
          }
        }
      }
      all_payload_data.push(payload_data);
    }

    let fairings = <></>;
    if (rocket.fairings) {
      let data = Object.entries(rocket.fairings).filter(([k, v]) => v !== null);
      if (data.length > 0) {
        fairings = <>
        Fairings:
        <ul>
          {data.map(([k, v]) => {
            return (
              <li key={k}>
                {prettifyString(k)}: {v.toString()}
              </li>
            )
          })}
        </ul>
        </>
      }
    }

    let ships = <></>
    if (launch.ships.length > 0) {
      ships = <>
        Ships:
        <ul>
          {launch.ships.map((ship) => {
            return <li key={ship}>
              {ship}
            </li>
          })}
        </ul>
      </>
    }

    let telemetry = <></>
    if (launch.telemetry.flight_club !== null) {
      telemetry = <>
        Flight Club:
        <a href={launch.telemetry.flight_club}>
          {launch.telemetry.flight_club}
        </a>
      </>
    }

    let links = <></>
    let mission_patch = <></>
    let link_entries = Object.entries(launch.links).filter(([k, v]) => v !== null)
    if (link_entries.length > 1) {
      links = <>
        {link_entries.map(([k,v]) => {
          if (k === 'reddit_campaign') {
            return (
              <a href={v}>Campaign<br></br></a>
            )
          }
          if (k === 'reddit_launch') {
            return (
              <a href={v}>Launch<br></br></a>
            )
          }
          if (k === 'reddit_recovery') {
            return (
              <a href={v}>Recovery<br></br></a>
            )
          }
          if (k === 'reddit_media') {
            return (
              <a href={v}>Media<br></br></a>
            )
          }
          if (k === 'mission_patch_small') {
            mission_patch = <img src={v} alt='Logo for mission'></img>
          }
          if (k === 'presskit') {
            return (
              <a href={v}>Press kit<br></br></a>
            )
          }
          if (k === 'wikipedia') {
            return (
              <a href={v}>Wikipedia info<br></br></a>
            )
          }
          if (k === 'video_link') {
            return (
              <a href={v}>Video<br></br></a>
            )
          }
          return null
          // if (k === 'flickr_images') {
          //   this.setState({images: v})
          // }
        })}
      </>
    }

    return (
      <div style={this.getStyle()}>
        <h2 style={h2Style}>
          <button id={launch.flight_number} onClick={this.toggleShowHide} style={buttonStyle}>
            +
          </button>
          Flight {launch.flight_number} | {' '}
          {launch.mission_name} | {' '}
          {moment(launch.launch_date_utc).format('Do MMMM YYYY')}
        </h2>
        <h3 style={hStyle}>
          Rocket: {rocket.rocket_name}
        </h3>
        <div style={this.state.collapsed ? {display:'none'} : {display:'inherit'}}>
          Rocket Type: {rocket.rocket_type}<br></br>
          <h4 style={hStyle}>First Stage Data:</h4><br></br>
          {all_core_data.map((core_data) => {
            return (
              <>
                Core:
                <ul>
                  {core_data.map((datum) => {
                    return datum;
                  })}
                </ul>
              </>
            )
          })}
          <h4 style={hStyle}>Second Stage Data:</h4><br></br>
          Block: {block}<br></br>
          {all_payload_data.map((payload_data) => {
            return (
              <>
                Payload:
                <ul>
                  {payload_data.map((datum) => {
                    return datum;
                  })}
                </ul>
              </>
            )
          })}
          {fairings}
          {ships}
          {telemetry}
        </div>
        <h3 style={hStyle}>
          Launch Site: {launch_site.site_name_long}
        </h3>
        <div style={this.state.collapsed ? {display:'none'} : {display:'inherit'}}>
          Site name: {launch_site.site_name}<br></br>
          Site ID: {launch_site.site_id}<br></br>
          <p>
            {launch.details}
          </p>
          {links}
        </div>
      </div>
    );
  }
}

const h2Style = {
  backgroundColor: '#282c34',
  color: 'white'
}

const hStyle = {
  marginBottom: '1px',
  marginTop: '1px'
}

const buttonStyle = {
  backgroundColor: 'white',
  color: '#282c34',
  borderRadius: '50%',
  cursor: 'pointer',
}

function prettifyString(str) {
  let pretty = str.replace('_', ' ');
  pretty = pretty.charAt(0).toUpperCase() + pretty.slice(1);
  return pretty;
}

export default Launch;
