import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
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


const styles = AppStyles.login;
class DetailMenu extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        // console.warn(navigation)
        this.state = {
            item : navigation.state.params
            
            
        }

    }
    handleGetItem = () => {
        API.getRedeemItems().then((result) => {
            if (result.status) {
                let data = result.data
                this.setState({ items: data }, () => {
                    // console.warn(this.state.items)
                })
            } else {
            }
        })
    }

    componentDidMount() {
        this.handleGetItem()
   
        // this.setUserData();
    }

    // setUserData = () => {
    //     let user = { ...this.props.globalState.loginData };
    //     this.setState({
    //         id: user.user_id
    //     })
    // }
  render(){

    let item = {...this.state.item}
        console.warn(item)
        return (
            <View style={{ width : '100%', paddingHorizontal : 14,paddingBottom : 28,alignContent:"center" }}>
                <View style={{padding : 14}}>
                    <Image source={{uri: `${Settings.basePath}${item.item_pic}`}}  resizeMode="cover" style={AppStyles.home.redeemPic}></Image>
                </View>
                <Text style={{textAlign:"center"}}>{item.item_name}</Text>
                <Text style={{textAlign:"center"}}>{item.item_description}</Text>
                <View style={styles.formGroup}>
                <TouchableOpacity style={styles.btn}>
                <View style={{ flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: "center",fontSize: 20}}>
                    <Image source={require("../../assets/images/icons/icon_coin.png")}  style={{width : 10, height : 10}} />
                    <Text style={{fontSize : 18,color:"white"}}>{item.item_point}</Text>
                </View>
                 </TouchableOpacity>
             </View>
            </View>
        )

  }
  
}

export default DetailMenu;