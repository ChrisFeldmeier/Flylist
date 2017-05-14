
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class WorkingHoursContainer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    Title: {this.props.pageTitle}
                </Text>
                <Text style={styles.instructions}>
                    Page: {this.props.pageNumber}
                </Text>
            </View>
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
});

module.exports = WorkingHoursContainer;
