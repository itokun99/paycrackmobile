import NetInfo from "@react-native-community/netinfo";

export const Settings = {
    isOnline : false,
    // basePath : "http://kes.co.id/dev/paycrack/",
    basePath : "http://192.168.100.5/paycrack/",
    onlinePath : "http://kes.co.id/dev/paycrack/",
    offlinePath : "http://192.168.100.5/paycrack/",
}

const request = (path, method, data, formData = false ) => {
    const promise = new Promise((resolve, reject) => {
        let option = {};
        let url = `${Settings.isOnline ? Settings.onlinePath : Settings.offlinePath}${path}`;
        if(method === "POST" || method === "post" || method === "PUT" || method === "put"){
            option.method = method;
        } else {
            option.method = method;
        }

        if(formData){
            option.body = data;
        } else {
            option.body = JSON.stringify(data);
            option.headers = {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }

        NetInfo.fetch().then((state) => {
            if(state.isConnected){
                fetch(url, option)
                .then((response) => {
                    // console.log(response);
                    if(response.ok){
                        resolve(response.json())
                    } else {
                        resolve(response.json())
                    }
                }).catch((response) => {
                    console.log(response);
                    resolve(response)
                })
            } else {
                let lossInternet = {
                    status : false,
                    code : 1,
                    message : "Not Connected to Internet"
                }
                resolve(lossInternet)
            }
        })
    })

    return promise;
}

// get List Item untuk redeem
const getRedeemItems = (data = {}) => {
    let params = 0;
    for(let key in data){
        params++;
    }
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;    
    let path = `api/items${params > 0 ? "?" : "" }${appkey}`;
    return request(path)
}

// login user
const userLogin = (data = {}) => {
    let path = 'api/users/userlogin';
    let method = "POST";
    return request(path, method, data);
}

const userLogout = (data = {}) => {
    let path = "api/users/userlogout";
    let method = "POST";
    return request(path,method, data);
}

// getUser data
const getUserData = (data = {}) => {
    let params = 0;
    for(let key in data){
        params++;
    }
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;
    let id = `${typeof(data.id) !== "undefined" ? params > 1 ? "&id="+data.id : 'id='+data.id : "" }`;
    let path = `api/users${params > 0 ? "?" : "" }${appkey}${id}`;
    return request(path)
}

//daily checkin
const dailycheckin = (data = {}) => {
    let url = 'api/users/dailycheckin';
    let method = 'POST';
    return request(url, method, data); 
}

// get history point
const historyPoint = (data = {}) => {
    params = 0;
    for(let key in data){
        params++
    }
    
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;
    let user_id = `${typeof(data.user_id) !== "undefined" ? params > 1 ? "&user_id="+data.user_id : "user_id="+data.user_id :""}`;
    let path = `api/history/point${params > 0 ? "?" : ""}${appkey}${user_id}`;

    return request(path);
}

// redeem item
const redeemPoint = (data = {}) => {
    let path = 'api/users/redeempoint';
    let method = "POST";
    return request(path, method, data);
}

const historyRedeem = (data = {}) => {
    let params = 0;
    for(key in data){
        params++;
    }
    
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;
    let user_id = `${typeof(data.user_id) !== "undefined" ? params > 1 ? "&user_id="+data.user_id : "user_id="+data.user_id :""}`;
    let path = `api/history/redeem${params > 0 ? "?" : "" }${appkey}${user_id}`;
    return request(path);
}

//user API

const API = {
    getRedeemItems,
    userLogin,
    userLogout,
    getUserData,
    dailycheckin,
    historyPoint,
    redeemPoint,
    historyRedeem
}

export default API;