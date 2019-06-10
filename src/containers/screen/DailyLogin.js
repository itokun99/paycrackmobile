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
    RefreshControl,
    Alert
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

const images = [
  require('../../assets/images/icons/telor2/1.png'),
  require('../../assets/images/icons/telor2/2.png'),
  require('../../assets/images/icons/telor2/3.png'),
  require('../../assets/images/icons/telor2/4.png'),
  require('../../assets/images/icons/telor2/5.png'),
  require('../../assets/images/icons/telor2/6.png'),
  require('../../assets/images/icons/telor2/7.png'),
  require('../../assets/images/icons/telor2/8.png'),
  require('../../assets/images/icons/telor2/9.png'),
  require('../../assets/images/icons/telor2/10.png'),
  require('../../assets/images/icons/telor2/11.png'),
  require('../../assets/images/icons/telor2/12.png'),
  require('../../assets/images/icons/telor2/13.png'),
  require('../../assets/images/icons/telor2/14.png'),
  require('../../assets/images/icons/telor2/15.png'),
  require('../../assets/images/icons/telor2/16.png'),
  require('../../assets/images/icons/telor2/17.png'),
  require('../../assets/images/icons/telor2/18.png'),
  require('../../assets/images/icons/telor2/19.png'),
  require('../../assets/images/icons/telor2/20.png'),
  require('../../assets/images/icons/telor2/21.png'),
  require('../../assets/images/icons/telor2/22.png'),
  require('../../assets/images/icons/telor2/23.png'),
  require('../../assets/images/icons/telor2/24.png'),
  require('../../assets/images/icons/telor2/25.png'),
  require('../../assets/images/icons/telor2/26.png'),
  require('../../assets/images/icons/telor2/27.png'),
  require('../../assets/images/icons/telor2/28.png'),
  require('../../assets/images/icons/telor2/29.png'),
  require('../../assets/images/icons/telor2/30.png'),
  require('../../assets/images/icons/telor2/31.png'),
  require('../../assets/images/icons/telor2/32.png'),
  require('../../assets/images/icons/telor2/33.png'),
  require('../../assets/images/icons/telor2/34.png'),
];

const gerak = [
  require('../../assets/images/icons/gerak/1.png'),
  require('../../assets/images/icons/gerak/2.png'),
  require('../../assets/images/icons/gerak/3.png'),
  require('../../assets/images/icons/gerak/4.png'),
  require('../../assets/images/icons/gerak/5.png'),
  require('../../assets/images/icons/gerak/6.png'),
  require('../../assets/images/icons/gerak/7.png'),
  require('../../assets/images/icons/gerak/8.png'),
  require('../../assets/images/icons/gerak/9.png'),
  require('../../assets/images/icons/gerak/10.png'),
  require('../../assets/images/icons/gerak/11.png'),
  require('../../assets/images/icons/gerak/12.png'),
];

const centerIndex = Math.round(images.length);
const centerGerak = Math.round(gerak.length);

class DailyLogin extends Component{
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
                visible : false,
                last : false,
                index : 0,
            }
        }

    timeout = () => {
        setTimeout(() => {
           this.postdaily()
        }, 4500);
    }
    
    handleGetItem = async () => {
        let loginData = this.props.globalState.loginData;
        // console.warn(loginData);
        let params = {
            appkey : loginData.appkey
        }
        API.dailyPoint(params).then((result) => {
            if (result.status) {
                let data = result.data
                let dataPoint = []
                data.map(value => {
                    dataPoint.push(value.dc_point_value)
                    return true
                })
                dataPoint = this.suffle(dataPoint)

                this.setState({
                    items: dataPoint,
                })
            } else {
                if(result.code === 1){
                    this.checkInet()
                } else {
                    this.refs.toast.show(result.message);
                }
            }
        })
    }

    postdaily = () => {
        if (this.state.id != null) {
            let loginData = this.props.globalState.loginData;
            const data = {
                appkey : loginData.appkey,
                user_id: loginData.user_id,
                point   : this.state.items[0]
            }
            API.dailycheckin2(data).then(
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

    checkInet = () => {
        this.setState({
            internet : this.props.globalState.internet
        })
    }

    suffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    render(){  
        return(
             <ScrollView style={AppStyles.global.scrollView}>
                <SafeAreaView style={AppStyles.home.main}>
                    <StatusBar barStyle="light-content" backgroundColor={AppStyles.loadingfirst.container.backgroundColor} />
                    <View style={{flex: 1,flexDirection: 'row',position:'relative'}}>
                        <Image
                            resizeMode='cover'
                            source={require('../../assets/images/icons/bg_telor2.png')}
                            style={{width:'100%',height: 604}}>
                        </Image>
                        <View style={{width:'100%',position:'absolute',bottom:100,left:5}}>
                            {this.state.visible === false ? 
                                <TouchableOpacity 
                                    onPress = {()=> this.setState({visible : true},this.timeout(),this.handleGetItem())}
                                    style={{width: 300, height: 300,alignItems: 'center',alignSelf: 'center',justifyContent:'center'}}>
                                    {/* <Image
                                        resizeMode='center'
                                        source={require('../../assets/images/icons/telor/1.png')}
                                        style={{width: '100%', height:'100%'}} /> */}
                                    <ImageSequence
                                        images={gerak}
                                        startFrameIndex={centerGerak}
                                        framesPerSecond={7}
                                        style={{width: '100%', height: '100%'}} />    
                                </TouchableOpacity>
                            :   
                                <View style={{width: 300, height: 300,alignItems: 'center',alignSelf: 'center',justifyContent:'center'}}>
                                    <ImageSequence
                                        images={images}
                                        startFrameIndex={centerIndex}
                                        framesPerSecond={7}
                                        loop={false}
                                        style={{width: '100%', height: '100%'}} />
                                    {/* <Image
                                        resizeMode='center'
                                        source={this.images[this.state.index]}
                                        style={{width: '100%', height: '100%'}} /> */}
                                </View>
                            }
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
export default GlobalConsumer(DailyLogin);