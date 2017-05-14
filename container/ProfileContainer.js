
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class ProfileContainer extends Component {


    render() {


        return (
            <View  style={{
                marginLeft: 80,
            }}>

              <Image
              style={{width: 200, height: 100}}

              source={require('../images/flylist-text.png')}
                />
                <Text style={{
                    marginLeft: 20,
                }}>(C) Fly-list.de @7HACK </Text>
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

module.exports = ProfileContainer;



