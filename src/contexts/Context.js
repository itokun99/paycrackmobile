import React, {Component, createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../services/Service';
import Toast from 'react-native-easy-toast';

/*
    Dokumentasi tentang React Context
    dan state management ada di 
    https://reactjs.org/docs/context.html
*/

// Deklarasi agar lebih mudah
const Context = createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

/*
    Context Menggunakan High Order Component (HOC);
    dokumentasi HOC https://reactjs.org/docs/higher-order-components.html
*/

//High Order Component Untuk Wrapper Provider
const GlobalProvider = (ChildComponent) => {
    return (
        //return component dinamis untuk HOC
        class ParentComponent extends Component {
            // state global disini bisa disebuat store.
            state = {
                isLogin : false,
                loginData : {},
                internet : false,
            }

            // action global konsep mirip redux dispatcher.
            // https://redux.js.org/basics/actions
            dispatch = (action) => {
                let data = {};
                switch(action.type){
                    case "USER_LOGIN":
                        data = action.data;
                        this.setState({
                            isLogin : true,
                            loginData : data,
                        }, () => {
                            this.runCheckUser();
                        })
                        break;
                    case "UPDATE_POINT":
                        let datas = action.data;
                        let loginData = {
                            ...this.state.loginData
                        }
                        loginData.user_point = parseInt(loginData.user_point) + datas;
                        this.setState({
                            loginData : loginData
                        })
                        break;
                    case "USER_LOGOUT":
                        this.setState({
                            isLogin : false,
                            loginData : {}
                        })
                        break;
                    case "USER_UPDATE":
                        data = action.data;
                        this.setState({
                            loginData : data,
                        })
                        break;
                    default:
                        return false;
                }
            }

            checkUpdateUserData = () => {
                let loginData = {...this.state.loginData};
                let params = {
                    appkey : loginData.appkey,
                    id : loginData.user_id
                }
                API.getUserData(params)
                .then((result) => {
                    if(result.status){
                        let data = result.data[0];
                        let hasChange = false;
                        for(let key in loginData){
                            if(loginData[key] !== data[key]){
                                hasChange = true;
                            }
                        }
                        if(hasChange){
                            this.setState({
                                loginData : data
                            })
                        }
                    } else {
                        if(result.code === 1 || result.code === 2){
                            this.setState({
                                internet : false,
                            })
                            this.refs.toast.show(result.message, 5000);
                        }
                    }
                })
            }

            runCheckUser = () => {
                setInterval(() => {
                    if(this.state.isLogin){
                        this.checkUpdateUserData(this.state.loginData.user_id);
                    } else {
                        clearInterval()
                    }
                }, 3000)
            }

            componentDidMount(){
                setTimeout(() => {
                    if(this.state.isLogin){
                        this.runCheckUser();
                    }
                }, 3000)
            }

            render(){
                let stateManager = {
                    globalState : this.state,
                    globalAction : this.dispatch, 
                }
                return(
                    <Provider value={stateManager}>
                        <ChildComponent {...this.props} />
                        <Toast ref="toast" />
                    </Provider>
                )
            }
        }
    )
}

//High Order Component untuk Konsumer Global State
export const GlobalConsumer = (ChildComponent) => {
    return(
        class ParentComponent extends Component {
            render(){
                return(
                    <Consumer>
                        {
                            (value) => {
                                return(
                                    <ChildComponent {...value} {...this.props} />
                                )
                            }
                        }
                    </Consumer>
                )
            }
        }
    )
}

export default GlobalProvider;