import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TextInput  } from 'react-native';
import AppStyles from '../../styles/Android';


class ChangePassword extends Component {
    render(){
        return(
            <ScrollView style={AppStyles.profile.container}>
                <SafeAreaView>
                    <View style={AppStyles.profile.listWrap2}>
                        <Text style={AppStyles.profile.listTitle}>Old Password</Text>
                        <TextInput style={AppStyles.profile.listInput} />
                    </View>
                    <View style={AppStyles.profile.listWrap2}>
                        <Text style={AppStyles.profile.listTitle}>New Password</Text>
                        <TextInput style={AppStyles.profile.listInput}/>
                    </View>
                    <View style={AppStyles.profile.listWrap2}>
                        <Text style={AppStyles.profile.listTitle}>Verify New Password</Text>
                        <TextInput style={AppStyles.profile.listInput} />
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

export default ChangePassword;