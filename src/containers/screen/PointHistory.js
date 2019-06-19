import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    SafeAreaView,
    FlatList,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import API from '../../services/Service';
import ListItem from '../../components/ListItem';
import Toast, {DURATION} from 'react-native-easy-toast';
import BottomBanner from '../../components/BottomBanner';

class PointHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            historyPoint : [],
            isLoading : true,
            toastData : {}
        }
    }

    saveToStorage = (data) => {
        AsyncStorage.setItem('historyPoint', JSON.stringify(data));
    }

    getHistoryPoint = () => {
        let prevState = this.state.historyPoint;
        let login_data = this.props.globalState.loginData
        if(typeof(login_data) !== "undefined"){
            let user_id = login_data.user_id;
            let params = {
                appkey : login_data.appkey,
                user_id : user_id
            }
            API.historyPoint(params)
            .then((result) => {
                if(result.status){
                    let history_data = result.data;
                    if(prevState.length !== history_data.length){
                        this.setState({
                            historyPoint : history_data
                        }, () => {
                            this.saveToStorage(history_data);
                        })
                    }
                } else {
                    if(result.code !== 404){
                        this.refs.toasts.show(result.message);
                    }
                }
            })
        }
    }

    loadDataHistory = async () => {
        try{
            var historyPoint = await AsyncStorage.getItem('historyPoint');
            if(historyPoint !== null){
                historyPoint = JSON.parse(historyPoint);
                if(historyPoint.length > 0){
                    this.setState({
                        historyPoint : historyPoint
                    }, () => {
                        this.getHistoryPoint()
                    })
                }
            } else {
                this.getHistoryPoint();
            }
        }catch(error){
            this.getHistoryPoint();
        }
    }

    componentDidMount(){
        this.loadDataHistory()
    }

    render(){
        // console.warn(this.state.historyPoint)
        return(
            <View style={{flex : 1}}>
                <View style={{position : "absolute", top : 0, left : 0, height : '100%', width : "100%"}}>
                    <ScrollView contentContainerStyle={{...AppStyles.global.scrollView, backgroundColor : AppStyles.color.backgroundLayer, height : '100%'}}>
                        <SafeAreaView>
                            {/* <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.base} /> */}
                            {
                                this.state.historyPoint.length > 0 ? 
                                <FlatList
                                    data = {this.state.historyPoint}
                                    keyExtractor={item => item.ph_id}
                                    renderItem = {
                                        ({item}) => {
                                            // console.warn(item);
                                            return(
                                                <ListItem data={item} />
                                            )
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


export default GlobalConsumer(PointHistory);