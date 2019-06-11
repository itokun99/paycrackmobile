import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TextInput  } from 'react-native';
import AppStyles from '../../styles/Android';
import { GlobalConsumer } from '../../contexts/Context';
import moment from 'moment';


class Profile extends Component {
    constructor(props){
        super(props);
        const loginData = this.props.globalState.loginData
        this.state = {
            loginData : loginData
        }
        
        this.addressChange = this.addressChange.bind(this);
    }

    addressChange  = (input) => {
        let loginData = this.state.loginData;
        loginData.user_address = input;
        this.setState({
            loginData : loginData 
        })
    }



    render(){
        return(
            <ScrollView style={AppStyles.profile.container}>
                <SafeAreaView>
                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Fullname</Text>
                        <Text style={AppStyles.profile.listValue}>{this.state.loginData.user_fullname}</Text>
                    </View>
                    
                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Username</Text>
                        <Text style={AppStyles.profile.listValue}>{this.state.loginData.user_name}</Text>
                    </View>

                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Created Date</Text>
                        <Text style={AppStyles.profile.listValue}>{moment(this.state.loginData.user_created_date).format('DD MMMM YYYY')}</Text>
                    </View>
                    <View style={AppStyles.profile.listWrap}>
                        <Text style={AppStyles.profile.listTitle}>Address</Text>
                        <TextInput 
                            style={AppStyles.profile.listInput}
                            multiline={true}
                            numberOfLines={2} 
                            onChangeText={this.addressChange}
                            defaultValue={this.state.loginData.user_address === null ? "Insert Your Address" : this.state.loginData.user_address}
                        />
                    </View>
                    <View style={AppStyles.profile.listWrap2}>
                        <TouchableOpacity style={AppStyles.profile.saveButton}>
                            <Text style={AppStyles.profile.saveButtonText}>Save Change</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default GlobalConsumer(Profile);