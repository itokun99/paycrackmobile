import React, { Component } from 'react';
import { 
    View,
    Text,
    SafeAreaView,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    Button,
    Image,
    Alert,
    AlertIOS,
    Platform,
    TouchableOpacity
} from 'react-native';
import Roulette from '../../components/Roulette/Roulette';
import API from '../../services/Service';
import { GlobalConsumer } from '../../contexts/Context';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../styles/Android';
import marker from '../../assets/images/roulette/marker2.png'
import hore from '../../assets/images/roulette/hore.png'
import wheel from '../../assets/images/roulette/wheel.png'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogButton,
    DialogTitle,
    ScaleAnimation,
} from 'react-native-popup-dialog';

// const numbers = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]
// const options  = numbers.map((o)=>(<Text index={o}>{o}</Text>))  

let interval = null;
class SpinWheel extends Component {
    constructor(props){
        super(props);
        this.state = {
            rotate : false,
            spinner : [],
            probs : [],
            spinnerCost : 0,
            isLoading : true,
            option:"",
            optionCustom:"",
            rouletteState:'stop',
            rouletteCustomState:'stop',
            count : 0,
            isWheelLoading : false,
            showDialog : false,
            dialogData : {
                dialogTitle : null,
                dialogMessage : null,
            },
            isJackpot : false,
        }
    }

    onRotateChange(state) {
        this.setState({
          rouletteState: state
        })
    }

    onRotate(option) {
        this.setState({
            option:option.index
        })
    }

    onRotateCustomChange(state) {
        if(state === "stop"){
            this.setState({
                rouletteCustomState: state,
                rotate : false
            })
        } else {
            this.setState({
                rouletteCustomState: state,
            })
        }
    }

    resultSpinner = () => {
        setTimeout(() => {
            let spinner = this.state.spinner;
            let loginData = this.props.globalState.loginData;
            let spinner_value = this.state.optionCustom;
            let spinner_slot = 0;
            spinner.map((value, index) => {
                if(spinner_value === value.spinner_value){
                    spinner_slot = index+1; 
                }
            })
            let params = {
                appkey : loginData.appkey,
                user_id : loginData.user_id,
                spinner_value : spinner_value,
                spinner_slot : spinner_slot
            }
            API.sendSpinnerResult(params)
            .then((result) => {
                if(result.status){
                    this.setState({
                        showDialog : true,
                        dialogData : {
                            dialogTitle : "Congratulation!",
                            dialogMessage : result.message,
                        },
                        ...spinner_slot === 1 ? { isJackpot : true } : null

                    })
                } else {
                    this.setState({
                        showDialog : true,
                        dialogData : {
                            dialogTitle : "Warning!",
                            dialogMessage : result.message
                        }
                    })
                }
            })
        },3200)   
    }

    onRotateCustom(option) {
        this.setState({
            optionCustom:option.props.index
        })
    }
    
