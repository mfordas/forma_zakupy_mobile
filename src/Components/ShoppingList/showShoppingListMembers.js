import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { getMembersIds, getMembersData, deleteMemberFromShoppingList } from '../../redux_actions/shoppingListActions';
import mainStyling from '../../main_styling/main_styling';

class ShowShoppingListMembers extends React.Component {
   
    async componentDidMount() {
        await this.props.getMembersData(this.props.shoppingListsData.shoppingListInfo.membersIds);
    }

    async componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.shoppingListsData.shoppingListInfo.membersIds) !== JSON.stringify(prevProps.shoppingListsData.shoppingListInfo.membersIds)) {
            await this.props.getMembersData(this.props.shoppingListsData.shoppingListInfo.membersIds);
        }
    };

    deleteMember = (member) => {
        this.props.deleteMemberFromShoppingList(member._id, this.props.shoppingListsData.shoppingListInfo.idShoppingList);
        this.props.getMembersIds(this.props.shoppingListsData.shoppingListInfo.idShoppingList)
    }

    render() {
        return (
            <View style={mainStyling.containerProduct}>
                {this.props.shoppingListsData.members.map(member => {
                    return <View key={member._id} style={mainStyling.containerShoppingList}>
                        <View >
                            <Text style={mainStyling.p} >{member.name}</Text>
                        </View>
                        <TouchableOpacity style={mainStyling.button} onPress={() => this.deleteMember(member)}>
                            <Text style={mainStyling.buttonText}>Usuń</Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
  });
  
  ShowShoppingListMembers.propTypes = {
    shoppingListsData: PropTypes.object
  }

  export default connect(mapStateToProps, { getMembersIds, getMembersData, deleteMemberFromShoppingList })(ShowShoppingListMembers);