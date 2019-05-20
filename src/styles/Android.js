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
        width : "33.33333%",
        paddingHorizontal : 14,
        // paddingBottom : 24,
    },
    offerWallItem : {
        position : "relative",
        width : "100%",
        overflow : "hidden",
        borderRadius : 14,
        backgroundColor : color.base,
        height : 0,
        paddingBottom : "100%"
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
    }
    ,footerText : {
        fontSize : 18,
        fontWeight : "bold"
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
}


export default AppStyles;