import React, { Component } from 'react';
import Map from './Component/Map';
import Nav from './Component/Nav';
import axios from 'axios';
const api_location = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
const api_covid = 'https://api.covid19api.com/summary?fbclid=IwAR1fMdspy-mdK88tkr6qAXeGQckuQPAGx9ptE7rYOaR7VpnJNYJs3Ji-Cjk';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: [],
      case: [],
      nation: '',
      province: '',
      confirmed: 0,
      recoverd: 0,
      country_code: '',
      death: 0,
      new_confirmed: 0,
      new_recoverd: 0,
      new_death: 0,
      showMap : false
    };
  }

  componentDidMount() {
    axios.get(api_location)
      .then(response => {
        this.setState({ location: response.data.locations ,showMap:true})
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(api_covid)
      .then(response => {
        this.setState({ case: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  state = {
    modal12: false,
    modal9: false,
    modal14: false
  }


  render() {

    const toggle = (nr, country, province, country_code, confirmed, death) => () => {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });

      for (var key in this.state.case.Countries) {
        if (country_code == this.state.case.Countries[key].CountryCode) {
          this.setState({
            nation: country,
            province: province,
            country_code: country_code,
            confirmed: confirmed,
            death: death,
            recoverd: this.state.case.Countries[key].TotalRecovered,
            new_confirmed: this.state.case.Countries[key].NewConfirmed,
            new_death: this.state.case.Countries[key].NewDeaths,
            new_recoverd: this.state.case.Countries[key].NewRecovered,
          })
        }
      }
    }

    const map = (
      <Map
        locations={this.state.location}
        cases={this.state.case}
        Nations={this.state.nation}
        Provinces={this.state.province}
        confirmes={this.state.confirmed}
        recovers={this.state.recoverd}
        deaths={this.state.death}
        toggles={toggle}
        modals={this.state.modal9}
        ct_codes={this.state.country_code}
        new_confirmes={this.state.new_confirmed}
        new_recovers={this.state.new_recoverd}
        new_deaths={this.state.new_death}
      />
    );

    const loading = (
      <div style={{ marginTop: '300px' }}>
        <center>
          <div className="spinner-border text-danger" role="status" style={{ width: '100px', height: '100px', margin: '30px' }}>
            <span className="sr-only">Loading...</span>
          </div>
          <h2>Loading ...</h2>
        </center>
      </div>
    );

    return (
      <div>
        <Nav
          cases={this.state.case}
          toggles={toggle}
          modals={this.state.modal12}
          modals_2={this.state.modal14}
        />
        {this.state.showMap?map:loading}
      </div>
    );
  }
}

export default App;
