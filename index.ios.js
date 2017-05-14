import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ListView,
    Platform,
    TouchableHighlight,
    TabBarIOS,
    NavigatorIOS,
} from 'react-native';


import Icon from 'react-native-vector-icons/Entypo';
import renderIf from './helper/renderIf';

var Intro = require('./container/Intro');
var PageContainer  = require('./container/PageContainer');
var HomeContainer  = require('./container/HomeContainer');
var ChatContainer = require('./container/ChatContainer');
var ProfileContainer = require('./container/ProfileContainer');
var TimeTrackingContainer = require('./container/TimeTrackingContainer');
var StartContainer = require('./container/TimeTrackingContainer');

var tabPageContainers = [
    {container: TimeTrackingContainer},
    {container: PageContainer},
    {container: HomeContainer},
    {container: ChatContainer},
    {container: ProfileContainer},
    {container: StartContainer},
];

class Navigator extends Component {
    render() {
        return (
            //#E44505
            <NavigatorIOS
                ref="nav"
                barTintColor={this.props.navBarColor ? this.props.navBarColor : '#41A84D'}
                titleTextColor={this.props.navBarTextColor ? this.props.navBarTextColor : '#fff'}
                translucent={false}
                style={styles.navigationWrapper}
                initialRoute={{
                    component: tabPageContainers[this.props.pageNumber].container,
                    title: this.props.pageTitle,
                    passProps: {
                        pageTitle: this.props.pageTitle,
                        pageNumber: this.props.pageNumber,
                    },
                }}
            />
        );
    }
}


export default class flylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'HomeTab',
            notifCount: 0,
            presses: 0,
            toggled: false
        };

    }

    toggleSideMenu () {
        this.setState({
            toggled: !this.state.toggled
        })
    }

    componentDidMount() {

    }

    _onTabBarPress(selectedTab) {
        this.setState({
            selectedTab: selectedTab,
        });
    }



    render() {
        return (

            <TabBarIOS
                tintColor="#41A84D"
                barTintColor="#fff"
                translucent={false}>

                <Icon.TabBarItem
                    title=""
                    iconName="home"
                    selectedIconName="home"
                    iconSize={26}
                    selected={this.state.selectedTab === 'HomeTab'}
                    onPress={()=>this._onTabBarPress('HomeTab')}>
                    <Navigator pageTitle="Flylist" pageNumber="2" />
                </Icon.TabBarItem>



                <Icon.TabBarItem
                    title=""
                    iconName="dots-three-horizontal"
                    selectedIconName="dots-three-horizontal"
                    iconSize={25}
                    selected={this.state.selectedTab === 'ProfileTab'}
                    onPress={()=>this._onTabBarPress('ProfileTab')}>
                    <Navigator pageTitle="Einstellungen" pageNumber="4" />
                </Icon.TabBarItem>

            </TabBarIOS>
        );
    }
}

/*<Icon.TabBarItem
 title=""
 iconName="clock"
 selectedIconName="clock"
 iconSize={25}
 selected={this.state.selectedTab === 'TimerTab'}
 onPress={()=>this._onTabBarPress('TimerTab')}>
 <Navigator pageTitle="Zeiterfassung" pageNumber="0" />
 </Icon.TabBarItem>

 <Icon.TabBarItem
 title=""
 iconName="briefcase"
 selectedIconName="briefcase"
 iconSize={25}
 selected={this.state.selectedTab === 'WorkingHoursTab'}
 onPress={()=>this._onTabBarPress('WorkingHoursTab')}>
 <Navigator pageTitle="Arbeitszeiten" pageNumber="1" />
 </Icon.TabBarItem>

 <Icon.TabBarItem
 title=""
 iconName="chat"
 selectedIconName="chat"
 iconSize={25}
 selected={this.state.selectedTab === 'ChatTab'}
 onPress={()=>this._onTabBarPress('ChatTab')}>
 <Navigator pageTitle="Chat" pageNumber="3" />
 </Icon.TabBarItem>*/

const styles = StyleSheet.create({
    navigationWrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('flylist', () => flylist); /* Intro */
