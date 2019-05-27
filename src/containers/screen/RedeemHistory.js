import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native'
import { GlobalConsumer } from '../../contexts/Context';
import ListRedeem from '../../components/ListRedeem';
import AppStyles from '../../styles/Android';
import API from '../../services/Service';
import AsyncStorage from '@react-native-community/async-storage';

class RedeemHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            redeem : [],
            user : this.props.globalState.loginData,
            isLoading : false,
        }
    }

    saveToLocal = (data) => {
        AsyncStorage.setItem('historyRedeem', JSON.stringify(data));
    }

    getRedeemHistory = () => {
        let loginData = this.props.globalState.loginData
        let user = {...this.state.user};
        let params = {
            appkey : loginData.appkey,
            user_id : user.user_id 
        }
        let redeem  = this.state.redeem;
        API.historyRedeem(params)
        .then((result) => {
            if(result.status){
                let data = result.data
                // if(redeem.length === data.length){
                    this.setState({
                        redeem : data
                    }, () => {
                        this.saveToLocal(data);
                    })
                // }
            }
        })
    }

    loadDataHistory = async () => {
        try{
            var historyRedeem = await AsyncStorage.getItem('historyRedeem');
            if(historyRedeem !== null){
                historyRedeem = JSON.parse(historyRedeem);
                if(historyRedeem.length > 0){
                    this.setState({
                        redeem : historyRedeem
                    }, () => {
                        this.getRedeemHistory()    
                    })
                } else {
                    this.getRedeemHistory()
                }
            } else {
                this.getRedeemHistory()
            }
        }catch(error){
            this.getRedeemHistory()
        }
    }

    componentDidMount(){
        // this.getRedeemHistory();
        this.loadDataHistory();
    }

    render(){
        return(
            <ScrollView style={{width : "100%", height: "100%", backgroundColor : AppStyles.color.backgroundLayer}}>
                <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.base}  />
                <SafeAreaView>
                    {
                        this.state.redeem.length > 0 ?
                            <FlatList
                                data = {this.state.redeem}
                                keyExtractor = {item => item.rh_id}
                                renderItem = {({item}) => {
                                    return(
                                        <ListRedeem data={item} />
                                    )
                                } } 
                            />
                        :
                                <View style={{height : 200, flexDirection : "row", justifyContent : "center", alignItems : "center"}}>
                                    <Text style={{fontSize : 20, }}>No Redeem History</Text>
                                </View>

                    }
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default GlobalConsumer(RedeemHistory);