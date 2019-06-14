import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, PanResponder, Easing, ImageBackground, Image, Button } from 'react-native';
import RouletteItem from './RouletteItem'
import styles from './styles';

class Roulette extends Component {

  constructor(props) {
    super(props);
    let customRoulette = this.props.customRoulette;
    this.state = {
      _animatedValue: new Animated.Value(0),
      activeItem: 0,
      customRoulette : customRoulette,
      customRotate : [],
    };

    this.step = props.step || (2 * Math.PI) / props.options.length;

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: () => {
        // let { enableUserRotate, onRotate, onRotateChange, duration, easing, customRoulette, customRotate, onPressAction } = this.props;

        // if (enableUserRotate) {
        //   let { options, turns } = this.props;
        //   let { activeItem } = this.state;
        //   let random = Math.floor(Math.random() * options.length) 
        //   + (options.length*turns);                    
        //   const nextItem = random;

        //   this.state._animatedValue.setValue(activeItem);
        //   let animation = Animated.timing(this.state._animatedValue, { toValue: nextItem, easing, duration })          
        //   onRotateChange("start");
        //   animation.start(()=>{
        //     onRotateChange("stop");
        //   });
          
        //   let newActiveItem = nextItem > options.length ? (nextItem % options.length)  : nextItem;
        //   if(newActiveItem == 0){
        //     newActiveItem = options.length
        //   }
        //   this.setState({ activeItem: newActiveItem }, () => onRotate(options[options.length - newActiveItem]));
        // }
      }
    });
  }

    onPressRotate = () => {
        let { enableUserRotate, onRotate, onRotateChange, duration, easing, customRoulette, customRotate, onPressAction, rotateWheel } = this.props;

        if (enableUserRotate) {
            let { options, turns } = this.props;
            let { activeItem } = this.state;
            let random, nextItem;
            let next = {};
            if(customRoulette && customRotate.length > 0){
                random = Math.floor(Math.random() * 100) + 1;
                if (random >= 1 && random <= customRotate[0]) {
                    next = 1;
                } else if (random >= customRotate[0] + 1 && random <= customRotate[0] + customRotate[1]) {
                    next = 2
                } else if (random >= customRotate[0] + customRotate[1] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2]) {
                    next = 3
                } else if (random >= customRotate[0] + customRotate[1] + customRotate[2] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3]) {
                    next = 4
                } else if (random >= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4]) {
                    next = 5
                } else if (random >= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5]) {
                    next = 6
                } else if (random >= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + customRotate[6]) {
                    next = 7
                } else if (random >= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + customRotate[6] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + customRotate[6] + customRotate[7]) {
                    next = 8
                } else if (random >= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + customRotate[6] + customRotate[7] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + customRotate[6] + customRotate[7] + customRotate[8]) {
                    next = 9
                } else if (random >= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + customRotate[6] + customRotate[7] + customRotate[8] + 1 && random <= customRotate[0] + customRotate[1] + customRotate[2] + customRotate[3] + customRotate[4] + customRotate[5] + customRotate[6] + customRotate[7] + customRotate[8] + customRotate[9]) {
                    next = 10
                } else {
                    next = 1
                }
                next = next + (options.length * turns);
                nextItem = next;
            } else {
                // console.warn('masuk22')
                random = Math.floor(Math.random() * options.length) + (options.length*turns);                    
                nextItem = random;
            }

            this.state._animatedValue.setValue(activeItem);
            let animation = Animated.timing(this.state._animatedValue, { toValue: nextItem, easing, duration })          
            onRotateChange("start");
            animation.start(()=>{
            onRotateChange("stop");
            });
            
            let newActiveItem = nextItem > options.length ? (nextItem % options.length)  : nextItem;
            if(newActiveItem == 0){
            newActiveItem = options.length
            }
            this.setState({ activeItem: newActiveItem }, () => onRotate(options[options.length - newActiveItem]));
        }
    }

    componentWillReceiveProps(nextprops){
        // console.log(nextprops)
        if(nextprops.rotateWheel === true){
            this.onPressRotate();
        }
    }

  componentDidMount(){
    this.setState({
        customRotate : this.props.customRotate
    })
  }

  render() {
    const { options, radius, distance, customStyle, rouletteRotate, background, marker,centerImage, markerWidth,markerTop,centerWidth,centerTop,markerStyle, centerStyle, rotateEachElement, rotateWheel } = this.props;

    const interpolatedRotateAnimation = this.state._animatedValue.interpolate({
      inputRange: [0, options.length],
      outputRange: [`${rouletteRotate}deg`, `${360 + rouletteRotate}deg`]
    });

    const displayOptions = options && options.length > 0 && options[0] && React.isValidElement(options[0]);
    return (
      <>
        <View>
        
            <Animated.View
                //   {...this.panResponder.panHandlers}
                style={[
                    styles.container,
                    { width: radius, height: radius, borderRadius: radius / 2 },
                    { transform: [{ rotate: interpolatedRotateAnimation }] },
                    customStyle
                ]}
            >
                <ImageBackground width={radius} height={radius} style={{width:radius, height: radius, zIndex:100}} source={background}>
                    {displayOptions && Children.map(options, (child, index) =>
                        <RouletteItem
                            item={child}
                            index={index}
                            radius={radius}
                            step={this.step}
                            distance={distance}
                            rouletteRotate={ rotateEachElement(index) }
                        />
                    )}
                </ImageBackground>
            
            </Animated.View>
            <Image source={marker} resizeMode="contain" style={[styles.marker,{zIndex:9999,top: markerTop, width:markerWidth, left: (radius/2) -(markerWidth/2)}, markerStyle ]}/>
            
            {centerImage &&
            <Image source={centerImage} resizeMode="contain" style={[styles.marker,{zIndex:9999,top: centerTop, width:centerWidth, left: (radius/2) -(centerWidth/2) },centerStyle ]}/>
            }
        </View>

        {/* <Button onPress={this.onPressRotate} title="Spin Button" /> */}
      </>
    );
  }
}

Roulette.propTypes = {
  step: PropTypes.number,
  rotateWheel : PropTypes.bool,
  radius: PropTypes.number,
  distance: PropTypes.number,
  rouletteRotate: PropTypes.number,
  enableUserRotate: PropTypes.bool,
  customRotate : PropTypes.any,
  customRoulette : PropTypes.bool,
  onPressAction : PropTypes.any,
  onRotate: PropTypes.func,
  onRotateChange: PropTypes.func,  
  rotateEachElement: PropTypes.func,
  customStyle: PropTypes.any,
  background: PropTypes.any,
  turns: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.any
};

Roulette.defaultProps = {
  radius: 300,
  rotateWheel : false,
  distance: 100,
  rouletteRotate: 0,
  enableUserRotate: false,
  background: null,
  turns: 4,
  rotateEachElement: (index) => 0,
  onRotate: () => {},
  onRotateChange: () => {},
  duration: 3500,
  easing: Easing.inOut(Easing.ease),
  markerTop: 0,
  markerWidth:20,
  centerWidth:20,
  centerTop: 0,
  centerImage: null,
  markerStyle: {},
  customRotate : [],
  customRoulette : false,
  onPressAction : null,
};

export default Roulette;
