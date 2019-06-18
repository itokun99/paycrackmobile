import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { GlobalConsumer } from '../contexts/Context';
import AppStyles from '../styles/Android';

// 

const CointCounter = (props) => {
    return(
        <View style={{...AppStyles.cointIcon.container,...props.style}}>
            <Text style={{...AppStyles.cointIcon.coinText, ...props.textColor}}>{props.globalState.loginData.user_point}</Text>
            <Image
                source={require('../assets/images/icons/icon_coin.png')}
                resizeMode="contain" 
                style={{width : 25, height: 25}}
            />
        </View>
    )
}

export default GlobalConsumer(CointCounter);