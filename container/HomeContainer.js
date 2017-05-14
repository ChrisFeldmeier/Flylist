'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    SegmentedControlIOS,
    TextInput,
    AlertIOS,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import DatePicker from 'react-native-datepicker';
var md5 = require('md5');
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Swipeable from 'react-native-swipeable';


var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import Icon from 'react-native-vector-icons/Ionicons';


const homePlace = {description: 'Pro7 / 7HACK', geometry: { location: { lat: 48.193121, lng: 11.6464957 } }};

import CoolTabBar from './CoolTabBar';


class HomeContainer extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            objCurrentLocation: '',
            locationText: '[Reiseziel wählen]',
            dateStart: "2017-05-15",
            dateEnd: "2017-05-28",
            cityCode: '',
            forecast: null,
            basic: true,
            /*listViewData: Array(20).fill('').map((_,i)=>`item #${i}`)*/
            listViewData: require('../database/products.json')
        }
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({listViewData: newData});
    }

    category2icon(category) {
        switch(category) {
            case "gesundheit":
                return "ios-beer";
            case "kleidung":
                return "ios-shirt";
            case "ausruestung":
                return "ios-map";
            case "technik":
                return "ios-easel";
            case "kosmetik":
                return "ios-bug";
            case "dokumente":
                return "ios-folder";
            case "vorderreise":
                return "ios-eye";
            default:
                break;
        }
    }

    render() {
        return (
            <ScrollableTabView
                style={{marginTop: 10, }}
                initialPage={0}
                locked={true}
                tabBarActiveTextColor={'#000'}
                tabBarPosition={'top'}
                renderTabBar={() => <CoolTabBar />}
                ref={(tabView) => { this.tabView = tabView; }}
            >
              <ScrollView tabLabel="map" style={styles.tabView}>
                <View style={styles.t1}>
                  <GooglePlacesAutocomplete
                      placeholder='Reiseziel wählen'
                      minLength={2} // minimum length of text to search
                      autoFocus={false}
                      listViewDisplayed={false}    // true/false/undefined
                      fetchDetails={true}
                      renderDescription={(row) => row.description} // custom description render
                      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          this.tabView.goToPage(1);
                          this.setState({locationText: data.description});
                          this.setState({objCurrentLocation: data});
                          var place = data.description.split(",");
                          var md5key = md5("7hack"+"hacktheweather"+place[0]);
                          fetch("http://rwds2.wetter.com/location/index/search/"+place[0]+"/user/7hack/cs/"+md5key+"")
                              .then((response) => response.json())
                              .then((responseJson) => {
                                  /*console.log(responseJson.search.result[0].city_code);*/
                                  /* responseJson.search.result[0].plz */
                                  this.setState({cityCode: responseJson.search.result[0].city_code});


                                  /********/
                                  var md5_citycode = md5("7hack"+"hacktheweather"+responseJson.search.result[0].city_code);
                                  fetch("http://rwds2.wetter.com/forecast/weather/city/"+responseJson.search.result[0].city_code+"/user/7hack/cs/"+md5_citycode+"/")
                                      .then((response) => response.json())
                                      .then((responseJson) => {
                                          this.setState({forecast: responseJson.city.forecast});
                                          var min = new Array();
                                          var max = new Array();
                                          for (var dt in responseJson.city.forecast) {
                                              min.push(Number.parseInt(responseJson.city.forecast[dt].tn));
                                              max.push(Number.parseInt(responseJson.city.forecast[dt].tx));
                                          }
                                          /*AlertIOS.alert(
                                              'Forecast',
                                              "min: " + Math.min.apply(null,min.sort((a, b) => a - b)) + " max: " + Math.max.apply(null,max.sort((a, b) => a - b))
                                          );*/
                                          var minTemp = Math.min.apply(null,min.sort((a, b) => a - b));
                                          var maxTemp = Math.max.apply(null,max.sort((a, b) => a - b));
                                          this.setState({temperature: "Temperatur: "+ minTemp +"° / " + maxTemp + "° "});

                                          return responseJson;
                                      })
                                      .catch((error) => {
                                          console.error(error);
                                      })
                                  /*********/


                                  return responseJson;
                              })
                              .catch((error) => {
                                  console.error(error);
                              })
                      }}
                      getDefaultValue={() => {
                          return ''; // text input default value
                      }}
                      query={{
                          // available options: https://developers.google.com/places/web-service/autocomplete
                          key: 'AIzaSyB1fe1y2lAuTYH4lsDtlM6jqIwGLHJqtk8',
                          language: 'de', // language of the results
                          types: '(regions)', // default: 'geocode'
                      }}
                      styles={{
                          description: {
                              fontWeight: 'normal',
                          },
                          predefinedPlacesDescription: {
                              color: '#1faadb',
                          },
                      }}

                      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                      currentLocationLabel="Aktueller Standort"
                      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                      GoogleReverseGeocodingQuery={{
                          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                      }}
                      GooglePlacesSearchQuery={{
                          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                          rankby: 'distance',
                          types: 'food',
                      }}
                      enablePoweredByContainer={false}
                      /* locality', 'administrative_area_level_3 */
                      filterReverseGeocodingByTypes={["country"]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                      predefinedPlacesAlwaysVisible={true}
                      predefinedPlaces={[homePlace]}

                      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                      /*renderLeftButton={() => ""*/
                      /*renderRightButton={() => <Text>Custom text after the input</Text>}*/
                  />


                </View>
              </ScrollView>
              <ScrollView tabLabel="calendar" style={styles.tabView}>
                <View style={styles.t2}>
                    <View style={{
                        height: 250,
                    }}>
                    <Grid>
                        <Row>
                                <Col style={{
                                    paddingLeft: 20,
                                }} size={40}><Text style={styles.silverText}>Reiseziel</Text></Col>
                                <Col size={60}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                    }}>{this.state.locationText}</Text>
                                    <Text>{this.state.temperature}</Text>
                                </Col>

                        </Row>
                        <Row>
                            <Col size={40} style={{
                                paddingLeft: 20,
                            }}><Text style={styles.silverText}>Beginn</Text></Col>
                            <Col size={60}>
                                <DatePicker
                                    style={{
                                        width: 200,
                                        left: 0,
                                        top: 0,
                                        margin: 0,
                                        padding: 0
                                    }}
                                    date={this.state.dateStart}
                                    mode="date"
                                    placeholder="Datum wählen"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Abbrechen"
                                    showIcon={false}
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            marginLeft: 0,
                                            display: 'none'
                                        },
                                        dateInput: {
                                            marginLeft:0,
                                            marginRight:40,
                                            height: 30,
                                            backgroundColor: '#fff',
                                            borderColor: '#e3dede',
                                            borderWidth: 1,
                                            borderRadius: 25,
                                            padding: 0
                                        }
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col size={40} style={{
                                paddingLeft: 20,
                            }}><Text style={styles.silverText}>Ende</Text></Col>
                            <Col size={60}>
                                <DatePicker
                                    style={{
                                        width: 200,
                                        left: 0,
                                        margin: 0,
                                        padding: 0
                                    }}
                                    date={this.state.dateEnd}
                                    mode="date"
                                    placeholder="Datum wählen"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Abbrechen"
                                    showIcon={false}
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            marginLeft: 0,
                                            display: 'none'
                                        },
                                        dateInput: {
                                            marginLeft:0,
                                            marginRight:40,
                                            height: 30,
                                            backgroundColor: '#fff',
                                            borderColor: '#e3dede',
                                            borderWidth: 1,
                                            borderRadius: 25,
                                            padding: 0
                                        }
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col size={40} style={{
                                paddingLeft: 20,
                            }}><Text style={styles.silverText}>Kategorie</Text></Col>
                            <Col size={60}><Text>blablabla</Text></Col>

                        </Row>
                        <Row>
                            <Col size={40} style={{
                                paddingLeft: 20,
                            }}><Text style={styles.silverText}>Aktivität</Text></Col>
                            <Col size={60}><Text>blablabla</Text></Col>

                        </Row>

                    </Grid>
                    </View>









                </View>
              </ScrollView>
              <ScrollView tabLabel="clipboard" style={styles.tabView}>
                <View style={styles.t3}>

                    <SwipeListView
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={ data => (
                            <TouchableHighlight
                                onPress={ _ => console.log('You touched me') }
                                style={styles.rowFront}
                                underlayColor={'#AAA'}
                            >
                                <View >
                                    <Text><Icon name={ this.category2icon(data.category)} size={24} color="#CCC" /> {data.name}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenRow={ (data, secId, rowId, rowMap) => (
                            <View style={styles.rowBack}>
                                <Text>Left</Text>
                                <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                                    <Text style={styles.backTextWhite}>Right</Text>
                                </View>
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
                                    <Text style={styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                    />
                </View>
              </ScrollView>
              <ScrollView tabLabel="star" style={styles.tabView}>
                <View style={styles.t2}>
                  <Text>Favouriten</Text>
                </View>
              </ScrollView>

            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    silverText: {
        marginBottom:0,
        margin: 0,
        padding: 0,
        fontSize:14,
        textAlign:'left',
        color:'#a3a1a1'
    },
    tabView: {
        flex: 1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    t1: {
        borderWidth: 0,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 0,
        height: 400,
        padding: 0,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    t2: {
        borderWidth: 0,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 0,
        height: 400,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    t3: {
        borderWidth: 0,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 0,
        height: '100%',
        padding: 0,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 450,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },
    rowFront: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: '#CCC',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 0,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: '#41a84d',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 0
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: 100,
    }
});

module.exports = HomeContainer;
