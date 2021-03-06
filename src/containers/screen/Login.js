import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native';
import AppStyles from '../../styles/Android';
import { AndroidToast } from '../../components/Toast';
import API, {Settings} from '../../services/Service';
import AsyncStorage from '@react-native-community/async-storage';
import { GlobalConsumer } from '../../contexts/Context';
import Toast, {DURATION} from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
// init screen style 
const styles = AppStyles.login;

//Tampilan Login
class Login extends Component {
    constructor(props){
        super(props);
        const device = Settings.device_id;
        this.state = {
            loginData : {
                username : "",
                password : "",
                device : device, 
            },
            isLoading : false,
            isSuccessFull : false,
            ToastData : {
                show : false,
                message : "",
                size : "",
                position : ""
            },
            hidePassword: true,
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleValidateEmail = (email) => {
        var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email_regex.test(email);
    }

    // method email change text
    handleUsernameChange = (input) => {
        let loginData = {...this.state.loginData};
        loginData.username = input;
        this.setState({
            loginData : loginData
        })
    }

    managePasswordVisibility = () =>
    {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    // method password change text
    handlePasswordChange = (input) => {
        let loginData = {...this.state.loginData};
        loginData.password = input;
        this.setState({
            loginData : loginData
        })
    }

    handleLogin = () => {
        let loginData = {...this.state.loginData};
        let noValue = false;
        for(let key in loginData){
            if(loginData[key] === ""){
                noValue = true
            }
        }
        if(noValue){
            this.refs.toast.show("Please fill the form!");
        } else {
            this.setState({
                isLoading : true,
            }, () => {
                // login user dengan REST API
                API.userLogin(loginData)
                .then((result) => {
                    if(result.status){
                        let user_data = result.data;
                        AsyncStorage.setItem('loginData', JSON.stringify(user_data));
                        this.props.globalAction({
                            type : "USER_LOGIN",
                            data : user_data
                        })
                        this.setState({
                            isLoading : false,
                        }, () => {
                            setTimeout(() => {
                                this.refs.toast.show(result.message)
                                setTimeout(() => {
                                    this.props.navigation.navigate('BannerScreen');
                                }, 300)
                            },300)
                        })
                    } else {
                        this.setState({
                            isLoading : false
                        }, () => {
                            setTimeout(() => {
                                this.refs.toast.show(result.message);
                            },300)
                        })
                    }
                })
            })
        }
    }

    componentDidMount(){
           
    }

    render(){
        // console.warn(this.state.loginData.device);
        return(
            // scrollview untuk menghindari lock focus input 
            <ScrollView contentContainerStyle={styles.container} >
                <Spinner
                    visible={this.state.isLoading}
                    textContent="Loading..."
                    textStyle={{color : "#fff"}} 
                />
                <View style={styles.mainWrapper}>
                    {/* <AndroidToast data={this.state.ToastData} /> */}
                    <View style={styles.Loginform}>
                        <Image source={require('../../assets/images/icons/icon_app.png')} style={styles.loginIcon} resizeMode="contain" /> 
                        <View style={styles.formBody}>
                            <View style={styles.textBoxBtnHolder}>
                                <TextInput onChangeText={this.handleUsernameChange} style={styles.formControl} placeholder="Username" />
                            </View>
                            <View style={styles.textBoxBtnHolder}>
                                <TextInput onChangeText={this.handlePasswordChange} style={styles.formControl} placeholder="Password" secureTextEntry={this.state.hidePassword} />
                                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                                    <Image source = { ( this.state.hidePassword ) ? require('../../assets/images/icons/hide.png') : require('../../assets/images/icons/view.png') } style = { styles.btnImage } />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.push('ForgotPassword')} style={{alignItems: 'flex-end', marginTop : 8}}>
                                    <Text >Forgot Password?</Text>
                                </TouchableOpacity>
                            <View style={styles.formGroup}>
                                <TouchableOpacity onPress={this.handleLogin} style={styles.btn}>
                                    <Text style={styles.btnText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <Toast ref="toast" />                
            </ScrollView>
        )
    }
}
export default GlobalConsumer(Login);