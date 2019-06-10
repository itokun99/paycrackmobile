import React, { Component } from 'react';
import { 
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ActivityIndicator,
    Button
} from 'react-native';
import Roulette from 'react-native-casino-roulette';
import API from '../../services/Service';
import { GlobalConsumer } from '../../contexts/Context';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../styles/Android';
import marker from '../../assets/images/roulette/marker2.png'
import wheel from '../../assets/images/roulette/wheel.png'

// const numbers = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]
// const options  = numbers.map((o)=>(<Text index={o}>{o}</Text>))  

let interval = null;
class SpinWheel extends Component {
    constructor(props){
        super(props);
        this.state = {
            rotate : 0,
            spinner : [],
            spinnerCost : 0,
            isLoading : true,
            option:"Option selected:",
            optionCustom:"Option selected:",
            rouletteState:'stop',
            rouletteCustomState:'stop',
            count : 0
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
        // console.log(state)
        this.setState({
            rouletteCustomState: state
        })
    }

    onRotateCustom(option) {
        // console.log(option)
        this.setState({
            optionCustom:option.props.index
        })
    }

    spin = () => {
        this.setState({
            rotate : this.state.rotate + 20,
            count : this.state.count + 1
        })
        if(this.state.count === 100){
            clearInterval(interval);
        }
    }
    
    rotate = () => {
        interval = setInterval(() => {
            this.spin()
        }, 10)
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
                    setTimeout(() => {
                        this.setState({
                            isLoading : false
                        })
                    }, 1000)
                })
            } else {
                if(result.code === 1){
                    this.refs.toast.show(result.message);   
                }
            }
        })
    }

    check = (e) => {
        console.warn(e)
    }

    componentDidMount(){
        this.loadSpinnerData();
    }

    render(){

        return(
            <ScrollView contentContainerStyle={{flex : 1, alignItems : "center", justifyContent : "center"}}>
                <SafeAreaView>
                    {
                        this.state.isLoading ?
                        (
                            <View>
                                <ActivityIndicator size="large" color={AppStyles.color.base} />
                            </View>
                        )
                        :
                        (<>
                            <View style={{marginVertical : 24}}>
                                <Roulette
                                    enableUserRotate = {this.state.rouletteCustomState === "stop"}
                                    rouletteRotate={this.state.rotate}
                                    background={wheel}
                                    marker={marker}
                                    radius={300}
                                    distance={100}
                                    markerTop={14}
                                    onRotate={(state) => this.onRotateCustom(state)}
                                    onRotateChange={(state) => this.onRotateCustomChange(state)}
                                    rotateEachElement={(index)=> ((index * 360 /this.state.spinner.length * -1 ) -90)}
                                    options={this.state.spinner.map((value) => (<Text style={{color : "#222", fontSize : 18, fontWeight: "600"}} index={value.spinner_value}>{value.spinner_value}</Text>))}
                                    markerWidth={50}>     
                                </Roulette>
                            </View>
                            <View style={{flexDirection : "row", justifyContent : "center"}}>
                                <Button onPress={this.rotate} title="Spin"></Button>
                            </View>
                        </>)
                    }

                </SafeAreaView>
                <Toast ref="toast" />
            </ScrollView>
        )
    }
}

export default GlobalConsumer(SpinWheel);