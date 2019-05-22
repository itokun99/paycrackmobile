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

class RedeemHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            redeem : [],
            user : this.props.globalState.loginData,
            isLoading : false,
        }
    }

    getRedeemHistory = () => {
        let user = {...this.state.user};
        let params = {
            user_id : user.user_id 
        }
        API.historyRedeem(params)
        .then((result) => {
            if(result.status){
                let data = result.data
                this.setState({
                    redeem : data
                })
            }
        })
    }

    componentDidMount(){
        this.getRedeemHistory();
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