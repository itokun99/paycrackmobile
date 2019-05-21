import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native'
import AppStyles from '../styles/Android';
import moment from 'moment';

const ListItem = (props) => {
    let point = parseInt(props.data.ph_point);
    let date = moment(props.data.ph_date).format('DD MMMM YYYY')
    if(point > 0){
        point = `+${point.toString()}`;
    }
    return(
        <TouchableOpacity style={AppStyles.history.ListItemCard}>
            <View style={AppStyles.history.ListItemCardLeft}>
                <Text style={AppStyles.history.listTitle}>{props.data.ph_name}</Text>
                <Text style={AppStyles.history.listDate}>{date}</Text>
            </View>
            <View style={AppStyles.history.ListItemCardRight}>
                <Text style={{...point < 0 ? {color : "red"} : {color : "green"} ,fontSize : 24, fontWeight : "600"}}>{point}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default ListItem