'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    SegmentedControlIOS,
    TouchableHighlight,
    TextInput
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import Icon from 'react-native-vector-icons/Ionicons';


import CoolTabBar from './CoolTabBar';

class TimeTrackingContainer extends Component {

    render() {
        return (
            <ScrollableTabView
                style={{marginTop: 10, }}
                initialPage={0}
                locked={false}
                tabBarActiveTextColor={'#000'}
                tabBarPosition={'top'}
                renderTabBar={() => <CoolTabBar />}
            >
                <ScrollView tabLabel="news" style={styles.tabView}>
                    <View style={styles.t1}>
                        <GooglePlacesAutocomplete
                            placeholder='Reiseziel wählen'
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            listViewDisplayed={false}    // true/false/undefined
                            fetchDetails={false}
                            renderDescription={(row) => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                console.log(data);
                                console.log(details);
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
                            /*predefinedPlaces={[homePlace]}*/

                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                            /*renderLeftButton={() => ""*/
                            /*renderRightButton={() => <Text>Custom text after the input</Text>}*/
                        />


                    </View>
                </ScrollView>
                <ScrollView tabLabel="users" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Kunden</Text>

                    </View>
                </ScrollView>
                <ScrollView tabLabel="chat" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Messenger</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="globe" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Notifications</Text>
                    </View>
                </ScrollView>
                <ScrollView tabLabel="dots-three-horizontal" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Other nav</Text>
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
        height: 450,
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
});

module.exports = TimeTrackingContainer;
