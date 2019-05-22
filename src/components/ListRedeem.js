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
                    <Text style={{...AppStyles.redeemHistory.redeemStatusText, ...props.data.rh_status === "1" ? {color : "#2ed573", borderColor : "#2ed573"} : {color : "#747d8c", borderColor : "#747d8c"}  }}>{props.data.rh_status === "1" ? "Success" : "Pending"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListRedeem;