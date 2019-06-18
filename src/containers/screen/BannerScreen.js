import React, { Component } from 'react'
import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Linking } from 'react-native';
import { GlobalConsumer } from '../../contexts/Context';
import API from '../../services/Service';


let interval = null;
class BannerScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            banners : [],
            currentBanner : {
                banner_url : "",
                banner_img : "https://2.bp.blogspot.com/-iyR1FtDudeU/W8Yca14OE5I/AAAAAAAABuo/Rpe8mUUCYL0mzwiIUgPpiojawmFocIG2gCPcBGAYYCw/s1600/ads970x90-min.png"
            },
            timer : 3,
        }
    }

    loadBanner = (action) => {
        let loginData = this.props.globalState.loginData;
        let params = {
            appkey : loginData.appkey,
        }
        API.getBanners(params)
        .then((result) => {
            if(result.status){
                this.setState({
                    banners : result.data,
                    currentBanner : {
                        banner_url : result.data[0].banner_url,
                        banner_img : result.data[0].banner_img
                    }
                }, action)
            }
        })
    }
    
    handleLink = () => {
        let url = this.state.currentBanner.banner_url
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            }
        });
    }

    componentDidMount(){
        this.loadBanner();
        interval = setInterval(() => {
            this.setState({
                timer : this.state.timer - 1
            })
        }, 1000)
    }

    componentDidUpdate(){
        if(this.state.timer === 0){
            this.props.navigation.navigate('App')
        }
    }

    render(){
        if(this.state.timer === 0){
            clearInterval(interval);
        }
        return(
            <ScrollView contentContainerStyle={{flex : 1}}>
                <SafeAreaView>
                    <View style={{height : '100%', width : "100%", position : "relative", backgroundColor : "#000"}}>
                        <TouchableOpacity onPress={this.handleLink} style={{position : "absolute", top: 0, left : 0, width : '100%', height : "100%"}}>
                            <Image source={{uri : this.state.currentBanner.banner_img}} resizeMode="contain" style={{width : '100%', height : "100%"}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{position : "absolute", top : 24, right : 24}} >
                            <Text style={{fontSize : 18, fontWeight : "600", color : "#fff"}} >Please wait {this.state.timer}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default GlobalConsumer(BannerScreen);