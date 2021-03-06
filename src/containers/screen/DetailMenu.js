import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import AppStyles from '../../styles/Android';
import API,{Settings} from '../../services/Service';
import { GlobalConsumer } from '../../contexts/Context';
import Dialog, {
    DialogContent,
    DialogButton,
    DialogFooter
} from 'react-native-popup-dialog';
import ActivityWrapper from '../wrapper/ActivityWrapper';
class DetailMenu extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            item2 : navigation.state.params,
            item : {},
            user : this.props.globalState.loginData,
            dialog : {
                visible : false,
                message : "",
            },
            redeemSuccess : 0,
            isLoading : true,
        }
    }

    handleRedeemItem = () => {

        let item = {...this.state.item};
        let user = {...this.state.user};
        let data = {
            appkey : user.appkey,
            item_id : item.item_id,
            user_id : user.user_id
        }
        API.redeemPoint(data)
        .then((result) => {
            if(result.status){
                this.setState({
                    dialog : {
                        visible : false
                    }
                }, () => {
                    this.handleGetItem();
                    setTimeout(() => {
                        this.setState({
                            dialog : { visible : true },
                            redeemSuccess : 2
                        }, () => {
                            this.handleGetItem();
                        })
                    },500)
                })
            } else {
                this.setState({
                    dialog : {
                        visible : false
                    }
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            dialog : { visible : true, message : result.message },
                            redeemSuccess : 1
                        })
                    },500)
                })
            }
        })
    }

    showDialog = () => {
        let dialog = {...this.state.dialog}
        dialog.visible = true;true
        this.setState({
            dialog : dialog
        })
    }
    
    closeDialog  = () => {
        let dialog = {...this.state.dialog};
        dialog.visible = false;
        this.setState({
            dialog : dialog
        })
    }
    closeDialogSuccess  = () => {
        let dialog = {...this.state.dialog};
        dialog.visible = false;
        dialog.message = "";
        this.setState({
            dialog : dialog,
            redeemSuccess : 0,
        }, () => {
            this.navigateToHistoryRedeeem()
        })
    }
    closeDialogReset  = () => {
        let dialog = {...this.state.dialog};
        dialog.visible = false;
        dialog.message = "";
        this.setState({
            dialog : dialog,
            redeemSuccess : 0,
        })
    }
    navigateToHistoryRedeeem = () => {
        this.props.navigation.push('HistoryRedeem');
    }

    handleGetItem = async () => {
        let item2 = this.state.item2;
        let loginData = this.props.globalState.loginData;
        let params = {
            id : item2.item_id,
            appkey : loginData.appkey
        }
        this.setState({
            isLoading : true,
        }, () => {
            API.getRedeemItems(params).then((result) => {
                if (result.status) {
                    let data = result.data
                    this.setState({
                        item: data[0],
                        isLoading : false,
                    })
                } else {
                    if(result.code === 1 || result.code === 2){
                        
                    } else {
                        this.refs.toast.show(result.message);
                    }
                }
            })
        })
    }

    componentDidMount(){
        this.handleGetItem();
    }


    render(){
        let item = {...this.state.item}
        return (
            <ScrollView contenContainerStyle={AppStyles.detailItem.container}>
                {
                    this.state.item.hasOwnProperty('item_id') ? 
                    <>
                        <View style={AppStyles.detailItem.imageHolder}>
                            <Image source={{uri: `${Settings.basePath}${item.item_pic}`}}  resizeMode="cover" style={AppStyles.detailItem.imageItem}></Image>
                        </View>
                        <Text style={AppStyles.detailItem.itemTitle}>{item.item_name}</Text>
                        <Text style={AppStyles.detailItem.itemDesc}>{item.item_description}</Text>
                        <Text style={AppStyles.detailItem.stock}>Stock : {item.item_quantity}</Text>
                        <View style={{marginVertical : 24, justifyContent : "center", flexDirection : "row"}}>
                            {
                                parseInt(item.item_quantity)  > 0 ?
                                (
                                    <TouchableOpacity onPress={this.showDialog} style={AppStyles.detailItem.btn}>
                                        <View style={{ flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: "center",fontSize: 20}}>
                                            <Image source={require("../../assets/images/icons/icon_coin.png")}  style={{width : 18, height : 18, marginRight : 5}} />
                                            <Text style={{fontSize : 24,color:"white", fontWeight : "600"}}>{item.item_point}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <TouchableOpacity style={{...AppStyles.detailItem.btn, backgroundColor : "#ddd"}}>
                                        <View style={{ flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: "center",fontSize: 20}}>
                                            {/* <Image source={require("../../assets/images/icons/icon_coin.png")}  style={{width : 18, height : 18, marginRight : 5}} /> */}
                                            <Text style={{fontSize : 24,color:"white", fontWeight : "600"}}>Empty Stock</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </>
                    :
                    null
                }
                
                <Dialog
                    dialogTitle = {<Text style={{textAlign : "center", paddingVertical : 8, fontSize : 20, fontWeight : 'bold'}}>Confirmation</Text>}
                    visible = {this.state.dialog.visible}
                    width = {Dimensions.get('window').width * 0.8}
                    footer = {
                        this.state.redeemSuccess === 0 ?
                        <DialogFooter>
                            <DialogButton text="Cancel" onPress={this.closeDialog} />
                            <DialogButton text="Ok" onPress={this.handleRedeemItem} />
                        </DialogFooter>
                        :
                        this.state.redeemSuccess === 1 ?
                        <DialogFooter>
                            <DialogButton text="Back" onPress={this.closeDialogReset} />
                            <></>
                        </DialogFooter>
                        :
                        this.state.redeemSuccess === 2 ?
                        <DialogFooter>
                            <DialogButton text="Ok" onPress={this.closeDialogSuccess} />
                            <></>
                        </DialogFooter>
                        :
                        <></>
                    }
                >
                    {
                        this.state.redeemSuccess === 0 ? 
                        <DialogContent style={{width : '100%'}}>
                            <View>
                                <Text style={{textAlign : "center", fontSize : 18}}>Do you want to redeem this merchant</Text>
                            </View>
                        </DialogContent>
                        :
                        this.state.redeemSuccess === 1 ?
                        <DialogContent style={{width : '100%'}}>
                            <View>
                                <Text style={{textAlign : "center", fontSize : 18}}>{this.state.dialog.message}</Text>
                            </View>
                        </DialogContent>
                        :
                        this.state.redeemSuccess === 2 ?
                        <DialogContent style={{width : '100%'}}>
                            <View>
                                <Text style={{textAlign : "center", fontSize : 18}}>Redeem successfull! open your Redeem History for see redeem status!</Text>
                            </View>
                        </DialogContent>
                        :
                        <></>
                    }
                
                </Dialog>
            </ScrollView>
        )

  }
  
}



export default GlobalConsumer(DetailMenu);