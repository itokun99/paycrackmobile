import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Alert, AlertIOS, Platform, ActivityIndicator } from 'react-native';
import AppStyles from '../../styles/Android';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalConsumer } from '../../contexts/Context';
import API from '../../services/Service';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';


class ChangePassword extends Component {
    constructor(props){
        super(props);
        const loginData = this.props.globalState.loginData;
        this.state = {
            loginData : loginData,
            formData : {
                old_password : "",
                new_password : "",
                old_password : "",
            },
            showField1 : true,
            showField2 : true,
            showField3 : true,
            isLoading : false,
            isMatch : true,
        }
        this.handleChangeText1 = this.handleChangeText1.bind(this)
        this.handleChangeText2 = this.handleChangeText2.bind(this)
        this.handleChangeText3 = this.handleChangeText3.bind(this)
    }

    showField1 = () => {
        this.setState({
            showField1 : !this.state.showField1
        })
    }

    showField2 = () => {
        this.setState({
            showField2 : !this.state.showField2
        })
    }

    showField3 = () => {
        this.setState({
            showField3 : !this.state.showField3
        })
    }

    handleChangeText1 = (input) => {
        let formData = this.state.formData;
        formData.old_password = input
        this.setState({
            formData : formData
        })
    }
    handleChangeText2 = (input) => {
        let formData = this.state.formData;
        let isMatch = true;
        if(formData.new_password !== formData.verify_new_password){
            isMatch = false;
        }
        formData.new_password = input
        this.setState({
            formData : formData,
            isMatch : isMatch
        })
    }

    handleChangeText3 = (input) => {
        let formData = this.state.formData;
        formData.verify_new_password = input
        let isMatch = true;
        if(formData.new_password !== formData.verify_new_password){
            isMatch = false;
        }
        this.setState({
            formData : formData,
            isMatch : isMatch
        })
    }

    submit = () => {
        let loginData = this.state.loginData;
        let formData = this.state.formData;
        let noValue = false;
        for(let key in formData){
            if(formData[key] === ""){
                noValue = true;
            }
        }
        if(noValue){
            if(Platform.OS === "ios"){
                AlertIOS.alert("Form cannot empty!");
            } else {
                Alert.alert("Form cannot empty!");
            }
        } else {
            formData.appkey = loginData.appkey;
            formData.user_name = loginData.user_name;
            this.setState({
                isLoading : true,
            }, () => {
                API.changePassword(formData)
                .then((result) => {
                    if(result.status){
                        let data = result.data;
                        loginData.user_password = data.user_password;
                        AsyncStorage.setItem('loginData', JSON.stringify(loginData));
                        this.props.globalAction({
                            type : "USER_UPDATE",
                            data : loginData
                        })
                        this.setState({
                            isLoading : false
                        }, () => {
                            if(Platform.OS === "ios"){
                                AlertIOS.alert(result.message);
                            } else {
                                Alert.alert(result.message);
                            }
                        })
                    } else {
                        this.setState({
                            isLoading : false,
                        }, () => {
                            if(Platform.OS === "ios"){
                                AlertIOS.alert(result.message);
                            } else {
                                Alert.alert(result.message);
                            }
                        })   
                    }
                })
            })
        }
    }

    render(){
        return(
            <ScrollView style={AppStyles.profile.container}>
                <SafeAreaView>
                    <Spinner
                        visible={this.state.isLoading}
                        textContent="Loading..."
                        textStyle={{color : "#fff"}} 
                    />
                    <View style={AppStyles.profile.listWrap2}>
                        <Text style={AppStyles.profile.listTitle}>Old Password</Text>
                        <View style={{position : "relative"}}>
                            <TextInput onChangeText={this.handleChangeText1} ref={(ref) => this.OldPassword = ref} secureTextEntry={this.state.showField1} style={AppStyles.profile.listInput} />
                            <TouchableOpacity onPress={this.showField1} style={AppStyles.profile.eye}>
                                {this.state.showField1 ? (<Icon name="eye-slash" size={20} color="#222" />) : (<Icon name="eye" size={20} color="#222" />)}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={AppStyles.profile.listWrap2}>
                        <Text style={AppStyles.profile.listTitle}>New Password</Text>
                        <View style={{position : "relative"}}>
                            <TextInput onChangeText={this.handleChangeText2} ref={(ref) => this.NewPassword = ref} secureTextEntry={this.state.showField2} style={{...AppStyles.profile.listInput, ...this.state.isMatch ? null : {borderBottomColor : "red"}}}/>
                            {this.state.isMatch ? null : (<Text style={{fontSize : 14, color : 'red'}}>Password not Match</Text>)}
                            <TouchableOpacity onPress={this.showField2} style={AppStyles.profile.eye}>
                                {this.state.showField2 ? (<Icon name="eye-slash" size={20} color="#222" />) : (<Icon name="eye" size={20} color="#222" />)}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={AppStyles.profile.listWrap2}>
                        <Text style={AppStyles.profile.listTitle}>Verify New Password</Text>
                        <View style={{position : "relative"}}>
                            <TextInput onChangeText={this.handleChangeText3} ref={(ref) => this.VerifyNewPassword = ref} secureTextEntry={this.state.showField3} style={{...AppStyles.profile.listInput, ...this.state.isMatch ? null : {borderBottomColor : "red"}}} />
                            {this.state.isMatch ? null : (<Text style={{fontSize : 14, color : 'red'}}>Password not Match</Text>)}                            
                            <TouchableOpacity onPress={this.showField3} style={AppStyles.profile.eye}>
                                {this.state.showField3 ? (<Icon name="eye-slash" size={20} color="#222" />) : (<Icon name="eye" size={20} color="#222" />)}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={AppStyles.profile.listWrap2}>
                        {
                            this.state.isMatch?
                            (
                                <TouchableOpacity onPress={this.submit} style={AppStyles.profile.saveButton}>
                                    <Text style={AppStyles.profile.saveButtonText}>Save Change</Text>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity style={{...AppStyles.profile.saveButton, ...{backgroundColor : "rgba(0,0,0,0.2)"}}}>
                                    <Text style={AppStyles.profile.saveButtonText}>Save Change</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}


export default GlobalConsumer(ChangePassword);