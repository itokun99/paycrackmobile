import {StyleSheet, Dimensions} from 'react-native';

//setting up
let color = {
    base : '#E61A80',
    secondary : "",
    backgroundLayer : "#eee",
    defaultFont : "#222",
    linkFont : "#E61A80",
} 


// global styles
let global = StyleSheet.create({
    // scrollContainer : {
    //     width : Dimensions.get('window').width,
    //     // height : '100%'
    // },
    scrollView : {
        backgroundColor : color.backgroundLayer,
  
    },
    scrollContainer : {
        flex : 1,
        justifyContent : "space-between"
    },
    screenWrapper : {

    }
})

// CSS HOME
let home = StyleSheet.create({
    main : {

    },
    section : {
        backgroundColor : "#fff",
    },
    sectionHeader : {
        borderWidth : 1,
        borderColor : 'rgba(0,0,0,0.1)',
        width : Dimensions.get('window').width,
        paddingVertical : 14,
        paddingHorizontal : 24,
    },
    sectionBody : {
        paddingVertical : 24,
        paddingHorizontal : 24,
    },
    offerWallRow : {
        flex : 1,
        flexDirection : "row",
        flexWrap : "wrap",
        marginHorizontal : -14
    },
    offerWallCol : {
        width : "25%",
        paddingHorizontal : 14,
        // paddingBottom : 24,
    },
    offerWallItem : {
        position : "relative",
        width : "100%",
        overflow : "hidden",
        borderRadius : 14,
        backgroundColor : "#fff",
        height : 40,
        justifyContent : "center",
        alignItems : "center",
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.1)"
    },
    redeemItemRow : {
        flex : 1,
        flexDirection : "row",
        flexWrap : "wrap",
        marginHorizontal : -14
    },
    redeemItemCol : {
        width : '50%',
        paddingHorizontal : 14,
        paddingBottom : 28,
    },
    redeemItem : {
        position : "relative",
        overflow : "hidden",
        width : '100%',
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.1)",
        backgroundColor : "#fff",
        paddingBottom : '100%'
    },
    viewMenu:{
        backgroundColor:'white',
        height:110,
        flexDirection:'row'
    },
    buttonMenu:{
        height:'100%',
        width:75,
        flexDirection:'column',
        alignItems:'center',
        marginLeft:30,
    },
    viewIcon:{
        borderRadius:10,
        backgroundColor:'#E61A80',
        width:60,
        height:60,
        marginTop: 10,
        padding:10
    },
    imageIcon:{
        alignSelf:'center',
        height:'100%',
        width:'100%',
    },
    textIcon:{
        fontSize:12,
        textAlign: 'center',
        alignItems: 'center',
        marginTop:10
    },
    imageDialog:{
        width:200,
        height:200,
        alignSelf: 'center',
        margin:10
    },
    textDialog:{
        color:'#ffffff',
        width:'100%',
        textAlign:'center',
        marginTop: 10,
        marginBottom:10
    },
    textCoin :{
        color:'white',
        textAlign: 'center',
        fontSize: 20
    }
    // redeemItemPic : {
       
    // }
})


// CSS LUPA PASSWORD
let forgotpassword = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#fff",   
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
    },
    formWrapper : {
        padding : 42,
        width : '100%'
    },
    formTitle : {
        textAlign : "center",
        fontSize : 24,
    },
    btn : {
        backgroundColor : color.base,
        paddingHorizontal : 14,
        paddingVertical : 14,
        borderRadius : 14,
    },
    btnText : {
        textAlign : "center",
        fontSize : 18,
        color : "#fff",
        fontWeight : "600",
    },
    formGroup : {
        position : "relative",
        marginBottom : 24,
    },
    formControl : {
        width : '100%',
        fontSize : 18,
        paddingHorizontal : 14,
        paddingVertical : 8,
        borderWidth : 2,
        borderColor  : 'rgba(0,0,0,0.2)',
        borderRadius : 14,
        textAlign : "center"
    }

})

// CSS LOADING FIRST SCREEN
let loadingfirst = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : "center",
        backgroundColor : color.base
    },
    loadingWrap : {

    },
    loadingImage : {
        width : 100,
    }
}) 

