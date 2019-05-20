import {ToastAndroid} from 'react-native';

export const AndroidToast = (props) => {
    if(props.data.show){
        ToastAndroid.showWithGravityAndOffset(
            props.data.message,
            //size LONG / SHORT
            ToastAndroid[props.data.size.toUpperCase()],
            // postion TOP, BOTTOM;
            ToastAndroid[props.data.position.toUpperCase()],
            25,
            50
        );
        return null
    }
    return null
}