import React from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavItem,
    MDBNavbarNav,
    MDBBadge,
    MDBIcon,
    MDBBtn,
    MDBModalBody,
    MDBModalHeader,
    MDBContainer,
    MDBModal,
    MDBTableHead,
    MDBTable,
    MDBTableBody,
    MDBModalFooter
} from "mdbreact";

import logo from './logo.png'

function Nav(props) {

    const { cases, toggles, modals, modals_2 } = props;

    var total = cases.Global;
    var info = [], i = 0, k = 0;
    for (var key in total) {
        info[i++] = total[key]
    }

    var total_case = cases.Countries;

    var TotalConfirmed_country = [{ country: '', total: '', new: '' }];

    for (key in total_case) {
        TotalConfirmed_country[key] = { country: total_case[key].Country, total: total_case[key].TotalConfirmed, new: total_case[key].NewConfirmed };
    }
    TotalConfirmed_country.sort(function (a, b) { return b.total - a.total })
    //console.log(TotalConfirmed_country)

    var country_rank = [];
    var total_rank = [];
    var new_confirmed = [];

    for (key in TotalConfirmed_country) {
        country_rank[key] = TotalConfirmed_country[key].country;
        total_rank[key] = TotalConfirmed_country[key].total;
        new_confirmed[key] = TotalConfirmed_country[key].new;
        k++;
        if (k == 10) {
            break;
        }
    }
    k = 0;

    //console.log(country_rank, total_rank)

    /*info[5]
    NewConfirmed     = info[0]
    TotalConfirmed   = info[1]
    NewDeaths        = info[2]
    TotalDeaths      = info[3]
    NewRecovered     = info[4]
    TotalRecovered   = info[5]
    */

    return (

        <div>

            <MDBNavbar dark expand="md" fixed="top" color="rgba-lime-strong">
                <MDBNavbarBrand style={{ paddingLeft: "10px" }}>
                    <img src={logo} alt="aligment" style={{ width: "45px", height: "45px" }} />
                </MDBNavbarBrand>

                <MDBNavbarNav left style={{ fontSize: "25px", fontWeight: "600" }}>

                    <span style={{ color: "#4B515D", fontWeight: "700", fontSize: "25px", marginRight: "50px" }} >Covid-19 Realtime Data</span>
                    <MDBNavItem active>
                        <span style={{ color: "rgba(0, 0, 0, 0.7", marginRight: "30px" }}>&nbsp; <MDBBadge pill color="warning"><MDBIcon icon="caret-right" /> Total Confirmed : {info[1]}</MDBBadge></span>
                    </MDBNavItem>
                    <MDBNavItem active>
                        <span style={{ color: "rgba(0, 0, 0, 0.7", marginRight: "30px" }}>&nbsp; <MDBBadge pill color="success"><MDBIcon icon="caret-right" /> Total Recovered : {info[5]}</MDBBadge></span>
                    </MDBNavItem>
                    <MDBNavItem active>
                        <span style={{ color: "rgba(0, 0, 0, 0.7", marginRight: "30px" }}>&nbsp; <MDBBadge pill color="danger"><MDBIcon icon="caret-right" /> Total Deaths : {info[3]}</MDBBadge></span>
                    </MDBNavItem>
                </MDBNavbarNav >
                <MDBNavbarNav right>
                    <MDBBtn onClick={toggles(12)} color="deep-orange lighten-2" style={{ borderRadius: "5px" }}><MDBIcon icon="globe" style={{ fontSize: "22px" }} /></MDBBtn>
                    <MDBBtn onClick={toggles(14)} color="grey darken-1" style={{ borderRadius: "5px" }}><MDBIcon icon="info-circle" style={{ fontSize: "22px" }} /></MDBBtn>
                </MDBNavbarNav >
            </MDBNavbar>

            {/* Global Data */}
            <MDBContainer>
                <MDBModal isOpen={modals} toggle={toggles(12)} fullHeight position="left">
                    <MDBModalHeader toggle={toggles(12)} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>

                        <span style={{ color: "#ffffff", fontWeight: "700", fontSize: "25px", marginLeft: "20px" }} >
                            <MDBIcon icon="globe" style={{ marginRight: "20px" }} />
                            Global Data
                        </span>

                    </MDBModalHeader>
                    <MDBModalBody>
                        <br />

                        <center><h4 style={{ fontWeight: "600", color: "#757575" }}>All of today's Data</h4></center><br />

                        <h5 style={{ fontWeight: "600", marginLeft: "40px", color: "#fbc02d" }}>New Confirmed
                            <span style={{ float: "right", marginRight: "40px" }}>
                                {info[0]}
                            </span>
                        </h5>

                        <h5 style={{ fontWeight: "600", marginLeft: "40px", color: "#81c784" }}>New Recovered
                            <span style={{ float: "right", marginRight: "40px" }}>
                                {info[4]}
                            </span>
                        </h5>

                        <h5 style={{ fontWeight: "600", marginLeft: "40px", color: "#e57373" }}>New Deaths
                            <span style={{ float: "right", marginRight: "40px" }}>
                                {info[2]}
                            </span>
                        </h5>
                        <br />
                        <MDBTable hover>
                            <MDBTableHead>
                                <tr>
                                    <th><span style={{ color: "#ff8a65", fontSize: "20px", fontWeight: "650" }}>Country</span></th>
                                    <th><span style={{ color: "#ffa726", fontSize: "19px", fontWeight: "650" }}>Total Confirmed</span></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {/*country_rank.map(el => (
                                        <div style={{ color: "#ff8a65", fontSize: "15px", fontWeight: "600", marginTop: "10px" }} ><td>{el} </td></div>
                                    ), this)*/
                                }
                                {country_rank.map(el => (

                                    <tr>
                                        <td style={{ color: "#ff8a65", fontSize: "15px", fontWeight: "600", marginTop: "10px", cursor: "pointer" }}>{k + 1}.{el}</td>
                                        <td style={{ color: "#ffa726", fontSize: "15px", fontWeight: "600", marginTop: "10px", cursor: "pointer" }}>
                                            <MDBIcon icon="user" /> : {total_rank[k++]}
                                            <span style={{ fontWeight: "500", fontSize: "12px", color: "#ef9a9a", marginLeft: "11px" }}> + {new_confirmed[k - 1]}</span>
                                        </td>
                                    </tr>

                                ), this)}

                                {/*total_rank.map(el => (
                                        <div style={{ color: "#ffa726", fontSize: "15px", fontWeight: "600", marginTop: "10px" }}><td><MDBIcon icon="user" /> : {el} </td></div>
                                    ), this)*/}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>

            <MDBContainer>
                <MDBModal isOpen={modals_2} toggle={toggles(14)} centered>
                    <MDBModalHeader toggle={toggles(14)} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                        <span style={{ color: "#ffffff", fontWeight: "700", fontSize: "25px", marginLeft: "20px" }} >
                            <MDBIcon icon="info-circle" style={{ marginRight: "20px" }} />
                            Info
                        </span>
                    </MDBModalHeader>
                    <MDBModalBody>

                        <div style={{ fontWeight: "600", color: "#757575", margin: "15px" }}>
                            <center>
                                <a href="https://github.com/Chawalit-janinta/Covid-19_Datatotal" style={{ fontSize: "30px", fontWeight: "500", color: "rgba(0, 0, 0, 0.7)", margin: "50px" }}>
                                    <MDBIcon fab icon="github" className="pr-1" /> Github
                                </a>
                            </center><br />
                            <a href="https://github.com/ExpDev07/coronavirus-tracker-api" style={{ fontSize: "15px", fontWeight: "500", color: "rgba(0, 0, 0, 0.7)", marginLeft: "30px" }}>
                                <MDBIcon icon="database" className="pr-1" /> Data Api by ExpDev07
                                </a><br />
                            <a href="https://covid19api.com/" style={{ fontSize: "15px", fontWeight: "500", color: "rgba(0, 0, 0, 0.7)", marginLeft: "30px" }}>
                                <MDBIcon icon="database" className="pr-1" /> Data Api by Kyle Redelinghuys
                                </a>

                        </div>

                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>

        </div>
    );

}

export default Nav;