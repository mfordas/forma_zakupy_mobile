import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import mainStyling from '../../main_styling/main_styling';

class DeleteProductFromShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            idProduct: this.props.idProd,
            productDeleted: null,
            idShoppingList: this.props.id
        }
    }


    deleteProduct = async () => {
        const id = this.state.idShoppingList;
        const idProd = this.state.idProduct;
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${id}/product/${idProd}`,
            method: "DELETE",
            headers: setHeaders()
        }).then(res => {
            if (res.status === 200) {
                this.setState({ productDeleted: true});
              } else {
                this.setState({ productDeleted: false });
              }
            },
            error => {
              console.log(error);
            }
        );

        this.props.onClick();
    }

    render() {
        return (
                <TouchableOpacity style={mainStyling.button} onPress={this.deleteProduct}><Text style={mainStyling.buttonText}>Usuń</Text></TouchableOpacity>
        );
    }
}

export default DeleteProductFromShoppingList;