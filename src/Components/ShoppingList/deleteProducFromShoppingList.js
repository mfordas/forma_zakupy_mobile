import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { showShoppingList, deleteProduct } from '../../redux_actions/shoppingListActions';
import mainStyling from '../../main_styling/main_styling';

class DeleteProductFromShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            idProduct: this.props.idProd,
        }
    }

    deleteProduct = () => {
        this.props.deleteProduct(this.props.shoppingListsData.shoppingListInfo.idShoppingList, this.state.idProduct);
        this.props.showShoppingList(this.props.shoppingListsData.shoppingListInfo.idShoppingList);
    }

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