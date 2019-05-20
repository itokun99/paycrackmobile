//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components
export default class Instruction extends Component {
  //Screen2 Component
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.textInstruction}> 
        This is Free AppReedem App on your Android phone through the Android marker
        </Text>
        <Text style={styles.textInstruction}>
        Level-up and earn extra bonus points. Become the points leader for even Bigger Rewards 
        </Text>
        <Text style={styles.textInstruction}>
        Discover new Apps and reedem points with Real Rewards!</Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textInstruction:{
    fontSize: 20 ,
    textAlign: 'center',
    marginTop: 20,
  }
});