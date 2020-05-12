import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ShowShoppingLists from './showShoppingLists';

    const Stack = createStackNavigator();

class ShoppingListContent extends React.Component {
    render() {
        return (
            <Stack.Navigator >
              <Stack.Screen name="PrivateShoppingLists" options={{headerShown: false}}>{props => <ShowShoppingLists {...props} type={'private'} />}</Stack.Screen>
              <Stack.Screen name="CommonShoppingLists" options={{headerShown: false}}>{props => <ShowShoppingLists {...props} type={'common'} />}</Stack.Screen>
              <Stack.Screen name={`:/name`} options={{headerShown: false}}>{props => <ShowShoppingList {...props} />}</Stack.Screen>
            </Stack.Navigator>
        );
    }
}

export default ShoppingListContent;