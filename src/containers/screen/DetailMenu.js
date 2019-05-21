import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import AppStyles from '../../styles/Android';
import API,{Settings} from '../../services/Service';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
  } from 'react-native-popup-dialog';
import CountDown from 'react-native-countdown-component';

//import CountDown to show the timer
import moment from 'moment';
import { GlobalConsumer } from '../../contexts/Context';
import ItemsList from '../../components/ItemsList';


class DetailMenu extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            items: []
        }

    }
  render(){
        return (
            <View>
             {
                this.state.items.length > 0 ?
                this.state.items.map((value, index) => {
                return (
                <ItemsList key={index} data={value} />
                );
                    }): <></>
            }
            </View>
        )

  }
  
}

export default DetailMenu;