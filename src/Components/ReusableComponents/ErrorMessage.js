import React from 'react';
import { Text } from 'react-native';
import mainStyling from '../../main_styling/main_styling';

const ErrorMessage = (props) => {
    return <Text style={mainStyling.errorMessage}>{props.message}</Text>
  }

export default ErrorMessage;