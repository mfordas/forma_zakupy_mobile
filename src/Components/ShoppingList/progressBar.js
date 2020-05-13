import React from 'react';
import { Animated, View, Text } from 'react-native';
import mainStyling from '../../main_styling/main_styling';



class ProgressBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            percentOfCompletedProducts: 0,
            backgroundColor: 0,
            width: 0,
            widthAnimated: new Animated.Value(0),
            backgroundColorAnimated: new Animated.Value(0)
        }
    };


    countPercentage = async () => {
        let allProducts = this.props.allProducts.length;
        let boughtProducts = this.props.allProducts.length;
        await this.props.allProducts.map(product => {
            return product.bought ? null : --boughtProducts;
        });

        let percentage = Math.floor((boughtProducts / allProducts) * 100);
        if (isNaN(percentage)) {
            return 0;
        } else {
            this.setState({ percentOfCompletedProducts: percentage });
            this.stylingChange();
            console.log(this.state);
            this.animatedProgressBar();
        }
    };

    stylingChange = () => {
        if (this.state.percentOfCompletedProducts <= 33) {
            return this.setState({ backgroundColor: 1 ,
        width: this.state.percentOfCompletedProducts*3 });
        }
        else if (this.state.percentOfCompletedProducts <= 66 && this.state.percentOfCompletedProducts > 33) {
            return this.setState({ backgroundColor: 2,
            width: this.state.percentOfCompletedProducts*3});
        }
        else if (this.state.percentOfCompletedProducts > 66 && this.state.percentOfCompletedProducts < 100) {
            return this.setState({ backgroundColor: 3,
            width: this.state.percentOfCompletedProducts*3});
        }
        else if (this.state.percentOfCompletedProducts === 100) {
            return this.setState({ backgroundColor:4 ,
            width: this.state.percentOfCompletedProducts*2.97});
        }

    }

    animatedProgressBar = () => {
        Animated.timing(
            this.state.widthAnimated,
            {
                toValue: this.state.width,
                duration: 700,
                useNativeDriver: false
            }
        ).start();
        Animated.timing(
            this.state.backgroundColorAnimated,
            {
                toValue: this.state.backgroundColor,
                duration: 1000,
                useNativeDriver: false
            }
        ).start()
       
    }

    componentDidMount() {
        this.countPercentage();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.allProducts) !== JSON.stringify(prevProps.allProducts)) {
            this.countPercentage();
            
        }
    };

    render() {
        return (
            <View style={mainStyling.progressBarContainer}>
                <Animated.View style={[mainStyling.progressBar, {backgroundColor: this.state.backgroundColorAnimated.interpolate(
                    {
                        inputRange: [1, 2, 3, 4],
                        outputRange: ['red', 'orange', 'yellow', 'green']
                    }
                    ), width: this.state.widthAnimated}]}><Text style={mainStyling.progressBarText}>{this.state.percentOfCompletedProducts}%</Text></Animated.View>
            </View>
        );
    };
}

export default ProgressBar;