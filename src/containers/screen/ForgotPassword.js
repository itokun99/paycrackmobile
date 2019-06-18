import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import AppStyles from '../../styles/Android';



class ForgotPassword extends Component {
    render(){
        return(
            <View style={AppStyles.forgotpassword.container}>
                <View style={AppStyles.forgotpassword.formWrapper}>
                    <View style={AppStyles.forgotpassword.formGroup}>
                        <Text style={{...AppStyles.forgotpassword.formTitle, marginBottom : 14,}}>Lost Your Password?</Text>
                        <Text style={{textAlign : "center", fontSize : 18}}>Please contact the Admin for reset your password!</Text>
                    </View>
                    <View style={AppStyles.forgotpassword.formGroup}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{...AppStyles.forgotpassword.btn, backgroundColor : "#888", marginTop : 8}}>
                            <Text style={AppStyles.forgotpassword.btnText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default ForgotPassword;