// CSS LOGIN SCREEN
let login = StyleSheet.create({
    container : {
        backgroundColor : "#fff",
        width : '100%',
        height : '100%',
    },
    mainWrapper : {
        flex : 1,
        backgroundColor : "#fff",
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    loginIcon : {
        width : '100%',
        height : 100,
        marginBottom : 24,
    },
    Loginform : {
        backgroundColor: "#fff",
        padding : 42,
        width: '100%',
    },
    btn : {
        backgroundColor : color.base,
        paddingHorizontal : 14,
        paddingVertical : 14,
        borderRadius : 14,
    },
    btnText : {
        textAlign : "center",
        fontSize : 18,
        color : "#fff",
        fontWeight : "600",
    },
    formGroup : {
        position : "relative",
        marginBottom : 24,
    },
    formControl : {
        width : '100%',
        fontSize : 18,
        paddingHorizontal : 14,
        paddingVertical : 8,
        borderWidth : 2,
        borderColor  : 'rgba(0,0,0,0.2)',
        borderRadius : 14,
        textAlign : "center"
    }
})

let sidebar = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : "space-between",
        backgroundColor : "#fff"
    },
    header : {
        // flex : 1,
        flexDirection : "row",
        justifyContent : "center",
        position: 'relative',
        flexWrap : "wrap",
        paddingTop : 42,
        paddingBottom :32,
        paddingHorizontal : 14,
        backgroundColor : color.base
    },
    userPicWrapper : {
        width :100,
        height : 100,
        overflow : "hidden",
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth : 1,
        borderRadius : 120,
        backgroundColor : "#fff",
        marginBottom: 10,
    },
    userName : {
        width : '100%',
        textAlign : "center",
        fontSize : 24,
        fontWeight : "bold",
        color : "#fff"
    },
    userEmail  :{
        width : '100%',
        textAlign : "center",
        fontSize : 14,
        color : 'rgba(200,200,200,200)'
    },
    userPic : {
        width : 100,
        height: 100,
    },
    footer : {
        borderColor : "rgba(0,0,0,0.1)",
        borderTopWidth : 1,
        paddingHorizontal : 24,
        paddingVertical : 14,
        flexDirection: 'row',
    }
    ,footerText : {
        fontSize : 18,
        fontWeight : "bold",
        marginLeft: 20,
    },
    containerDrawer : {
        flex: 1,
        backgroundColor : 'lightgray',
    },
    topLinks :{
        height: 150,
        backgroundColor : '#E61A80'
    },
    bootomLinks : {
        flex : 1,
        backgroundColor : 'white',
        paddingTop: 10,
        paddingBottom: 450,
    },
    text : {
        fontSize : 20,
        color: 'white',
        textAlign: 'center'
    },
    textEmail : {
        fontSize : 14,
        color: 'white',
        textAlign: 'center'
    },
    profile :{
        flex : 1,
        height:'100%',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent : 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
    },
    imgView :{
        width: '100%',
        height: '100%',
        maxHeight: 70,
        maxWidth: 70,
        justifyContent: 'center',
        resizeMode:'contain'
    },
    imgParent:{
        width: '100%',
        height: '100%',
        maxHeight: 70,
        maxWidth: 70,
        justifyContent: 'center',
    },
    link :{
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 10,
        margin: 5,
        textAlign: 'left'
    },
    footer : {
        height : 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor : 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    version :{
        flex : 1,
        textAlign : 'right',
        marginRight: 20,
        color: 'gray',
    },
    description : {
        flex : 1,
        marginLeft: 10,
        fontSize : 16,
        flexDirection: 'row',
    },
})

let cointIcon = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: "row",
        marginRight: 14,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 16
    },
    coinText : {
        color: "#fff",
        marginRight: 4,
        fontSize: 18,
        fontWeight: "bold"
    }
})

let history = StyleSheet.create({
    container : {

    }
})

//store style ke objek
const AppStyles = {
    global,
    loadingfirst,
    login,
    color,
    sidebar,
    home,
    forgotpassword,
    cointIcon,
    history
}


export default AppStyles;