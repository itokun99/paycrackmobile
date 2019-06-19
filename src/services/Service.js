import NetInfo from "@react-native-community/netinfo";

export const Settings = {
    isOnline : true,
    // basePath : "http://kes.co.id/dev/paycrack/",
    basePath : "http://paycrack.jalanpelajar.com/",
    // basePath : "http://192.168.100.5/paycrack/",
    onlinePath : "http://paycrack.jalanpelajar.com/",
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
            // console.warn(state);
            if(state.isConnected){
                fetch(url, option)
                .then((response) => {
                    if(response.ok){
                        if(response.url !== url){
                            let notConnectToServer = {
                                status : false,
                                code : 2,
                                message : "Not connected to server!"
                            }
                            resolve(notConnectToServer);
                        } else {
                            resolve(response.json())
                        }
                    } else {
                        resolve(response.json())
                    }
                }).catch((response) => {
                    console.warn(response);
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
    let id = `${typeof(data.id) !== "undefined" ? params > 1 ? "&id="+data.id : "id="+data.id : ""}`;    
    let path = `api/items${params > 0 ? "?" : "" }${appkey}${id}`;
    return request(path)
}

const getJackpotHistory = (data = {}) => {
    let params = 0;
    for(let key in data){
        params++;
    }
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;    
    let user_id = `${typeof(data.user_id) !== "undefined" ? params > 1 ? "&user_id="+data.user_id : "user_id="+data.user_id : ""}`;    
    let limit = `${typeof(data.limit) !== "undefined" ? params > 1 ? "&limit="+data.limit : "limit="+data.limit : ""}`;    
    let offset = `${typeof(data.offset) !== "undefined" ? params > 1 ? "&offset="+data.offset : "offset="+data.offset : ""}`;    
    let id = `${typeof(data.id) !== "undefined" ? params > 1 ? "&id="+data.id : "id="+data.id : ""}`;    
    let path = `api/history/jackpot${params > 0 ? "?" : "" }${appkey}${id}${user_id}${limit}${offset}`;
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

const getBanners = (data = {}) => {
    let params = 0;
    for(let key in data){
        params++;
    }
    // http://localhost/paycrack/api/banner/setting?appkey=RiguFb1WGmS2qOBR
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;    
    let path = `api/banner/setting${params > 0 ? "?" : "" }${appkey}`;
    return request(path)
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
    // console.warn(data);
    return request(path)
}

//daily checkin
const dailycheckin = (data = {}) => {
    let url = 'api/users/dailycheckin';
    let method = 'POST';
    return request(url, method, data); 
}

//daily checkin
const dailycheckin2 = (data = {}) => {
    let url = 'api/users/dailycheckin2';
    let method = 'POST';
    return request(url, method, data); 
}

// get point
const dailyPoint = (data = {}) => {
    params = 0;
    for(let key in data){
        params++
    }
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;
    let path = `api/dailypoint/set${params > 0 ? "?" : ""}${appkey}`;
    return request(path);
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
const getSpinnerValue = (data = {}) => {
    let params = 0;
    for(key in data){
        params++;
    }
    
    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;
    let path = `api/spinner/show${params > 0 ? "?" : "" }${appkey}`;
    return request(path);
}

const getSpinnerProbs = (data = {}) => {
    let params = 0;
    for(key in data){
        params++;
    }

    let appkey = `${typeof(data.appkey) !== "undefined" ? params > 1 ? "&appkey="+data.appkey : "appkey="+data.appkey : ""}`;
    let path = `api/spinner/probs_hit${params > 0 ? "?" : "" }${appkey}`;
    return request(path);
}

const changePassword = (data = {}) => {
    let path = "api/users/change_password";
    let method = "POST";

    return request(path, method, data);
}

const changeAddress = (data = {}) => {
    let path = "api/users/change_address";
    let method = "POST";

    return request(path, method, data);
}

const playSpinner = (data = {}) => {
    let path = "api/spinner/play";
    let method = "POST";
    
    return request(path, method, data)
}

const sendSpinnerResult = (data = {}) => {
    let path = "api/spinner/result";
    let method = "POST";
    
    return request(path, method, data)
}

const changeStatusSpinner = (data = {}) => {
    let path = "api/spinner/change_status";
    let method = "POST";
    return request(path, method, data)
}

const lastLogin = (data = {}) => {
    let path = "api/users/user_lastlogin";
    let method = "POST";
    
    return request(path, method, data)
}



//user API
const API = {
    getSpinnerProbs,
    getRedeemItems,
    userLogin,
    userLogout,
    getUserData,
    dailycheckin,
    dailycheckin2,
    historyPoint,
    redeemPoint,
    historyRedeem,
    getSpinnerValue,
    dailyPoint,
    lastLogin,
    changePassword,
    changeAddress,
    playSpinner,
    sendSpinnerResult,
    changeStatusSpinner,
    getJackpotHistory,
    getBanners
}

export default API;