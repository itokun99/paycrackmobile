import React, {Component, createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../services/Service';

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
                loginData : {}
            }

            // action global konsep mirip redux dispatcher.
            // https://redux.js.org/basics/actions
            dispatch = (action) => {
                switch(action.type){
                    case "USER_LOGIN":
                        let data = action.data;
                        this.setState({
                            isLogin : true,
                            loginData : data
                        }, () => {
                            this.checkUpdateUserData(data.user_id);
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
                    default:
                        return false;
                }
            }

            checkUpdateUserData = (user_id) => {
                let params = {
                    id : user_id
                }
                let loginData = {...this.state.loginData};
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
                        console.log(result);
                    }
                })
            }

            componentDidMount(){

            }

            render(){
                // console.log(this)
                let stateManager = {
                    globalState : this.state,
                    globalAction : this.dispatch, 
                }
                return(
                    <Provider value={stateManager}>
                        <ChildComponent {...this.props} />
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