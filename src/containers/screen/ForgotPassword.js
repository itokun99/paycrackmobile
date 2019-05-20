import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import AppStyles from '../../styles/Android';



class ForgotPassword extends Component {
    render(){
        return(
            <View style={AppStyles.forgotpassword.container}>
                <View style={AppStyles.forgotpassword.formWrapper}>
                    <View style={AppStyles.forgotpassword.formGroup}>
                        <Text style={AppStyles.forgotpassword.formTitle}>Lupa Password?</Text>
                    </View>
                    <View style={AppStyles.forgotpassword.formGroup}>
                        <TextInput style={AppStyles.forgotpassword.formControl} keyboardType="email-address" placeholder="Email" />
                    </View>
                    <View style={AppStyles.forgotpassword.formGroup}>
                        <TouchableOpacity style={AppStyles.forgotpassword.btn}>
                            <Text style={AppStyles.forgotpassword.btnText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{...AppStyles.forgotpassword.btn, backgroundColor : "#888", marginTop : 8}}>
                            <Text style={AppStyles.forgotpassword.btnText}>Kembali</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default ForgotPassword;