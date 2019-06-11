import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity  } from 'react-native';
import AppStyles from '../../styles/Android';
// import { GlobalConsumer } from '../../contexts/Context';


class SettingScreen extends Component {
    lintTo = (route, params) => {
        this.props.navigation.push(route, params);
    }

    render(){
        return(
            <ScrollView style={{paddingVertical : 8}}>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => this.lintTo('Profile')}>
                        <Text style={{paddingVertical : 16, paddingHorizontal : 24, fontSize : 18, borderBottomWidth : .5, borderBottomColor : 'rgba(0,0,0,0.1)'}}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.lintTo('ChangePassword')}>
                        <Text style={{paddingVertical : 16, paddingHorizontal : 24, fontSize : 18, borderBottomWidth : .5, borderBottomColor : 'rgba(0,0,0,0.1)'}}>Change Password</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default SettingScreen;