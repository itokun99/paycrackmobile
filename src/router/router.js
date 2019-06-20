import React, { Component } from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';
import Home from '../containers/screen/Home';
import Login from '../containers/screen/Login';
import AppStyles from '../styles/Android';
import Sidebar from '../containers/screen/Sidebar';
import ForgotPassword from '../containers/screen/ForgotPassword';
import LoadingFirst from '../containers/screen/LoadingFirst';
import DrawerIcon from '../components/DrawerIcon';
import CoinCounter from '../components/CoinCounter';
import Instruction from '../containers/screen/Instruction';
import PointHistory from '../containers/screen/PointHistory';
import DetailMenu from '../containers/screen/DetailMenu';
import RedeemHistory from '../containers/screen/RedeemHistory';
import SpinWheel from '../containers/screen/SpinWheel';
import DailyLogin from '../containers/screen/DailyLogin';
import SettingScreen from '../containers/screen/SettingScreen';
import Profile from '../containers/screen/Profile';
import ChangePassword from '../containers/screen/ChangePassword';
import BannerScreen from '../containers/screen/BannerScreen';
import WheelHistory from '../containers/screen/WheelHistory';
import ActivityWrapper from '../containers/wrapper/ActivityWrapper';


// routing untuk user setelah login
const HomeStack = createStackNavigator({
    Home : { 
        screen : Home,
        navigationOptions : ({ navigation }) => ({
            headerLeft : <DrawerIcon navigation={navigation} />,
            title : "Home"
        }) 
    },
    HistoryPoint : {
        screen : PointHistory,
        navigationOptions : {
            title : "History Point",
            headerRight : null,
        }
    },
    DetailMenu:{
        screen :DetailMenu,
        navigationOptions : {
            title : "Detail Items",
            drawerLockMode : "locked-closed",
            // headerRight : null,
        }
    },
    HistoryRedeem : {
        screen : RedeemHistory,
        navigationOptions : {
            title : "History Redeem",
            headerRight : null,
        }
    },
    SpinWheel : {
        screen : SpinWheel,
        navigationOptions : {
            title : "Lucky Change"
        }
    },
    WheelHistory : {
        screen : WheelHistory,
        navigationOptions : {
            title : "Jackpot",
            headerRight : null,
        }
    },
    DailyLogin : {
        screen : DailyLogin,
        navigationOptions : ({ navigation }) => ({
            title : "Daily Checkin",
            headerTransparent : true,
            headerTintColor : '#fff',
            headerStyle : {
                backgroundColor : "transparent",
            },
            headerRight : <CoinCounter textColor={{color : "#fff"}} style={{borderColor : "#fff"}} navigation={navigation} />
        })
    },
    Setting : {
        screen : SettingScreen,
        navigationOptions : {
            title : "Setting",
            headerRight : null
        }
    },
    Profile : {
        screen : Profile,
        navigationOptions : {
            title : "Profile Setting",
            headerRight : null
        }
    },
    ChangePassword : {
        screen : ChangePassword,
        navigationOptions : {
            title : "Change Password",
            headerRight : null
        }
    }
}, {
    defaultNavigationOptions : ({ navigation }) => ({
        headerStyle : {
            backgroundColor : AppStyles.color.secondary,
            elevation : 0,
            showOpacity : 0
        },
        // headerTintColor : AppStyles.color.base,
        headerTintColor : AppStyles.color.text,
        headerRight : <CoinCounter navigation={navigation} />
    })
})

const InstructionStack = createStackNavigator({
    Instruction : { 
        screen : Instruction,
        navigationOptions : ({ navigation }) => ({
            headerStyle : {
                backgroundColor : AppStyles.color.secondary,
                elevation : 0,
                showOpacity : 0
            },
            headerLeft : <DrawerIcon navigation={navigation} />,
            title : "Instruction",
            headerTintColor : AppStyles.color.base,
        }) 
    }
}, {
    defaultNavigationOptions : ({ navigation }) => ({
        headerStyle : {
            backgroundColor : AppStyles.color.base 
        },
        headerTintColor : "#fff",
        headerRight : <CoinCounter navigation={navigation} />
    })
})

// routing untuk user sebelum login
const LoginStack = createStackNavigator({
    Login : { screen : Login },
    ForgotPassword : { screen : ForgotPassword }
},  {
    defaultNavigationOptions : {
        header : null
    },
    initialRouteName : "Login"
})

const AppDrawer = createDrawerNavigator({
    Home : {
        screen : HomeStack,
        navigationOptions : ( navigation ) => {
            return {
                
            }
        }
    },
    Instruction :{
        screen : InstructionStack,
    }

}, {
    defaultNavigationOptions : {
        gesturesEnabled : true,
    },
    contentComponent : Sidebar
})

// switcher untuk semua routing
const RootNavigation = createSwitchNavigator({
    Loading : LoadingFirst,
    BannerScreen : BannerScreen,
    App : AppDrawer,
    Auth : LoginStack,
}, {
    // init rute pertama kali
    initialRouteName : "Loading"
});

// deklarasi nama agar lebih mudah dengan Navigasi selanjutnya akan di import ke App.js



const Navigation = createAppContainer(RootNavigation);
export default Navigation;