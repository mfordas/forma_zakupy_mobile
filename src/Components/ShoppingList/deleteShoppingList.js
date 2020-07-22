import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { deleteShoppingListFromDataBase, removeShoppingListFromUsersShoppingLists, getShoppingLists } from '../../redux_actions/shoppingListActions';
import mainStyling from '../../main_styling/main_styling';

class DeleteShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            idShoppingList: this.props.id,
            membersIds: this.props.membersIds
        }
    }

    deleteShoppingList = async () => {
        await this.deleteShoppingListsFromEachMembersShoppingLists();
        await this.props.deleteShoppingListFromDataBase(this.state.idShoppingList);
        await this.props.getShoppingLists();
  }

  deleteShoppingListsFromEachMembersShoppingLists = async () => {
    await this.state.membersIds.map(async id => 
        await this.props.removeShoppingListFromUsersShoppingLists(id, this.state.idShoppingList)
        );
}

    render() {
        return (
                <TouchableOpacity style={mainStyling.button} onPress={this.deleteShoppingList}><Text style={mainStyling.buttonText}>Usuń</Text></TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => ({
  shoppingListsData: state.shoppingListsData,
});

DeleteShoppingList.propTypes = {
  shoppingListsData: PropTypes.object
}

export default connect(mapStateToProps, { deleteShoppingListFromDataBase, removeShoppingListFromUsersShoppingLists, getShoppingLists })(DeleteShoppingList);