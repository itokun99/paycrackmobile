import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native'; 
import AppStyles from '../styles/Android';

const DrawerIcon = (props) => {
    return(
        <TouchableOpacity style={{marginLeft : 14}} onPress={() => props.navigation.openDrawer()}>
            {/* <Image
                source={require('../assets/images/icons/drawer.png')}
                style={{width : 30, marginLeft : 14}} resizeMode="contain" /> */}
                <View style={{width : 40, height : 40, position : 'relative', flexDireaction : "row", justifyContent : "center", alignItems : "center"}}>
                    <View style={{backgroundColor : AppStyles.color.base, height : 5, width : '80%', marginBottom : 5}}></View>
                    <View style={{backgroundColor : AppStyles.color.base, height : 5, width : '80%', marginBottom : 5}}></View>
                    <View style={{backgroundColor : AppStyles.color.base, height : 5, width : '80%'}}></View>
                </View>
        </TouchableOpacity>
    )
}

export default DrawerIcon;