import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { getShoppingLists } from '../../redux_actions/shoppingListActions';
import ShowShoppingLists from './showShoppingLists';
import ShowShoppingList from './showShoppingList';


    const Stack = createStackNavigator();

class ShoppingListContent extends React.Component {

    async componentDidMount() {
        await this.props.getShoppingLists();
    }


    render() {
        return (
            <Stack.Navigator >
              <Stack.Screen name="PrivateShoppingLists" options={{headerShown: false}}>{props => <ShowShoppingLists {...props} type={'PrivateShoppingLists'} />}</Stack.Screen>
              <Stack.Screen name="CommonShoppingLists" options={{headerShown: false}}>{props => <ShowShoppingLists {...props} type={'CommonShoppingLists'} />}</Stack.Screen>
              {this.props.shoppingListsData.shoppingLists.map(list => <Stack.Screen name={`${list._id}`} options={{headerShown: false}}>{props => <ShowShoppingList {...props} listInfo={{id:list._id, name:list.name, members_id:list.members_id}} />}</Stack.Screen>)}
            </Stack.Navigator>
        );
    }
}

// export default ShoppingListContent;
const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
  });
  
  ShoppingListContent.propTypes = {
    shoppingListsData: PropTypes.object
  }
  
  export default connect(mapStateToProps, { getShoppingLists })(ShoppingListContent);