import React, {Component} from 'react';
import {View, Text, Image, TouchableNativeFeedback,TouchableOpacity} from 'react-native';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import { Settings } from '../../services/Service';
import AsyncStorage from '@react-native-community/async-storage';

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-popup-dialog';

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
    navlink(nav,text,image){        
        return(
            <TouchableOpacity style = {{height: 50,flexDirection: 'row',}} onPress={()=>{
                this.props.navigation.navigate(nav,{
                            email       : this.state.userEmail,
                            id          : this.state.id,
                            username    : this.state.username,
                            fullname    : this.state.fullname,
                            userpoint   : this.state.userpoint
                        })
            }}>
                    {/* <Image 
                        resizeMode='center'
                        source={{ uri: '../../components/icons/' + image}}
                        style={{width:25,height:25,alignSelf: 'center',marginLeft: 10,marginTop: -2}}>
                    </Image> */}
            
                {nav == 'Home' ?(
                    <Image 
                        resizeMode='center'
                        source={require('../../assets/images/icons/home.png')}
                        style={{width:25,height:25,alignSelf: 'center',marginLeft: 10,marginTop: -2}}>
                    </Image>
                ):(
                    <Image 
                        resizeMode='center'
                        source={require('../../assets/images/icons/question.png')}
                        style={{width:25,height:25,alignSelf: 'center',marginLeft: 10,marginTop: -2}}>
                    </Image>
                )}
                
                <Text style={AppStyles.sidebar.link}>{text}</Text>
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
                    <View>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.3)')}>
                            <View style={{padding : 14}}>
                                {this.navlink("Home","Home",'home.png')}
                                {this.navlink("Instruction","Instruction","question.png")}
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <TouchableNativeFeedback onPress={() => {this.setState({ defaultAnimationDialog: true })}} background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.3)')}>
                    <View style={AppStyles.sidebar.footer}>
                        <Image 
                            resizeMode='center'
                            source={require('../../assets/images/icons/logout.png')}
                            style={{width:25,height:25,alignSelf: 'center',marginLeft: 10,marginTop: -2}}>
                        </Image>
                        <Text style={AppStyles.sidebar.footerText}>Log Out</Text>
                    </View>
                </TouchableNativeFeedback>
                <Dialog
                    onDismiss={() => {
                        this.setState({ defaultAnimationDialog: false });
                    }}
                    width={0.9}
                    visible={this.state.defaultAnimationDialog}
                    rounded
                    actionsBordered
                    dialogTitle={
                        <DialogTitle
                        title="Log Out"
                        style={{
                            backgroundColor: '#F7F7F8',
                        }}
                        hasTitleBar={false}
                        align="left"
                        />
                    }
                    footer={
                        <DialogFooter>
                        <DialogButton
                            text="CANCEL"
                            bordered
                            onPress={() => {
                            this.setState({ defaultAnimationDialog: false });
                            }}
                            key="button-1"
                        />
                        <DialogButton
                            text="OK"
                            bordered
                            onPress={() => {
                            this.setState({ 
                                defaultAnimationDialog: false });
                                this.handleLogOut();
                            }}
                            key="button-2"
                        />
                        </DialogFooter>
                    }
                    >
                    <DialogContent
                        style={{
                        backgroundColor: '#F7F7F8',
                        }}
                    >
                        <Text>Apa anda yakin ingin keluar dari akun anda?</Text>
                    </DialogContent>
                    </Dialog>
            </View>
        )
    }
}

export default GlobalConsumer(Sidebar);