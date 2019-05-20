import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    SafeAreaView,
    FlatList
} from 'react-native';
import AppStyles from '../../styles/Android';

class PointHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            historyPoint : [],
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <ScrollView contentContainerStyle={AppStyles.global.scrollView}>
                <SafeAreaView>
                    <StatusBar barStyle="light-content" backgroundColor={AppStyles.loadingfirst.container.backgroundColor} />
                    {/* <FlatList
                        data = {}
                    /> */}
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default PointHistory;