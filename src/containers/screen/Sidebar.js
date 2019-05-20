import React, {Component} from 'react';
import {View, Text, Image, TouchableNativeFeedback} from 'react-native';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import { Settings } from '../../services/Service';
import AsyncStorage from '@react-native-community/async-storage';

class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : {} 
        }
    }

    navigateTo = (route) => {
            
    }

    handleLogOut = async () => {
        try{
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
        }catch(error){

        }
    }

    setUserData = () => {
        let user = {...this.props.globalState.loginData};
        this.setState({
            user : user
        })
    }

    componentDidMount(){
        this.setUserData();
    }

    render(){
        return(
            <View style={AppStyles.sidebar.container}>
                <View style={AppStyles.sidebar.top}>
                    <View style={AppStyles.sidebar.header}>
                        <View style={AppStyles.sidebar.userPicWrapper}>
                            <Image source={{ uri : `${Settings.basePath}${typeof(this.state.user.user_pic) !== "undefined" ? this.state.user.user_pic : ""}`}} resizeMode="contain" style={AppStyles.sidebar.userPic} />
                        </View>
                        <Text style={AppStyles.sidebar.userName}>{this.state.user.user_fullname}</Text>
                        <Text style={AppStyles.sidebar.userEmail}>{this.state.user.user_email}</Text>
                    </View>
                    <View>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.3)')}>
                            <View style={{padding : 14}}>
                                <Text>Home</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <TouchableNativeFeedback onPress={this.handleLogOut} background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.3)')}>
                    <View style={AppStyles.sidebar.footer}>
                        <Text style={AppStyles.sidebar.footerText}>Log Out</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

export default GlobalConsumer(Sidebar);