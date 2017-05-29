import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';

//This is just an idea not an exact implementation for creating ripple component.
//We can modify this code to make it reusable ripple component
class Ripple extends PureComponent {

    constructor(props, context) {
        super(props, context);

        const maxOpacity = 0.12;
        this.state = {
            maxOpacity,
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(maxOpacity)
        };
        this.renderRippleView = this.renderRippleView.bind(this);
        this.onPressedIn = this.onPressedIn.bind(this);
        this.onPressedOut = this.onPressedOut.bind(this);
    }

    onPressedIn() {
      Animated.timing(this.state.scaleValue, {
          toValue: 1,
          duration: 225,
          easing: Easing.bezier(0.0, 0.0, 0.2, 1)
      }).start();
    }

    onPressedOut() {
      Animated.timing(this.state.opacityValue, {
          toValue: 0
      }).start(() => {
          this.state.scaleValue.setValue(0.01);
          this.state.opacityValue.setValue(this.state.maxOpacity);
      });
    }

    renderRippleView() {
        const { size } = this.props;
        const { scaleValue, opacityValue } = this.state;
        const rippleSize = size * 2;
        return (
            <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: rippleSize,
                  height: rippleSize,
                  borderRadius: rippleSize / 2,
                  transform: [{ scale: scaleValue }],
                  opacity: opacityValue,
                  backgroundColor: '#000000'
                }}
            />
        );
    }

    render() {
        const { size } = this.props;
        const containerSize = size * 2;
        const iconContainer = {
          width: containerSize,
          height: containerSize,
          justifyContent: 'center',
          alignItems: 'center'
        };

        return (
            <TouchableWithoutFeedback
              onPressIn={this.onPressedIn}
              onPressOut={this.onPressedOut}>
                <View style={[ iconContainer, this.props.styles ]}>
                    {this.props.children}
                    {this.renderRippleView()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default Ripple;
