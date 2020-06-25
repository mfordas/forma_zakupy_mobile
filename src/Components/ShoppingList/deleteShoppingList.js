import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
// import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { deleteShoppingListFromDataBase, removeShoppingListFromUsersShoppingLists, getShoppingLists } from '../../redux_actions/shoppingListActions';
// import setHeaders from '../../utils/setHeaders';
// import {getValue} from '../../utils/asyncStorageFunctions';
import mainStyling from '../../main_styling/main_styling';

class DeleteShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // shoppingListName: '',
            // addShoppingListActive: false,
            // shoppingListDeleted: null,
            idShoppingList: this.props.id
        }
    }


    // removeShoppingListFromUsersShoppingLists = async () => {
    //     const idUser = await getValue('id');
    //     const id = this.state.idShoppingList;
    //     const headers = await setHeaders();
    //     await axios({
    //         url: `http://192.168.0.38:8080/api/shoppingLists/${id}/user/${idUser}`,
    //         method: "PUT",
    //         headers: headers
    //     }).then(res => {
    //         if (res.status === 200) {
    //             this.setState({ shoppingListDeleted: true});
    //           } else {
    //             this.setState({ shoppingListDeleted: false });
    //           }
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //     );
    // }

    // deleteShoppingListFromDataBase = async () => {
    //     const idSL = this.state.idShoppingList;
    //     const headers = await setHeaders();
    //     await axios({
    //         url: `http://192.168.0.38:8080/api/shoppingLists/${idSL}`,
    //         method: "DELETE",
    //         headers: headers
    //     }).then(res => {
    //         if (res.status === 200) {
    //             this.setState({ shoppingListDeleted: true});
    //           } else {
    //             this.setState({ shoppingListDeleted: false });
    //           }
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //     );
    // }

    // deleteShoppingList = async () => {
    //     await this.removeShoppingListFromUsersShoppingLists();
    //     await this.deleteShoppingListFromDataBase();
    //     this.props.onClick();
    // }

    deleteShoppingList = async () => {
      await this.props.removeShoppingListFromUsersShoppingLists(this.state.idShoppingList);
      this.props.getShoppingLists();
      await this.props.deleteShoppingListFromDataBase(this.state.idShoppingList);
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