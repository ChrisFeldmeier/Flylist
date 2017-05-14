
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  SegmentedControlIOS,
  TouchableHighlight,
  TextInput,
  Text,
  View
} from 'react-native';

class TimerContainer extends Component {
    
    _onSetTimerPressed() {
        console.log('_onSetTimerPressed called');
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                        marginBottom:5,
                        fontSize:14,
                        textAlign:'left',
                        color:'#a3a1a1',
                }}>Time</Text>
                <TextInput
                    style={{
                        marginLeft:40, 
                        marginRight:40, 
                        height: 50,
                        backgroundColor: '#fff',
                        borderColor: '#e3dede',
                        borderWidth: 1,
                        borderRadius: 25,
                        fontSize:24,
                        fontWeight:'bold', 
                        textAlign:'center'
                    }}
                    value='8:00 am'
                />
                
                <View style={{height:20}}></View>
                    
                <Text style={{
                    marginBottom:5,
                    fontSize:14,
                    textAlign:'left',
                    color:'#a3a1a1',
                }}>Interval</Text>
                <TextInput
                    style={{
                        marginLeft:40, 
                        marginRight:40, 
                        height: 40,
                        backgroundColor: '#fff',
                        borderColor: '#e3dede',
                        borderWidth: 1,
                        borderRadius: 20,
                        fontSize:18,
                        fontWeight:'bold', 
                        textAlign:'center'
                    }}
                    value='only weekdays'
                />
                
                <View style={{height:20}}></View>
                    
                <Text style={{
                    marginBottom:5,
                    fontSize:14,
                    textAlign:'left',
                    color:'#a3a1a1',
                }}>Sound</Text>
                <TextInput
                    style={{
                        marginLeft:40, 
                        marginRight:40, 
                        height: 40,
                        backgroundColor: '#fff',
                        borderColor: '#e3dede',
                        borderWidth: 1,
                        borderRadius: 20,
                        fontSize:18,
                        fontWeight:'bold', 
                        textAlign:'center'
                    }}
                    value='happy'
                />
                
                <View style={{height:20}}></View>
                    
                <Text style={{
                    marginBottom:10,
                    fontSize:14,
                    textAlign:'left',
                    color:'#a3a1a1',
                }}>Wake Up - Mode</Text>
               
                <SegmentedControlIOS
                    style={{width:260,height:30}}
                    tintColor='#ff7761'
                    values={['Chill', 'Moderate', 'Aggressive']}
                    selectedIndex={0}
                />
                <Text style={{
                    marginTop:10,
                    fontSize:12,
                    textAlign:'left',
                    color:'#a3a1a1',
                }}>This means! Lorem Ipsum dolor...</Text>
                
                <View style={{height:20}}></View>
                    
                <TouchableHighlight
                    onPress={this._onSetTimerPressed.bind(this)}
                    underlayColor='#665851' 
                    style={{ 
                        backgroundColor:'#665851',
                        height:50,
                        width:290,
                        padding:10,
                        paddingTop:14,
                        borderColor:'#28282a',
                        borderWidth:0,
                        borderRadius:25
                    }}
                    >
                <Text style={{
                    textAlign:'center',
                    color:'#fff',
                    fontSize:18,
                    fontWeight:'400'
                }}>Buchen</Text>
                </TouchableHighlight>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }, 
});

module.exports = TimerContainer;
