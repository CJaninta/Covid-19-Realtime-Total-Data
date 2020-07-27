import React from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Mapmark.css'
import { divIcon } from 'leaflet';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBBadge, MDBIcon } from 'mdbreact';

const icons = {
    verysmall: divIcon({
        className: 'marker verysmall', iconSize: [25, 25]
    }),
    small: divIcon({
        className: 'marker small', iconSize: [35, 35]
    }),
    verynormal: divIcon({
        className: 'marker verynormal', iconSize: [45, 45]
    }),
    normal: divIcon({
        className: 'marker normal', iconSize: [60, 60]
    }),
    large: divIcon({
        className: 'marker large', iconSize: [75, 75]
    }),
};

function MapView(props) {

    const { locations, cases, toggles, modals } = props;
    var { Nations, Provinces, ct_codes } = props;
    var { confirmes, recovers, deaths } = props;
    var { new_confirmes, new_recovers, new_deaths } = props

    //console.log(locations, cases)

    var i = 0, k = 0;
    var cases_covid = cases.Countries;

    const marker = locations.map(location => {
        const { id, country, country_code, province,
            coordinates: { latitude, longitude },
            latest: { confirmed, deaths }, last_updated
        } = location;

        let color = icons.verysmall;

        if (confirmed <= 1000) {
            color = icons.verysmall;
        }
        else {
            if (confirmed > 1001 && confirmed <= 5000) {
                color = icons.small;
            }
            else if (confirmed > 5001 && confirmed <= 10000) {
                color = icons.verynormal;
            }
            else if (confirmed > 10001 && confirmed <= 30000) {
                color = icons.normal;
            }
            else {
                color = icons.large;
            }
        }

        var recovers = 0;

        for (var key in cases_covid) {
            if (country_code == cases_covid[key].CountryCode) {
                recovers = cases_covid[key].TotalRecovered;
            }
        }

        var url_flag = "https://www.countryflags.io/" + country_code + "/flat/64.png";

        return (
            <Marker
                key={i++}
                position={[latitude, longitude]}
                icon={color}
                onmouseover={e => e.target.openPopup()}
                onmouseout={e => e.target.closePopup()}
                onClick={toggles(9, country, province, country_code, confirmed, deaths)}
            >
                <Popup autoPan={false} className="popup" closeButton={false}>

                    <br />
                    <center>
                        <span
                            style={{ fontWeight: "700", fontSize: "25px", color: "#fafafa" }}
                        ><MDBIcon icon="globe-americas" /> {country} {province} </span><br />
                        <img style={{ width: "60px", height: "55px" }} src={url_flag}></img>
                    </center>
                    <br />

                </Popup>
                {/*<Circle
                    center={{ lat: latitude, lng: longitude }}
                    color= {color}
                radius={radius} />*/}

            </Marker>

        )
    });

    var src_flag = "https://www.countryflags.io/" + ct_codes + "/flat/64.png";

    return (
        <div style={{overflow:"hidden"}}>
            <Map style={{ width: "100vw", height: "100vh"}} center={[13, 100]} zoom={5} zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors<br/>Web developed by Chawalit janinta "
                />
                <ZoomControl position="bottomright" />
                {marker}
            </Map>

            {/* Conutry Data */}
            <MDBContainer>
                <MDBModal isOpen={modals} toggle={toggles(9)} side position="top-right">
                    <MDBModalHeader toggle={toggles(9)} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                        <span style={{ color: "#ffffff", fontWeight: "650", fontSize: "25px", margin: "20px" }} >
                            <MDBIcon icon="globe-americas" style={{ marginRight: "15px" }} /> {Nations} {Provinces}
                        </span>
                        <img style={{ width: "20%", height: "5%" }} src={src_flag}></img>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <h3 style={{ fontWeight: "600", color: "#757575", marginLeft: "62px" ,marginTop:"15px"}}>Total</h3>
                        <MDBBadge pill color="warning" className="badges">Confirmed : {confirmes}</MDBBadge><br />
                        <MDBBadge pill color="success" className="badges">Recovered : {recovers}</MDBBadge><br />
                        <MDBBadge pill color="danger" className="badges">Deaths : {deaths}</MDBBadge>
                        <br /><br /><br />
                        <h3 style={{ fontWeight: "600", color: "#757575", marginLeft: "62px" }}>Today</h3>
                        <MDBBadge pill color="warning" className="badges">Confirmed : {new_confirmes}</MDBBadge><br />
                        <MDBBadge pill color="success" className="badges">Recovered : {new_recovers}</MDBBadge><br />
                        <MDBBadge pill color="danger" className="badges">Deaths : {new_deaths}</MDBBadge><br /><br />
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        </div>
    );

}

export default MapView;