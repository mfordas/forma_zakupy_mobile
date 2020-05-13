import React from 'react';
import 'react-native-gesture-handler';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import {getValue} from '../../utils/asyncStorageFunctions';
import ShowShoppingLists from './showShoppingLists';
import ShowShoppingList from './showShoppingList';

    const Stack = createStackNavigator();

class ShoppingListContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingLists: [],
        }
    }

    getShoppingLists = async () => {
        const id = await getValue('id');
        let shoppingListIds = await axios.get(`http://192.168.0.38:8080/api/shoppingLists/${id}/shoppingLists`);

        const idArray = shoppingListIds.data;

        await Promise.all(idArray.map(async listId => (await axios.get(`http://192.168.0.38:8080/api/shoppingLists/${listId}`)
            .then(res => res.data))))
            .then(res => this.setState({ shoppingLists: res }));
    }

    async componentDidMount() {
        await this.getShoppingLists();
        console.log(this.state.shoppingLists);
    }


    render() {
        return (
            <Stack.Navigator >
              <Stack.Screen name="PrivateShoppingLists" options={{headerShown: false}}>{props => <ShowShoppingLists {...props} type={'PrivateShoppingLists'} />}</Stack.Screen>
              <Stack.Screen name="CommonShoppingLists" options={{headerShown: false}}>{props => <ShowShoppingLists {...props} type={'CommonShoppingLists'} />}</Stack.Screen>
              {this.state.shoppingLists.map(list => <Stack.Screen name={`${list.name}`} options={{headerShown: false}}>{props => <ShowShoppingList {...props} listInfo={{id:list._id, name:list.name, members_id:list.members_id}} />}</Stack.Screen>)}
            </Stack.Navigator>
        );
    }
}

export default ShoppingListContent;