import React, {Component} from 'react';
import {View, Text, Image, SafeAreaView, StatusBar} from 'react-native';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import AsyncStorage from '@react-native-community/async-storage';

class LoadingFirst extends Component {
    
    checkLoginUser = async () => {
        try{
            let user_data = await AsyncStorage.getItem('loginData');
            if(user_data !== null){
                let loginData = JSON.parse(user_data);
                if(loginData.hasOwnProperty('user_id')){
                    this.props.globalAction({
                        type : "USER_LOGIN",
                        data : loginData
                    })
                    // this.props.navigation.navigate('App');
                    this.props.navigation.navigate('BannerScreen');
                }
            } else {
                this.props.navigation.navigate('Auth');
            }
        }catch(error){
            console.log(error)
            this.props.navigation.navigate('Auth');
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.checkLoginUser()
        }, 1000);
    }

    render(){
        // console.log(this);
        return(
            <SafeAreaView style={AppStyles.loadingfirst.container}>
                <StatusBar barStyle="light-content" backgroundColor={AppStyles.loadingfirst.container.backgroundColor} />
                <View  style={AppStyles.loadingfirst.loadingWrap}>
                    <Image source={require('../../assets/images/icons/icon_app.png')} resizeMode="contain" style={AppStyles.loadingfirst.loadingImage} />
                </View>
            </SafeAreaView>
        )
    }
}

export default GlobalConsumer(LoadingFirst);