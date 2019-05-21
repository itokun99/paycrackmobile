import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AppStyles from '../styles/Android';
import {Settings} from '../services/Service';

const ItemsList = (props) => {
    return(
        <View key={props.data.item_id} style={AppStyles.home.redeemItemCol}>
            <TouchableOpacity style={AppStyles.home.redeemItem}>
                <View style={{padding : 14}}>
                    <Image source={{uri: `${Settings.basePath}${props.data.item_pic}`}}  resizeMode="cover" style={AppStyles.home.redeemPic}></Image>
                </View>
                <Text style={AppStyles.home.redeemTitle} >{props.data.item_name}</Text>
                <View style={AppStyles.home.redeemCoinText}>
                    <Image source={require('../assets/images/icons/icon_coin.png')}  style={{width : 10, height : 10}} />
                    <Text style={{fontSize : 18}}>{props.data.item_point}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ItemsList;