'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View
} from 'react-native';

var Icon = require('react-native-vector-icons/Entypo');

class PostContainer extends Component {

    render() {
        return (
        <View>
            <View style={{
               height:310,
               flexDirection:'column',
               padding:10,
               marginTop:10,
               backgroundColor:'#fff' 
            }}>
                <View style={{flexDirection:'row'}}>
                    <View  style={{flex:0.1}}>
                        <View style={{backgroundColor:'#2f3e45', height:30, width:30, borderRadius:10}}></View> 
                    </View>
                    <View style={{flex:0.7,marginLeft:10, marginTop:1}}>
                        <Text style={{color:'green',fontWeight:'bold', fontSize:12}}>{this.props.username}</Text>
                        <Text style={{marginTop:2,color:'#a3a1a1',fontWeight:'100', fontSize:10}}>Yesterday 8:00 am</Text>
                    </View>
                    <View style={{flex:0.2,marginLeft:10,backgroundColor:'#f9dc5c',borderRadius:10,marginTop:7,padding:3}}>
                        <Text style={{textAlign:'center',fontWeight:'bold', fontSize:10, color:'#fff'}}>GERMANY</Text>
                    </View>
                </View>
                <View style={{marginTop:10, marginBottom:10, height:0.5, backgroundColor:'#eaeaea' }} />
                <View style={{backgroundColor:'#e9eaee', height:200}}></View> 
                <View style={{marginTop:10, marginBottom:10, height:0.5, backgroundColor:'#eaeaea' }} />
                <View style={{ flexDirection:'row', justifyContent:'center'}}>
                 <Icon name="globe" size={20} color="#afbabc" />
                 <Text style={{marginLeft:4, marginTop:3,color:'#afbabc',fontWeight:'bold', fontSize:12}}>3</Text>
                 <View style={{width:30}}></View>
                 <Icon name="heart" size={20} color="#afbabc" />
                 <Text style={{marginLeft:4, marginTop:3,color:'#afbabc',fontWeight:'bold', fontSize:12}}>1.230</Text>
                 <View style={{width:30}}></View>
                 <Icon name="message" size={20} color="#afbabc" />
                 <Text style={{marginLeft:4, marginTop:3,color:'#afbabc',fontWeight:'bold', fontSize:12}}>23</Text>
                 <View style={{width:30}}></View>
                 <Icon name="man" size={20} color="#afbabc" />
                 <Text style={{marginLeft:4, marginTop:3,color:'#afbabc',fontWeight:'bold', fontSize:12}}>56</Text>
                </View>
            </View>
        </View>
        );
    }
}

class ExploreContainer extends Component {

    
    render() {
        return (
            <ScrollView
            ref='scrollView'
            automaticallyAdjustContentInsets={false}
            style={styles.scrollContainer}>
                <PostContainer username="Testname" /> 
                <PostContainer username="Chris" />
                <PostContainer username="User2" />
                <PostContainer username="User3" />
                <PostContainer username="User4" />
                <PostContainer username="User5" />
                <PostContainer username="User6" />
                <PostContainer username="User2" />
                <PostContainer username="User3" />
                <PostContainer username="User4" />
                <PostContainer username="User5" />
                <PostContainer username="User6" />
                <PostContainer username="User2" />
                <PostContainer username="User3" />
                <PostContainer username="User4" />
                <PostContainer username="User5" />
                <PostContainer username="User6" />
                <PostContainer username="User2" />
                <PostContainer username="User3" />
                <PostContainer username="User4" />
                <PostContainer username="User5" />
                <PostContainer username="User6" />
                <View style={{height:10}}></View> 
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  scrollContainer: {
      flex: 1,
      marginBottom:112,
      backgroundColor: '#f1f2f6',
  },
});

module.exports = ExploreContainer;
