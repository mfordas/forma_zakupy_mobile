import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import mainStyling from '../../main_styling/main_styling';

class ShowShoppingListMembers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingListId: this.props.id,
            membersIds: [],
            members: []
        }
    };

    getMembersIds = async () => {
        let members = await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${this.state.shoppingListId}/members`,
            method: "GET"
        });
        this.setState({ membersIds: members.data });
    }

    getMembersData = async () => {
        let membersArray = await Promise.all(this.state.membersIds.map(async memberId => (await axios({
            url: `http://192.168.0.38:8080/api/users/byId/${memberId}`,
            method: "GET",
            headers: setHeaders()
        }).then(res => res.data))));
        this.setState({ members: membersArray });
    };

    deleteMemberFromShoppingList = async (memberId) => {
        await axios({
            url: `http://192.168.0.38:8080/api/users/${memberId}/shoppingList/${this.state.shoppingListId}`,
            method: 'PUT',
            headers: setHeaders()
        }).then(res => {
            if (res.status === 200) {
                this.getMembersIds();
            } else {
                console.log('warrning');
            }
        },
            error => {
                console.log(error);
            }
        );
    }

    async componentDidMount() {
        await this.getMembersIds();
        await this.getMembersData();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.state.membersIds) !== JSON.stringify(prevState.membersIds)) {
            await this.getMembersData();
        }
    };


    render() {
        return (
            <View style={mainStyling.containerProduct}>
                {this.state.members.map(member => {
                    return <View key={member._id} style={mainStyling.containerShoppingList}>
                        <View >
                            <Text style={mainStyling.p} >{member.name}</Text>
                        </View>
                        <TouchableOpacity style={mainStyling.button} onPress={() => this.deleteMemberFromShoppingList(member._id)}>
                            <Text style={mainStyling.buttonText}>Usuń</Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>
        );
    }
}

export default ShowShoppingListMembers;