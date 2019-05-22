import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native';
import AppStyles from '../../styles/Android';
import { AndroidToast } from '../../components/Toast';
import API from '../../services/Service';
import AsyncStorage from '@react-native-community/async-storage';
import { GlobalConsumer } from '../../contexts/Context';
import Toast, {DURATION} from 'react-native-easy-toast';

// init screen style 
const styles = AppStyles.login;

//Tampilan Login
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginData : {
                email : "",
                password : "",
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
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleValidateEmail = (email) => {
        var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email_regex.test(email);
    }

    // method email change text
    handleEmailChange = (input) => {
        let loginData = {...this.state.loginData};
        loginData.email = input;
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
                    this.refs.toast.show(result.message)
                    setTimeout(() => {
                        this.props.navigation.navigate('App');
                    }, 300)
                } else {
                    this.refs.toast.show(result.message);
                }
            })
        }
    }

    componentDidMount(){
           
    }

    render(){
        return(
            // scrollview untuk menghindari lock focus input 
            <ScrollView contentContainerStyle={styles.container} >
                <View style={styles.mainWrapper}>
                    {/* <AndroidToast data={this.state.ToastData} /> */}
                    <View style={styles.Loginform}>
                        <Image source={require('../../assets/images/icons/icon_app.png')} style={styles.loginIcon} resizeMode="contain" /> 
                        <View style={styles.formBody}>
                            <View style={styles.textBoxBtnHolder}>
                                <TextInput onChangeText={this.handleEmailChange} style={styles.formControl} placeholder="Email" />
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