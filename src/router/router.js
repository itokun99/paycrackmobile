import React from 'react';
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
import DailyLogin from '../containers/screen/DailyLogin';


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
            title : "History Point"
        }
    },
    DetailMenu:{
        screen :DetailMenu,
        navigationOptions : {
            title : "Detail Items"
        }
    },
    HistoryRedeem : {
        screen : RedeemHistory,
        navigationOptions : {
            title : "History Redeem"
        }
    },
    DailyLogin : {
        screen : DailyLogin,
        navigationOptions : {
            title : "Daily Checkin"
        }
    },
}, {
    defaultNavigationOptions : ({ navigation }) => ({
        headerStyle : {
            backgroundColor : AppStyles.color.base 
        },
        headerTintColor : "#fff",
        headerRight : <CoinCounter navigation={navigation} />
    })
})

const InstructionStack = createStackNavigator({
    Instruction : { 
        screen : Instruction,
        navigationOptions : ({ navigation }) => ({
            headerLeft : <DrawerIcon navigation={navigation} />,
            title : "Instruction"
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
    App : AppDrawer,
    Auth : LoginStack,
}, {
    // init rute pertama kali
    initialRouteName : "Loading"
});

// deklarasi nama agar lebih mudah dengan Navigasi selanjutnya akan di import ke App.js
const Navigation = createAppContainer(RootNavigation);
export default Navigation;