    rotate = () => {
        let loginData = this.props.globalState.loginData;
        let params = {
            appkey : loginData.appkey,
            user_id : loginData.user_id,
        }
        this.setState({
            isWheelLoading : true
        }, () => {
            API.playSpinner(params)
            .then((result) => {
                if(result.status){
                    let data = result.data;
                    let user_point = data.user_point;
                    let status_spin = data.spin;
                    loginData.user_point = parseInt(user_point);
                    AsyncStorage.setItem('loginData', JSON.stringify(loginData));
                    let action = {
                        type : "USER_UPDATE",
                        data : loginData
                    }
                    this.props.globalAction(action);
                    this.setState({
                        isWheelLoading : false,
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                rotate : true
                            }, () => {
                                this.resultSpinner();
                            })
                        }, 500)
                    })
                } else {
                    this.setState({
                        isWheelLoading : false,
                    }, () => {
                        this.setState({
                            showDialog : true,
                            dialogData : {
                                dialogTitle : "Warning!",
                                dialogMessage : result.message
                            }
                        })
                    })
                }
            })
        })
    }

    genericDialogContent = (text) => {
        return(
            <View>
                <View style={{padding : 14}}>
                    <Text style={{textAlign : "center", fontSize : 20, fontWeight : "600"}}>{this.state.dialogData.dialogTitle}</Text>
                </View>
                <View style={{padding : 14}}>
                    <Text style={{textAlign : "center", fontSize : 18}}>{this.state.dialogData.dialogMessage}</Text>
                </View>
                <View style={{justifyContent : "center", flexDirection : "row", padding : 14}}>
                    <TouchableOpacity onPress={this.closeDialog} style={{backgroundColor : AppStyles.color.base, paddingVertical: 8, paddingHorizontal : 24, borderRadius : 100}}>
                        <Text style={{textAlign : "center", fontSize : 18, fontWeight : "600", color : "#fff"}}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    jackDialogContent = (text) => {
        return(
            <View style={{padding : 14}}>
                <View>
                    <Text style={{textAlign : "center", fontSize : 20, fontWeight : "600"}}>{this.state.dialogData.dialogTitle}</Text>
                </View>
                <View style={{position : "relative", height : 280}}>
                    <View>
                        <Text style={{textAlign : "center", fontSize : 18}}>{this.state.dialogData.dialogMessage}</Text>
                    </View>
                    <View style={{position : "absolute", left : 0, top : 0, height : '100%', width : '100%'}}>
                        <Image source={require('../../assets/images/roulette/hore.png')} style={{width : '100%', height : '100%'}} resizeMode="center" />
                    </View>
                </View>
                <View style={{justifyContent : "center", flexDirection : "row"}}>
                    <TouchableOpacity onPress={this.closeDialog} style={{backgroundColor : AppStyles.color.base, paddingVertical: 8, paddingHorizontal : 24, borderRadius : 100}}>
                        <Text style={{textAlign : "center", fontSize : 18, fontWeight : "600", color : "#fff"}}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    

    loadProbData = (action = null) => {
        let loginData = this.props.globalState.loginData;
        let params = {
            appkey : loginData.appkey
        }

        API.getSpinnerProbs(params)
        .then((result) => {
            if(result.status){
                let data = result.data;
                let probs = data.probs_data.split(',');
                probs = probs.map((value) => parseFloat(value))
                probs.reverse();
                this.setState({
                    probs : probs
                }, action)
            }
        })
    }

    loadSpinnerData = () => {
        let loginData = this.props.globalState.loginData;
        let params = {
            appkey : loginData.appkey
        }
        API.getSpinnerValue(params)
        .then((result) => {
            if(result.status){
                let data = result.data;
                let data2 = result.data2;
                this.setState({
                    spinner : data,
                    spinnerCost : data2[0].spinnercost_value
                }, () => {
                    this.loadProbData(() => {
                        setTimeout(() => {
                            this.setState({
                                isLoading : false
                            })
                        }, 1000)
                    })       
                })
            } else {
                if(result.code === 1){
                    this.refs.toast.show(result.message);   
                }
            }
        })
    }

    closeDialog = (name = null) => {
        this.setState({
            showDialog : false,
            dialogData : {
                dialogTitle : null,
                dialogMessage : null,
            },
            isJackpot : false,
        })
    }

    componentDidMount(){
        this.loadSpinnerData();
    }

    render(){
        return(
            <ScrollView contentContainerStyle={AppStyles.spinnerWheel.container}>
                <SafeAreaView>
                    {
                        this.state.isLoading ?
                        (
                            <View>
                                <ActivityIndicator size="large" color={AppStyles.color.base} />
                            </View>
                        )
                        :
                        (
                            <>
                                <Spinner
                                    visible={this.state.isWheelLoading}
                                    textContent="Loading..."
                                    textStyle={{color : "#fff"}} 
                                />
                                {/* <View>
                                    <Text>State : {this.state.rouletteCustomState}</Text>
                                    <Text>Current Index : {this.state.optionCustom}</Text>
                                </View> */}
                                <View style={{marginVertical : 24}}>
                                    <Roulette
                                        rotateWheel={this.state.rotate}
                                        customRoulette = {true}
                                        customRotate = {this.state.probs}
                                        enableUserRotate = {this.state.rouletteCustomState === "stop"}
                                        background={wheel}
                                        marker={marker}
                                        radius={300}
                                        distance={100}
                                        markerTop={20}
                                        onRotate={(state) => this.onRotateCustom(state)}
                                        onRotateChange={(state) => this.onRotateCustomChange(state)}
                                        rotateEachElement={(index)=> ((index * 360 /this.state.spinner.length * -1 ) -90)}
                                        options={this.state.spinner.map((value) => (<Text style={{color : "#222", fontSize : 18, fontWeight: "600"}} index={value.spinner_value}>{value.spinner_value}</Text>))}
                                        markerWidth={50}>     
                                    </Roulette>
                                </View>

                                {
                                    this.state.rouletteCustomState === "stop"? 
                                    (
                                        <View style={{justifyContent : "center", flexDirection : "row"}}>
                                            <TouchableOpacity onPress={this.rotate} style={AppStyles.spinnerWheel.spinButton}>
                                                <Text style={AppStyles.spinnerWheel.spinButtonText}>Spin Now!</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={{justifyContent : "center", flexDirection : "row"}}>
                                            <TouchableOpacity style={AppStyles.spinnerWheel.spinButtonLoading}>
                                                <Text style={AppStyles.spinnerWheel.spinButtonText}>PleaseWait..</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </>
                        )
                    }
                </SafeAreaView>
                <Toast ref="toast" />
                <Dialog
                    dialogAnimation = {new ScaleAnimation({
                        initialValue: 0, // optional
                        useNativeDriver: true, // optional
                    })}
                    containerStyle = {{zIndex : 999999}}
                    visible = {this.state.showDialog}
                    onTouchOutside = {this.closeDialog}
                    onHardwareBackPress = {this.closeDialog}
                    width = {Dimensions.get('window').width * 0.8}
                >
                    <View>
                    {
                        this.state.isJackpot ? this.jackDialogContent() :
                        this.genericDialogContent()
                    }
                    </View>
                </Dialog>
            </ScrollView>
        )
    }
}

export default GlobalConsumer(SpinWheel);