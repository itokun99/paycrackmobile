import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AppStyles from '../styles/Android';

const CustomDialog = (props) => {
    return(
        <View>
            <View style={{padding : 14}}>
                <Text style={{textAlign : "center", fontSize : 20, fontWeight : "600"}}>{props.title}</Text>
            </View>
            <View style={{padding : 14}}>
                <Text style={{textAlign : "center", fontSize : 18}}>{props.message}</Text>
            </View>
            <View style={{justifyContent : "center", flexDirection : "row", padding : 14}}>
                <TouchableOpacity onPress={props.onPress} style={{backgroundColor : AppStyles.color.base, paddingVertical: 8, paddingHorizontal : 24, borderRadius : 100}}>
                    <Text style={{textAlign : "center", fontSize : 18, fontWeight : "600", color : "#fff"}}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDialog;