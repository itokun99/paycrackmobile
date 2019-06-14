import React, {Component} from 'react';
import {View, Text, Image, TouchableNativeFeedback,TouchableOpacity} from 'react-native';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import API, { Settings } from '../../services/Service';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

import Toast from 'react-native-easy-toast';

class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : {} ,
            defaultAnimationDialog: false,
        }
    }

    navigateTo = (route) => {
            
    }

    handleLogOut = () => {
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
                AsyncStorage.clear();
                setTimeout(() => {
                    this.props.navigation.navigate('Loading');
                }, 500)
            } else {
                this.refs.toast.show(result.message);
            }
        })
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
    navlink(nav,text,image){   
        return(
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate(nav);
            }}>
                <View style={AppStyles.sidebar.navLink}>
                    <Icon name={image} color={AppStyles.color.base} size={28} style={AppStyles.sidebar.navLinkIcon} />
                    <Text style = {AppStyles.sidebar.navLinkText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
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
                    <View style={AppStyles.sidebar.navBody}>
                        {this.navlink("Home","Home","home")}
                        {this.navlink("Instruction","Instruction","question-circle-o")}
                        {this.navlink("Setting","Setting", "gear")}
                    </View>
                </View>
                <TouchableOpacity onPress={() => {this.setState({ defaultAnimationDialog: true })}}>
                    <View style={AppStyles.sidebar.footer}>
                        <View style={AppStyles.sidebar.navLink}>
                            <Icon name="sign-out" color={AppStyles.color.base} size={28} style={AppStyles.sidebar.navLinkIcon} />
                            <Text style = {AppStyles.sidebar.navLinkText}>Log Out</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Dialog
                    onDismiss={() => {this.setState({ defaultAnimationDialog: false })}}
                    width={0.9}
                    visible={this.state.defaultAnimationDialog}
                    rounded
                    actionsBordered
                    dialogTitle={
                        <DialogTitle title="Log Out" style={{backgroundColor: '#F7F7F8'}} hasTitleBar={false} align="left"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton text="CANCEL" bordered onPress={() => {this.setState({ defaultAnimationDialog: false });}} key="button-1"/>
                            <DialogButton text="OK" bordered onPress={() => { this.setState({ defaultAnimationDialog: false }); this.handleLogOut();}} key="button-2"/>
                        </DialogFooter>
                    }
                    >
                    <DialogContent style={{ backgroundColor: '#F7F7F8'}} >
                        <Text>Apa anda yakin ingin keluar dari akun anda?</Text>
                    </DialogContent>
                </Dialog>
                <Toast ref="toast" />
            </View>
        )
    }
}

export default GlobalConsumer(Sidebar);