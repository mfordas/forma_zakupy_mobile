import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import {getValue} from '../../utils/asyncStorageFunctions';
import mainStyling from '../../main_styling/main_styling';

class DeleteShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingListName: '',
            addShoppingListActive: false,
            shoppingListDeleted: null,
            idShoppingList: this.props.id
        }
    }


    removeShoppingListFromUsersShoppingLists = async () => {
        const idUser = await getValue('id');
        const id = this.state.idShoppingList;
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${id}/user/${idUser}`,
            method: "PUT",
            headers: setHeaders()
        }).then(res => {
            if (res.status === 200) {
                this.setState({ shoppingListDeleted: true});
              } else {
                this.setState({ shoppingListDeleted: false });
              }
            },
            error => {
              console.log(error);
            }
        );
    }

    deleteShoppingListFromDataBase = async () => {
        const idSL = this.state.idShoppingList;
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${idSL}`,
            method: "DELETE",
            headers: setHeaders()
        }).then(res => {
            if (res.status === 200) {
                this.setState({ shoppingListDeleted: true});
              } else {
                this.setState({ shoppingListDeleted: false });
              }
            },
            error => {
              console.log(error);
            }
        );
    }

    deleteShoppingList = async () => {
        await this.removeShoppingListFromUsersShoppingLists();
        await this.deleteShoppingListFromDataBase();
        this.props.onClick();
    }

    render() {
        return (
                <TouchableOpacity style={mainStyling.button} onPress={this.deleteShoppingList}><Text style={mainStyling.buttonText}>Usuń</Text></TouchableOpacity>
        );
    }
}

export default DeleteShoppingList;