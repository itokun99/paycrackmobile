import React, { Component } from 'react';
import {View, Text, Dimensions} from 'react-native';
import AppStyles from '../../styles/Android';
import API,{Settings} from '../../services/Service';
import Dialog, {
    ScaleAnimation
} from 'react-native-popup-dialog';
import AsyncStorage from '@react-native-community/async-storage';
import CustomDialog from '../../components/CustomDialog';
import UserInactivity from 'react-native-user-inactivity';
import Toast from 'react-native-easy-toast';

let count = 0;
let count2 = 0;
let count3 = 0;
class ActivityWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            showDialog : false,
            dialogData : {
                title : "",
                message : "",
            },
            logoutTimer : 5,
            userLogout : false,
        }
    }

    
    handleLogOut = () => {
        this.setState({
            showDialog : false
        }, () => {
            let loginData = this.props.globalState.loginData;
            let params = {
                appkey : loginData.appkey
            }
            // console.warn(loginData);
            API.userLogout(params)
            .then((result) => {
                if(result.status){
                    this.refs.toast.show(result.message);
                    let action = {
                        type : "USER_LOGOUT"
                    }
                    this.props.globalAction(action);
                    setTimeout(() => {
                        AsyncStorage.clear();
                        this.props.navigation.navigate('Loading');
                    }, 500)
                } else {
                    this.refs.toast.show(result.message);
                }
            })
        })
    }

    componentDidMount() {
        // normalize
        count = 0;
        count2 = 0;
        count3 = 0;
    }

    componentDidUpdate(){
        if(count3 >= 0 && count3 <= 5){
            if(this.state.userLogout === true){
                count3 += 1;
                if(this.state.logoutTimer !== 0){
                    setTimeout(() => {
                        this.setState({
                            logoutTimer :  --this.state.logoutTimer
                        })
                    }, 1000)
                } else {
                    this.handleLogOut();
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state){
        // deklarasi variabel
        let loginData = props.globalState.loginData;
        let user_activity = props.globalState.user_active;

        // controller untuk mendeteksi kalau user tidak melakukan apapa
        if(count2 >= 0 && count2 <= 5){
            if(user_activity === false){
                // count disini untuk menghitung berapa kali dia baca script ini, baca tentang rerender lifecyle react

                count += 1;
                count2 += 1;
                if(count3 === 0){
                    state.showDialog = true;
                }
                state.userLogout = true;
                state.dialogData = {
                    title : "Warning!",
                    message : `Your session timeout! the app will automated logout in ${state.logoutTimer}!`,
                }
                return null;
            }
        }
        


        // untuk cek user jika ada device lain masuk maka device sebelumnya akan dipaksa buat logout
        if(count === 0){
            if(loginData !== null){
                if(loginData !== "undefined"){
                    if(loginData.user_device !== Settings.device_id){
                        // count disini untuk menghitung berapa kali dia baca script ini, baca tentang rerender lifecyle react
                        count += 1;
                        state.showDialog = true;
                        state.dialogData = {
                            title : "Warning!",
                            message : `Your account has login in another device!`,
                        }
                        return null;
                    }
                }
            }
        }
        return null
    }

    render(){
        console.warn(this.props)
        return(
            <>
                <Dialog
                    dialogAnimation = {new ScaleAnimation({
                        initialValue: 0, // optional
                        useNativeDriver: true, // optional
                    })}
                    containerStyle = {{zIndex : 999999}}
                    visible = {this.state.showDialog}
                    width = {Dimensions.get('window').width * 0.8}
                >
                    <View>
                        <CustomDialog
                            onPress={this.handleLogOut}
                            title={this.state.dialogData.title}
                            message={this.state.dialogData.message}
                        />
                    </View>
                </Dialog>
                <Toast ref="toast" />
            </>
        )
    }
}

export default ActivityWrapper;