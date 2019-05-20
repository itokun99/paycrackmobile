export const Settings = {
    isOnline : false,
    basePath : "http://192.168.100.5/paycrack/",
    onlinePath : "http://192.168.100.5/paycrack/",
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

        fetch(url, option)
        .then((response) => {
            // console.log(response);
            if(response.ok){
                resolve(response.json())
            } else {
                resolve(response.json())
            }
        }).catch(() => {
            console.log(response);
            resolve(response)
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
    
    let path = `api/items${params > 0 ? "?" : "" }`;
    return request(path)
}

// login user
const userLogin = (data = {}) => {
    let path = 'api/users/userlogin';
    let method = "POST";
    return request(path, method, data);
}

const getUserData = (data = {}) => {
    let params = 0;
    for(let key in data){
        params++;
    }
    
    let path = `api/users${params > 0 ? "?" : "" }${typeof(data.id) !== "undefined" ? params > 1 ? "&id="+data.id : data.id : "" }`;
    return request(path)
}

const dailycheckin = (data = {}) => {
    let url = 'api/users/dailycheckin';
    let method = 'POST';
    return request(url, method, data); 
}


//user API

const API = {
    getRedeemItems,
    userLogin,
    getUserData,
    dailycheckin
}

export default API;