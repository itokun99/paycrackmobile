import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import AppStyles from '../../styles/Android';

class Home extends Component {
    // konfigurasi
    static navigationOptions = {
        title : "Home",
    }
    render(){
        return(
            <ScrollView style={AppStyles.global.scrollView}>
                <SafeAreaView style={AppStyles.home.main}>
                    <StatusBar barStyle="light-content" backgroundColor={AppStyles.loadingfirst.container.backgroundColor} />       
                    <View style={{marginBottom : 14}}></View>

                    {/* SECTION TOP */}
                    <View style={AppStyles.home.section}>
                        <View style={AppStyles.home.sectionHeader}>
                            <Text>OfferWall</Text>
                        </View>
                        <View style={AppStyles.home.sectionBody}>
                            <View style={AppStyles.home.offerWallRow}>
                                <TouchableOpacity style={AppStyles.home.offerWallCol}>
                                    <View style={AppStyles.home.offerWallItem}>
                                        <Image source={require('../../assets/images/icons/check_in.png')} resizeMode="contain" style={{width : 40, height : 40, marginRight : -5 }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.home.offerWallCol}>
                                    <View style={AppStyles.home.offerWallItem}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{marginBottom : 14}}></View>

                    {/* SECTION BOTTOM */}
                    <View style={AppStyles.home.section}>
                        <View style={{...AppStyles.home.sectionHeader, display: 'flex',flexDirection : "row", justifyContent : "space-between"}}>
                            <Text style={{fontWeight : "bold"}}>Reedem Items</Text>
                            <Text style={{fontWeight : "bold"}}>Filter</Text>
                        </View>
                        <View style={AppStyles.home.sectionBody}>
                            <View style={AppStyles.home.redeemItemRow}>
                                <View style={AppStyles.home.redeemItemCol}>
                                    <View style={AppStyles.home.redeemItem}>
                                        
                                    </View>
                                </View>
                                <View style={AppStyles.home.redeemItemCol}>
                                    <View style={AppStyles.home.redeemItem}>
                                    </View>
                                </View>
                                <View style={AppStyles.home.redeemItemCol}>
                                    <View style={AppStyles.home.redeemItem}>
                                    </View>
                                </View>
                                <View style={AppStyles.home.redeemItemCol}>
                                    <View style={AppStyles.home.redeemItem}>
                                    </View>
                                </View>
                                <View style={AppStyles.home.redeemItemCol}>
                                    <View style={AppStyles.home.redeemItem}>
                                    </View>
                                </View>
                                <View style={AppStyles.home.redeemItemCol}>
                                    <View style={AppStyles.home.redeemItem}>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default Home;