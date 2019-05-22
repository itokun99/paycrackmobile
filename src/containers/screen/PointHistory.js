import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    SafeAreaView,
    FlatList,
    Dimensions
} from 'react-native';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import API from '../../services/Service';
import { AndroidToast } from '../../components/Toast';
import ListItem from '../../components/ListItem';

class PointHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            historyPoint : [],
            isLoading : true,
            toastData : {}
        }
    }

    getHistoryPoint = () => {
        let login_data = this.props.globalState.loginData
        // console.warn(login_data);
        if(typeof(login_data) !== "undefined"){
            let user_id = login_data.user_id;
            let params = {
                user_id : user_id
            }
            API.historyPoint(params)
            .then((result) => {
                if(result.status){
                    let history_data = result.data;
                    // console.warn(history_data);
                    this.setState({
                        historyPoint : history_data
                    })
                } else {
                    this.setState({
                        toastData : {
                            show : true,
                            size : "long",
                            message : "Failed to load History Point",
                            position : "bottom"
                        }
                    })
                }
            })
        }
    }

    componentDidMount(){
        this.getHistoryPoint();
    }

    render(){
        // console.warn(this.state.historyPoint)
        return(
            <ScrollView contentContainerStyle={{...AppStyles.global.scrollView, backgroundColor : AppStyles.color.backgroundLayer, height : '100%'}}>
                <SafeAreaView>
                    <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.base} />
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
            </ScrollView>
        )
    }
}


export default GlobalConsumer(PointHistory);