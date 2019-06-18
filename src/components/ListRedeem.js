import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AppStyles from '../styles/Android';
import { Settings } from '../services/Service';
import moment from 'moment';

const ListRedeem = (props) => {
    let date = moment(props.data.rh_item_date).format("DD MMMM YYYY");
    return(
        <TouchableOpacity>
            <View style={AppStyles.redeemHistory.redeemItem}>
                <View style={AppStyles.redeemHistory.redeemItemLeft}>
                    <View style={AppStyles.redeemHistory.redeemImageWrapper}>
                        <Image source={{ uri : `${Settings.basePath}${props.data.rh_item_pic}`}} resizeMode="cover" style={{width : 80, height: 80, borderRadius : 14}} />
                    </View>
                    <View style={AppStyles.redeemHistory.redeemTitleWrapper}>
                        <Text style={{fontSize : 16, fontWeight : "600"}}>{props.data.rh_item_name}</Text>
                        <Text style={{fontSize : 14, opacity : 0.5}}>{date}</Text>
                    </View>
                </View>
                <View style={AppStyles.redeemHistory.redeemItemRight}>
                    <Text style={{...AppStyles.redeemHistory.redeemStatusText, ...props.data.rh_status === "0" ? {color : "#747d8c", borderColor : "#747d8c"} : props.data.rh_status === "1" ? {color : "#FAA61A", borderColor : "#FAA61A"} : props.data.rh_status === "2" ? {color : "#2ed573", borderColor : "#2ed573"} : {color : "red", borderColor : "red"}  }}>{props.data.rh_status === "0" ? "Pending" : props.data.rh_status === "1" ? "On Proccess" : props.data.rh_status === "2" ? "Success" : "Canceled"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListRedeem;