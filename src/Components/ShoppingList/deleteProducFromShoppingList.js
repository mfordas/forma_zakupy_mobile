import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
// import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { showShoppingList, deleteProduct } from '../../redux_actions/shoppingListActions';
// import setHeaders from '../../utils/setHeaders';
import mainStyling from '../../main_styling/main_styling';

class DeleteProductFromShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            idProduct: this.props.idProd,
            // productDeleted: null,
            // idShoppingList: this.props.id
        }
    }

    deleteProduct = () => {
        this.props.deleteProduct(this.props.shoppingListsData.shoppingListInfo.idShoppingList, this.state.idProduct);
        this.props.showShoppingList(this.props.shoppingListsData.shoppingListInfo.idShoppingList);
    }


    // deleteProduct = async () => {
    //     const id = this.state.idShoppingList;
    //     const idProd = this.state.idProduct;
    //     const headers = await setHeaders();
    //     await axios({
    //         url: `http://192.168.0.38:8080/api/shoppingLists/${id}/product/${idProd}`,
    //         method: "DELETE",
    //         headers: headers
    //     }).then(res => {
    //         if (res.status === 200) {
    //             this.setState({ productDeleted: true});
    //           } else {
    //             this.setState({ productDeleted: false });
    //           }
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //     );

    //     this.props.onClick();
    // }

    render() {
        return (
                <TouchableOpacity style={mainStyling.button} onPress={this.deleteProduct}><Text style={mainStyling.buttonText}>Usuń</Text></TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
  });
  
  DeleteProductFromShoppingList.propTypes = {
    shoppingListsData: PropTypes.object
  }
  
  export default connect(mapStateToProps, { showShoppingList, deleteProduct })(DeleteProductFromShoppingList);