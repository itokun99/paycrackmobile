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


// routing untuk user setelah login
const HomeStack = createStackNavigator({
    Home : { 
        screen : Home,
        navigationOptions : ({ navigation }) => ({
            headerLeft : <DrawerIcon navigation={navigation} />
        }) 
    }
}, {
    defaultNavigationOptions : ({ navigation }) => ({
        headerStyle : {
            backgroundColor : AppStyles.color.base 
        },
        headerTintColor : "#fff"
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