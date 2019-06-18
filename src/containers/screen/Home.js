import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import AppStyles from '../../styles/Android';
import API,{Settings} from '../../services/Service';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
  } from 'react-native-popup-dialog';
import CountDown from 'react-native-countdown-component';

//import CountDown to show the timer
import moment from 'moment';
import { GlobalConsumer } from '../../contexts/Context';
import ItemsList from '../../components/ItemsList';
import Toast from 'react-native-easy-toast';
import ImageSequence from 'react-native-image-sequence';
import BottomBanner from '../../components/BottomBanner';

const images = [
  require('../../assets/images/icons/telor/1.png'),
  require('../../assets/images/icons/telor/2.png'),
  require('../../assets/images/icons/telor/3.png'),
  require('../../assets/images/icons/telor/4.png'),
  require('../../assets/images/icons/telor/5.png'),
  require('../../assets/images/icons/telor/6.png'),
  require('../../assets/images/icons/telor/7.png'),
  require('../../assets/images/icons/telor/8.png'),
  require('../../assets/images/icons/telor/9.png'),
  require('../../assets/images/icons/telor/10.png'),
  require('../../assets/images/icons/telor/11.png'),
  require('../../assets/images/icons/telor/12.png'),
  require('../../assets/images/icons/telor/13.png'),
  require('../../assets/images/icons/telor/14.png'),
  require('../../assets/images/icons/telor/15.png'),
  require('../../assets/images/icons/telor/16.png'),
  require('../../assets/images/icons/telor/17.png'),
  require('../../assets/images/icons/telor/18.png'),
  require('../../assets/images/icons/telor/19.png'),
  require('../../assets/images/icons/telor/20.png'),
  require('../../assets/images/icons/telor/21.png'),
  require('../../assets/images/icons/telor/22.png'),
  require('../../assets/images/icons/telor/23.png'),
  require('../../assets/images/icons/telor/24.png'),
  require('../../assets/images/icons/telor/25.png'),
  require('../../assets/images/icons/telor/26.png'),
  require('../../assets/images/icons/telor/27.png'),
  require('../../assets/images/icons/telor/28.png'),
  require('../../assets/images/icons/telor/29.png'),
  require('../../assets/images/icons/telor/30.png'),
  require('../../assets/images/icons/telor/31.png'),
];

const centerIndex = Math.round(images.length / 1);


