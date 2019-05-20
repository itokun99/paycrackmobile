import React, {Component} from 'react';
import {View, Text, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native';
import AppStyles from '../../styles/Android';
import { AndroidToast } from '../../components/Toast';
import API from '../../services/Service';
import AsyncStorage from '@react-native-community/async-storage';
import { GlobalConsumer } from '../../contexts/Context';

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
            }
        }
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

    // method password change text
    handlePasswordChange = (input) => {
        let loginData = {...this.state.loginData};
        loginData.password = input;
        this.setState({
            loginData : loginData
        })
    }

    hideToast = () => {
        this.setState({
            ToastData : {
                show  : false
            }
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
            let toast = {
                show : true,
                message : "Please fill the form!",
                size : "long",
                position : "bottom"
            }
            this.setState({
                showToast : true,
                ToastData : toast
            })
        } else {
            // login user dengan REST API
            API.userLogin(loginData)
            .then((result) => {
                if(result.status){
                    let user_data = result.data;
                    let toast = {
                        show : true,
                        message : result.message,
                        size : "long",
                        position : "bottom"
                    }
                    this.setState({
                        ToastData : toast
                    }, () => {
                        this.hideToast();
                    })
                    AsyncStorage.setItem('loginData', JSON.stringify(user_data));
                    this.props.globalAction({
                        type : "USER_LOGIN",
                        data : user_data
                    })
                    this.props.navigation.navigate('App');
                } else {
                    let toast = {
                        show : true,
                        message : result.message,
                        size : "long",
                        position : "bottom"
                    }
                    this.setState({
                        ToastData : toast
                    }, () => {
                        this.hideToast();
                    } )
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
                    <AndroidToast data={this.state.ToastData} />
                    <View style={styles.Loginform}>
                        <Image source={require('../../assets/images/icons/icon_app.png')} style={styles.loginIcon} resizeMode="contain" /> 
                        <View style={styles.formBody}>
                            <View style={styles.formGroup}>
                                <TextInput onChangeText={(input) => this.handleEmailChange(input)} style={styles.formControl} placeholder="Email" />
                            </View>
                            <View style={styles.formGroup}>
                                <TextInput onChangeText={(input) => this.handlePasswordChange(input)} style={styles.formControl} placeholder="Password" secureTextEntry={true} />
                                <Text onPress={() => this.props.navigation.push('ForgotPassword')} style={{textAlign : "right", marginTop : 8}}>Lupa Password?</Text>
                            </View>
                            <View style={styles.formGroup}>
                                <TouchableOpacity onPress={this.handleLogin} style={styles.btn}>
                                    <Text style={styles.btnText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>                
            </ScrollView>
        )
    }
}
export default GlobalConsumer(Login);