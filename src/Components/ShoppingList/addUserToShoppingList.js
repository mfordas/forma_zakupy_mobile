import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { addUserToList, showUsersProposals, getMembersIds, getMembersData } from '../../redux_actions/shoppingListActions';
import mainStyling from '../../main_styling/main_styling';

class AddUserToShoppingList extends React.Component {

    addUser = async (user) => {
        const { idShoppingList } = this.props.shoppingListsData.shoppingListInfo;
        this.props.addUserToList(idShoppingList, user._id);
        await this.props.getMembersIds(this.props.shoppingListsData.shoppingListInfo.idShoppingList);
        await this.props.getMembersData(this.props.shoppingListsData.shoppingListInfo.membersIds);
    }

    render() {
        return (
            <>
                <View style={mainStyling.containerAddShoppingList}>
                    <View style={mainStyling.horizontalFormContainer}>
                    <Text style={mainStyling.p}>Nazwa</Text>
                    <TextInput style={mainStyling.input} onChangeText={text => {
                        this.props.showUsersProposals(text);
                    }}></TextInput>
                </View>
                </View>
                <View>
                    {this.props.shoppingListsData.usersProposals.map(user => <View style={mainStyling.horizontalFormContainer} key={user._id} id={user._id} value={user.name}>
                        <Text style={mainStyling.buttonText}>{user.name}</Text>
                        <TouchableOpacity style={mainStyling.button} onPress={() => this.addUserToList(user)}>
                        <Text style={mainStyling.buttonText}>Dodaj</Text>
                        </TouchableOpacity>
                        </View>)}
                </View>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
  });
  
  AddUserToShoppingList.propTypes = {
    shoppingListsData: PropTypes.object
  }

  export default connect(mapStateToProps, { addUserToList, showUsersProposals, getMembersIds, getMembersData })(AddUserToShoppingList);