class Home extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            userEmail: "",
            id: "",
            username: "",
            fullname: "",
            userpoint: "",
            defaultAnimationDialog: false,
            totalDuration: '',
            date: '',
            status: '',
            datacheck: [],
            markedDate: '',
            items: [],
            itemIsLoading : true,
            internet  : true,
            refreshing: false,
            showDialog : false,
        }
    }
  
   setUserData = () => {
        let user = {...this.props.globalState.loginData};
        this.setState({
            id : user.user_id
        })
    }

    setDetailMenu = (Data) => {
            this.props.navigation.push("DetailMenu",Data)
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.handleGetItem()
    }

    postdaily = () => {
        if (this.state.id != null) {
            let loginData = this.props.globalState.loginData;
            const data = {
                appkey : loginData.appkey,
                user_id: this.state.id,
            }
            API.dailycheckin(data).then(
                (result) => {
                    this.props.navigation.navigate('DailyLogin',{
                        userstatus  : result.status,
                        usertime    : result.data.date_server,
                    })
                    
                }
            )
        }
    }

    linkToScreen = (path) => {
        this.props.navigation.navigate(path)
    }

    handleGetItem = async () => {
        let loginData = this.props.globalState.loginData;
        let params = {
            appkey : loginData.appkey
        }
        API.getRedeemItems(params).then((result) => {
            if (result.status) {
                let data = result.data
                this.setState({
                    items: data,
                    itemIsLoading : false,
                    internet : true,
                    refreshing : false,
                })
            } else {
                if(result.code === 1 || result.code === 2){
                    this.checkInet()
                } else {
                    this.refs.toast.show(result.message);
                }
            }
        })
    }

    setUserData = () => {
        let user = { ...this.props.globalState.loginData };
        this.setState({
            id: user.user_id
        })
    }

    checkInet = () => {
        this.setState({
            internet : this.props.globalState.internet
        })
    }

    componentDidMount() {
        this.handleGetItem();
        this.setUserData();
    }


    render() {
        // console.warn(this.props.globalState)

        return (
            <View style={{flex : 1}}>
                <View style={{position: 'absolute', top : 0, left : 0, height : '100%', width : "100%"}}>
                    <ScrollView style={AppStyles.global.scrollView} 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        <SafeAreaView style={AppStyles.home.main}>
                            <StatusBar barStyle="light-content" backgroundColor={AppStyles.loadingfirst.container.backgroundColor} />
                            <View style={{ marginBottom: 14 }}></View>
                            
                            {
                                this.props.globalState.loginData.user_change_address === "0" ? 
                                <TouchableOpacity onPress={() => this.linkToScreen('Profile')} style={{padding : 14, borderRadius : 8, marginHorizontal : 14, marginBottom : 14, borderColor : "#e74c3c", borderWidth : 1, backgroundColor : "rgba(236, 82, 66, 0.5)" }}>
                                    <Text>Please complete the address information here..</Text>
                                </TouchableOpacity>
                                :
                                null
                            }

{
                                this.props.globalState.loginData.user_change_password === "0" ? 
                                <TouchableOpacity onPress={() => this.linkToScreen('ChangePassword')} style={{padding : 14, borderRadius : 8, marginHorizontal : 14, marginBottom : 14, borderColor : "#e74c3c", borderWidth : 1, backgroundColor : "rgba(236, 82, 66, 0.5)"}}>
                                    <Text>Please change your password for more security</Text>
                                </TouchableOpacity>
                                :
                                null
                            }

                            {/* SECTION TOP */}
                            <View style={AppStyles.home.section}>
                                <View style={AppStyles.home.sectionHeader}>
                                    <Text style={{fontSize : 18, fontWeight : "600",color : "#111"}}>OfferWall</Text>
                                    <View style={{marginTop : 8, height : 3, width : 30, backgroundColor : AppStyles.color.base, borderRadius : 14}}></View>
                                </View>

                                <View style={AppStyles.home.sectionBody}>
                                    <View style={AppStyles.home.offerWallRow}>
                                        <TouchableOpacity style={AppStyles.home.buttonMenu} onPress={()=> this.postdaily()}>
                                            <View style={AppStyles.home.viewIcon}>
                                                <Image
                                                    resizeMode='center'
                                                    source={require('../../assets/images/icons/check_in.png')}
                                                    style={AppStyles.home.imageIcon}>
                                                </Image>
                                            </View>
                                            <Text style={AppStyles.home.textIcon}>Daily Checkin </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.push('HistoryPoint')} style={AppStyles.home.buttonMenu}>
                                            <View style={AppStyles.home.viewIcon}>
                                                <Image
                                                    resizeMode='center'
                                                    source={require('../../assets/images/icons/history.png')}
                                                    style={AppStyles.home.imageIcon}>
                                                </Image>
                                            </View>
                                            <Text style={AppStyles.home.textIcon}>  History Point </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.push('HistoryRedeem')} style={AppStyles.home.buttonMenu}>
                                            <View style={AppStyles.home.viewIcon}>
                                                <Image
                                                    resizeMode='center'
                                                    source={require('../../assets/images/icons/horee.png')}
                                                    style={AppStyles.home.imageIcon}>
                                                </Image>
                                            </View>
                                            <Text style={AppStyles.home.textIcon}>  My Redeem </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.push('SpinWheel')} style={AppStyles.home.buttonMenu}>
                                            <View style={AppStyles.home.viewIcon}>
                                                <Image
                                                    resizeMode='center'
                                                    source={require('../../assets/images/icons/icon_lucky.png')}
                                                    style={AppStyles.home.imageIcon}>
                                                </Image>
                                            </View>
                                            <Text style={AppStyles.home.textIcon}>  Lucky Change </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginBottom: 14 }}></View>

                            {/* SECTION BOTTOM */}
                            <View style={AppStyles.home.section}>
                                <View style={{ 
                                    ...AppStyles.home.sectionHeader, 
                                    // display: 'flex', 
                                    // flexDirection: "row", 
                                    // justifyContent: "space-between" 
                                }}>
                                    <Text style={{fontSize : 18, fontWeight : "600", color : "#111"}}>Reedem Items</Text>
                                    <View style={{marginTop : 8, height : 3, width : 30, backgroundColor : AppStyles.color.base, borderRadius : 14}}></View>
                                </View>
                                <View style={AppStyles.home.sectionBody}>
                                    <View style={AppStyles.home.redeemItemRow}>

                                        {
                                            this.state.items.length > 0 ?
                                            this.state.items.map((value, index) => {
                                                return (
                                                    <ItemsList key={index} data={value} onClick={(data)=> this.setDetailMenu(data)}/>
                                                );
                                            })
                                            :
                                            <View style={{justifyContent : "center", paddingHorizontal : 100, height: '100%', width : '100%'}}>
                                                {
                                                    this.state.internet ? 
                                                        <ActivityIndicator size = "large"  color={AppStyles.color.base} />
                                                    :
                                                        <TouchableOpacity onPress={this.handleGetItem} style={{paddingVertical : 4, paddingHorizontal : 8, backgroundColor : "#f8f8f8", maxWidth : 150}}>
                                                            <Text style={{textAlign : "center", fontSize : 18}}>Reload?</Text>
                                                        </TouchableOpacity>
                                                }
                                            </View>
                                        }


                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
                <BottomBanner />
            </View>
        )
    }
}

export default GlobalConsumer(Home);