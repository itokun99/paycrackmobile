import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    SafeAreaView,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import API from '../../services/Service';
import ListItem from '../../components/ListItem';
import Toast, {DURATION} from 'react-native-easy-toast';
import BottomBanner from '../../components/BottomBanner';
import moment from 'moment';

class WheelHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            JackpotHistory : [],
            isLoading : true,
        }
    }

    getJackpotHistory = () => {
        let prevState = this.state.JackpotHistory;
        let login_data = this.props.globalState.loginData
        if(typeof(login_data) !== "undefined"){
            let user_id = login_data.user_id;
            let params = {
                appkey : login_data.appkey,
                user_id : user_id
            }
            API.getJackpotHistory(params)
            .then((result) => {
                if(result.status){
                    let history_data = result.data;
                    this.setState({
                        JackpotHistory : history_data
                    })
                } else {
                    if(result.code !== 404){
                        this.refs.toasts.show(result.message);
                    }
                }
            })
        }
    }

    componentDidMount(){
        this.getJackpotHistory()
    }

    renderList = (data) => {
        return(
            <View style={{paddingVertical : 14, paddingHorizontal : 24, backgroundColor : "#fff", flexDirection : "row", justifyContent : "space-between", borderColor : "#ddd", borderBottomWidth : 1}}>
                <View style={{}}>
                    <Text style={{fontSize : 18, fontWeight : "600"}}>{data.jackpot_item}</Text>
                    <Text>{moment(data.jackpot_date).format("DD MMMM YYYY")}</Text>
                </View>
                <View style={{alignItems : "center", justifyContent : "center"}}>
                    <TouchableOpacity>
                        <Text>{data.jackpot_status === "0" ? "Pending" : data.jackpot_status === "1" ? "On Process" : data.jackpot_status === "2" ? "Success" : "Canceled" }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={{flex : 1}}>
                <View style={{position : "absolute", top : 0, left : 0, height : '100%', width : "100%"}}>
                    <ScrollView contentContainerStyle={{...AppStyles.global.scrollView, backgroundColor : AppStyles.color.backgroundLayer, height : '100%'}}>
                        <SafeAreaView>
                            <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.base} />
                            {
                                this.state.JackpotHistory.length > 0 ? 
                                <FlatList
                                    data = {this.state.JackpotHistory}
                                    keyExtractor={item => item.jackpot_id}
                                    renderItem = {
                                        ({item}) => {
                                            return this.renderList(item)
                                        }
                                    }
                                />
                                : <View style={{justifyContent : "center", alignItems : "center", flexDireaction : "row", height: 200}}><Text style={{fontSize : 20}}>No history data</Text></View>
                            }
                        </SafeAreaView>
                        <Toast ref="toast" />
                    </ScrollView>
                </View>
                <BottomBanner />
            </View>
        )
    }
}


export default GlobalConsumer(WheelHistory);