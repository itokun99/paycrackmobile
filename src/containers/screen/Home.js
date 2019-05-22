import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ActivityIndicator
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
            internet  : this.props.globalState.internet
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

    postdaily = () => {
        if (this.state.id != null) {
            const data = {
                user_id: this.state.id,
            }
            API.dailycheckin(data).then(
                (result) => {
                    this.setState({
                        status: result.status,
                        datacheck: result.data,
                        defaultAnimationDialog: true,
                        userpoint: result.data.point,
                    })
                    var dates = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
                    var expirydate = result.data.date_server;
                    //Let suppose we have to show the countdown for above date-time 
                    var diffr = moment.duration(moment(expirydate).diff(moment(dates)));
                    //difference of the expiry date-time given and current date-time
                    var hours = parseInt(diffr.asHours());
                    var minutes = parseInt(diffr.minutes());
                    var seconds = parseInt(diffr.seconds());
                    var d = hours * 60 * 60 + minutes * 60 + seconds;
                    //converting in seconds
                    this.setState({ totalDuration: d });
                    if (result.status) {
                        this.props.globalAction({
                            type: 'UPDATE_POINT',
                            data: result.data.point
                        })
                    } else {
                        null
                    }

                }
            )
        }
    }

    handleGetItem = async () => {
        API.getRedeemItems().then((result) => {
            if (result.status) {
                let data = result.data
                this.setState({
                    items: data,
                    itemIsLoading : false,
                    internet : true,
                })
            } else {
                
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
        this.handleGetItem()
        this.setUserData();
        // setInterval(() => {
        //     this.checkInet()
        // }, 1000)
    }


    render() {
        // console.warn(this.props.globalState)

        return (
            <ScrollView style={AppStyles.global.scrollView}>
                <SafeAreaView style={AppStyles.home.main}>
                    <StatusBar barStyle="light-content" backgroundColor={AppStyles.loadingfirst.container.backgroundColor} />
                    <View style={{ marginBottom: 14 }}></View>
                    {/* SECTION TOP */}
                    <View style={AppStyles.home.section}>
                        <View style={AppStyles.home.sectionHeader}>
                            <Text>OfferWall</Text>
                        </View>
                        <View style={AppStyles.home.sectionBody}>
                            <View style={AppStyles.home.offerWallRow}>
                                <TouchableOpacity style={AppStyles.home.buttonMenu} onPress={this.postdaily}>
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
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: 14 }}></View>

                    {/* SECTION BOTTOM */}
                    <View style={AppStyles.home.section}>
                        <View style={{ ...AppStyles.home.sectionHeader, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: "bold" }}>Reedem Items</Text>
                            <Text style={{ fontWeight: "bold" }}>Filter</Text>
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
                    <Dialog
                        onDismiss={() => {
                            this.setState({ defaultAnimationDialog: false });
                        }}
                        width={0.9}
                        visible={this.state.defaultAnimationDialog}
                        rounded
                        actionsBordered
                        footer= {
                            <DialogFooter>
                                <DialogButton
                                    text="OK"
                                    bordered
                                    onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                    }}
                                    key="button-1"
                                />
                                <></>
                            </DialogFooter>
                        }
                        >
                        {this.state.status ?(
                            <DialogContent
                                style={{
                                    backgroundColor: '#58A1C3',
                                }}>
                                <Text style={AppStyles.home.textCoin}>Anda berhasil check in hari ini, anda mendapat {this.state.userpoint} point</Text>
                            </DialogContent>
                            ):(
                                <DialogContent
                                    style={{
                                        backgroundColor: '#58A1C3',
                                    }}
                                >
                                    <Image
                                        resizeMode='center'
                                        source={require('../../assets/images/icons/horee.png')}
                                        style={AppStyles.home.imageDialog}>
                                    </Image>
                                    <Text style={AppStyles.home.textDialog}>Daily Reward Taken Allready Try Again After</Text>
                                    <CountDown
                                        until={parseInt(this.state.totalDuration)}
                                        // until={1000}
                                        //duration of countdown in seconds
                                        digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#58A1C3' }}
                                        digitTxtStyle={{ color: '#58A1C3' }}
                                        timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                        separatorStyle={{ color: '#ffffff' }}
                                        timeToShow={['H', 'M', 'S']}
                                        timeLabels={{ m: null, s: null }}
                                        //formate to show
                                        onFinish={() => alert('finished')}
                                        //on Finish call
                                        onPress={() => alert('hello')}
                                        //on Press call
                                        size={20}
                                        showSeparator
                                    />
                                </DialogContent>
                            )}
                    </Dialog>

                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default GlobalConsumer(Home);