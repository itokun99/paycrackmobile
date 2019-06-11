import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Alert,AlertIOS, Platform  } from 'react-native';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../services/Service';


class Profile extends Component {
    constructor(props){
        super(props);
        const loginData = this.props.globalState.loginData
        this.state = {
            loginData : loginData,
            isLoading : false,
        }
        
        this.addressChange = this.addressChange.bind(this);
    }

    addressChange  = (input) => {
        let loginData = this.state.loginData;
        loginData.user_address = input;
        this.setState({
            loginData : loginData
        })
    }

    submit = () => {
        let loginData = this.state.loginData;
        if(loginData.user_address === "" || loginData.user_address === null){
            if(Platform.OS === "ios"){
                AlertIOS.alert("Please fill the address");
            } else {
                Alert.alert("Please fill the address");
            }
        } else {
            this.setState({
                isLoading : true,
            }, () => {
                API.changeAddress(loginData)
                .then((result) => {
                    if(result.status){
                        let data = result.data;
                        loginData.user_address = data.user_address;
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
                            isLoading : true,
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
                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Fullname</Text>
                        <Text style={AppStyles.profile.listValue}>{this.state.loginData.user_fullname}</Text>
                    </View>
                    
                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Username</Text>
                        <Text style={AppStyles.profile.listValue}>{this.state.loginData.user_name}</Text>
                    </View>

                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Created Date</Text>
                        <Text style={AppStyles.profile.listValue}>{moment(this.state.loginData.user_created_date).format('DD MMMM YYYY')}</Text>
                    </View>
                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Address</Text>
                        <TextInput 
                            style={AppStyles.profile.listInput}
                            multiline={true}
                            numberOfLines={2} 
                            onChangeText={this.addressChange}
                            placeholder="Insert your address"
                            defaultValue={this.state.loginData.user_address === null ? "" : this.state.loginData.user_address}
                        />
                    </View>
                    <View style={AppStyles.profile.listWrap2}>
                        <TouchableOpacity onPress={this.submit} style={AppStyles.profile.saveButton}>
                            <Text style={AppStyles.profile.saveButtonText}>Save Change</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default GlobalConsumer(Profile);