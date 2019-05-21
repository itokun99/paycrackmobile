import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native'
import AppStyles from '../styles/Android';

const ListItem = (props) => {
    return(
        <TouchableOpacity style={AppStyles.history.ListItemCard}>
            <View style={AppStyles.history.ListItemCardLeft}>
                <Text style={AppStyles.history.listTitle}>{props.data.ph_name}</Text>
                <Text style={AppStyles.history.listDate}>{props.data.ph_date}</Text>
            </View>
            <View style={AppStyles.history.ListItemCardRight}>
                <Text>{props.data.ph_point}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default ListItem