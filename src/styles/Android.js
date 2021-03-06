import {StyleSheet, Dimensions} from 'react-native';

//setting up
let color = {
    // base : '#E61A80',
    // base : "#d0011b",
    base : "#ee5253",
    text : "#111",
    secondary : "#fff",
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
        backgroundColor : color.secondary,
  
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
        width : Dimensions.get('window').width,
        paddingHorizontal : 24,
    },
    sectionBody : {
        paddingVertical : 14,
        paddingHorizontal : 24,
    },
    offerWallRow : {
        flex : 1,
        flexDirection : "row",
        alignItems: 'center',
        justifyContent: 'center',
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
        // paddingBottom : '100%',
        borderRadius:4
    },
    redeemPic : {
        width: "100%",
        height: 0,
        paddingBottom: "100%",
        borderRadius: 14
    },
    redeemTitle : {
        paddingHorizontal: 14,
        paddingBottom: 14,
        lineHeight: 18,
        textAlign: "center",
        fontSize: 18
    },
    redeemCoinText : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 14,
        fontSize: 20
    },
    viewMenu:{
        backgroundColor:'white',
        height:110,
        flexDirection:'row'
    },
    buttonMenu:{
        height:100,
        width:75,
        flexDirection:'column',
        alignItems:'center',
        marginLeft:10,
    },
    viewIcon:{
        borderRadius:200,
        backgroundColor:color.base,
        width:60,
        height:60,
        marginTop: 10,
        padding:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

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
    },
    textHeader : {
        color : '#fff',
        textAlign: 'center',
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textSub : {
        color : '#fff',
        textAlign: 'center',
        margin: 10,
        fontSize: 16
    }
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
        marginBottom: 10,
        marginTop: 10
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
        width : '90%',
        fontSize : 18,
        paddingHorizontal : 14,
        paddingVertical : 8,
        textAlign : "center",
        minHeight : 45,
    },
    btnImage:
    {
        resizeMode: 'contain',
        height: 30,
        width: 30,
        alignSelf: 'center',
    },
    textBoxBtnHolder:
    {
        flexDirection: 'row',
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginBottom : 20,
        borderWidth : 2,
        borderColor  : 'rgba(0,0,0,0.2)',
        borderRadius : 14,
    },
     visibilityBtn:
    {
        position: 'absolute',
        alignSelf: 'center',
        right: 4,
        height: 45,
        width: 40,
        top: 3,
        padding: 4,
    },
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
    navWrap : {
        flex : 1,
        flexDirection : "row",
    },
    navLink : {
        display: "flex",
        flexDirection: "row",
        alignItems : "center",
        paddingVertical: 14,
        paddingHorizontal: 10
    },
    navLinkIcon : {
        marginRight: 10,
        marginTop: -2
    },
    navLinkText : {
        fontSize: 18,
        fontWeight: "600"
    },
    link :{
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
        borderColor: "#ffa801",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 16
    },
    coinText : {
        color: "#ffa801",
        marginRight: 4,
        fontSize: 18,
        fontWeight: "bold"
    }
})

let history = StyleSheet.create({
    container : {

    },
    ListItemCard : {
        position : "relative",
        display : 'flex',
        flexDirection : "row",
        marginBottom  :2,
        justifyContent : "space-between",
        padding : 24,
        backgroundColor : "#fff"
    },
    ListItemCardLeft : {
        position : "relative",
    },
    ListItemCardRight : {
        position : "relative",
        justifyContent : "center",
        alignItems : "center"
    },
    listTitle : {
        fontSize : 20,
        fontWeight : "600",
        marginBottom : 14
    },
    listDate : {
        fontSize : 14,
        fontWeight : '600',
        color : "rgba(0,0,0,0.3)"
    }
})

let detailItem = StyleSheet.create({
    container : {
        // flex: 1,
        width: '100%',
        paddingHorizontal: 14
    },
    imageHolder : {
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        marginBottom : 14
    },
    imageItem : {
        width: '100%',
        paddingBottom: '100%',
        borderRadius: 40
    },
    itemTitle : {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "600"
    },
    itemDesc : {
        textAlign: "center",
        fontSize: 16,
        color: 'rgba(0,0,0,0.4)'
    },
    btn : {
        width : '80%',
        padding : 10,
        backgroundColor : color.base,
        borderRadius :14
    },
    stock : {
        textAlign : "center",
        fontSize : 18,
        fontWeight : "bold",
        marginTop : 20
    }
})

let redeemHistory = StyleSheet.create({
    container : {

    },
    redeemItem : {
        flex : 1,
        // flexWrap : "wrap",
        flexDirection : "row",
        justifyContent : "space-between",
        position : "relative",
        padding : 14,
        marginBottom : 5,
        backgroundColor : "#ffffff"
    },
    redeemItemLeft : {
        flex: 1,
        flexDirection : "row",
    },
    redeemImageWrapper : {
        width: 80,
        height : 80,
        marginRight :14,
    },
    redeemTitleWrapper : {
        paddingVertical : 4,
        justifyContent : "space-around"
    },
    redeemItemRight : {
        justifyContent : "center"
    },
    redeemStatusText : {
        paddingVertical : 2,
        paddingHorizontal : 8,
        borderWidth : 1,
        borderColor : "#222",
        borderRadius : 14,

    }

})

const profile = StyleSheet.create({
    container : {
        paddingVertical : 8,
    },
    listWrap : {
        paddingVertical : 10, 
        paddingHorizontal : 24,
        borderBottomWidth : .5,
        borderBottomColor : 'rgba(0,0,0,0.1)'
    },
    listWrap2 : {
        paddingVertical : 10, 
        paddingHorizontal : 24,
    },
    listTitle : {
        fontSize : 18, 
        fontWeight : "600", 
        marginBottom : 10
    },
    listValue : {
        fontSize : 18
    },
    listInput : {
        paddingVertical : 4,
        borderBottomColor : "rgba(0,0,0,0.2)",
        borderBottomWidth : 2,
        marginBottom : 10,
        fontSize : 18
    },
    saveButton : {
        paddingVertical : 14,
        paddingHorizontal : 24,
        backgroundColor : color.base,
        borderRadius : 8,
    },
    saveButtonText : {
        fontSize : 18,
        color : "#fff",
        fontWeight : "600",
        textAlign : "center",
    },
    eye : {
        position : "absolute",
        top : 0,
        right : 0,
        padding : 5,
        // backgroundColor : "#222"
    }
})

const spinnerWheel = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    spinButton : {
        textAlign : "center",
        justifyContent : "center",
        paddingVertical : 14,
        paddingHorizontal : 24,
        backgroundColor: color.base,
        borderRadius : 100,
    },
    spinButtonText : {
        color : "#fff",
        fontSize : 20
    },
    spinButtonLoading : {
        textAlign : "center",
        justifyContent : "center",
        paddingVertical : 14,
        paddingHorizontal : 24,
        backgroundColor: "#ddd",
        borderRadius : 100,
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
    history,
    detailItem,
    redeemHistory,
    profile,
    spinnerWheel,
}


export default AppStyles;