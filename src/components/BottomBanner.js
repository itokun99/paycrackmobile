import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';
import API from '../services/Service';
import { GlobalConsumer } from '../contexts/Context';


class BottomBanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            banners : [],
            currentBanner : {
                banner_url : "",
                banner_img : "https://2.bp.blogspot.com/-iyR1FtDudeU/W8Yca14OE5I/AAAAAAAABuo/Rpe8mUUCYL0mzwiIUgPpiojawmFocIG2gCPcBGAYYCw/s1600/ads970x90-min.png"
            },
            timer : 3
        }
    }

    loadBanner = (action) => {
        let loginData = this.props.globalState.loginData;
        let params = {
            appkey : loginData.appkey,
        }
        API
        API.getBanners(params)
        .then((result) => {
            if(result.status){
                this.setState({
                    banners : result.data,
                    currentBanner : {
                        banner_url : result.data[1].banner_url,
                        banner_img : result.data[1].banner_img
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
    close = () => {
        this.setState({
            banners : []
        })
    }

    componentDidMount(){
        this.loadBanner();
    }

    render(){
        return(
            <>
                {
                    this.state.banners.length > 0 ?
                    (
                        <View style={{position :'absolute',height : 60, width : Dimensions.get('window').width, borderColor : '#222', borderTopWidth : 1, bottom : 0, backgroundColor : "#000"}}>
                            <TouchableOpacity onPress={this.handleLink} style={{position : "absolute", top : 0, left : 0, width : "100%", height : '100%'}}>
                                <Image source={{uri : this.state.currentBanner.banner_img}} resizeMode= "contain" style={{width : "100%", height : "100%"}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.close} style={{position : "absolute", top : 0, right :0 , backgroundColor : "#fff"}}>
                                <Text>close</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    null                
                }
            </>
        )
    }

}

export default GlobalConsumer(BottomBanner);