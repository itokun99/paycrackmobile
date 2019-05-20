import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native'; 

const DrawerIcon = (props) => {
    return(
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image
                source={require('../assets/images/icons/drawer.png')}
                style={{width : 30, marginLeft : 14}} resizeMode="contain" />
        </TouchableOpacity>
    )
}

export default DrawerIcon;