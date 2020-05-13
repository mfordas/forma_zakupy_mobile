import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import mainStyling from '../../main_styling/main_styling';

class AddUserToShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            idUser: '',
            idShoppingList: this.props.id,
            userAdded: null,
            usersProposals: []
        }
    }

    addUserToList = async (idUser) => {
        const id = this.state.idShoppingList;
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${id}/commonShoppingList/${idUser}`,
            method: 'PUT',
            headers: setHeaders()

        }).then(res => {
            if (res.status === 200) {
                this.setState({ userAdded: true });
                this.props.onClick();
            } else {
                this.setState({ userAdded: false });
            }
        },
            error => {
                console.log(error);
            }
        );


    };


    showUsersProposals = async (text) => {
        if (text.length >= 3) {
            let usersList = await axios({
                url: `http://192.168.0.38:8080/api/users/${text.toLowerCase()}`,
                method: 'GET',
                headers: setHeaders(),
                data: {
                    name: this.state.productName
                }
            });
            this.setState({ usersProposals: usersList.data });
        } else { this.setState({ usersProposals: [] }); }
    }

    render() {
        return (
            <>
                <View style={mainStyling.containerAddShoppingList}>
                    <View style={mainStyling.horizontalFormContainer}>
                    <Text style={mainStyling.p}>Nazwa</Text>
                    <TextInput style={mainStyling.input} onChangeText={text => {
                        this.showUsersProposals(text);
                    }}></TextInput>
                </View>
                </View>
                <View>
                    {this.state.usersProposals.map(user => <View style={mainStyling.horizontalFormContainer} key={user._id} id={user._id} value={user.name}>
                        <Text style={mainStyling.p}>{user.name}</Text>
                        <TouchableOpacity style={mainStyling.button} onPress={() => this.addUserToList(user._id)}>
                        <Text style={mainStyling.p}>Dodaj</Text>
                        </TouchableOpacity>
                        </View>)}
                </View>
            </>
        );
    }
}

export default AddUserToShoppingList;