import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { showShoppingList, crossProduct, resetShoppingList } from '../../redux_actions/shoppingListActions';
import * as RootNavigation from '../../utils/rootNavigation';
import AddProduct from './addProduct';
import DeleteProductFromShoppingList from './deleteProducFromShoppingList';
import AddUserToShoppingList from './addUserToShoppingList';
import ProgressBar from './progressBar';
import ShowShoppingListMembers from './showShoppingListMembers';

import mainStyling from '../../main_styling/main_styling';
import arrowBackSrc from "../../img/iconfinder_arrow-back_216437.png";
import arrowSyncSrc from "../../img/iconfinder_arrow-sync_216096.png";
import groupSrc from "../../img/iconfinder_group_216232.png";
import plusSrc from "../../img/iconfinder_plus_216373.png";
import addUserSrc from "../../img/iconfinder_user-add_216490.png";


class ShowShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addProductActive: false,
            addUserActive: false,
            showShoppingListMembers: false
        }
    }

    openNewProductForm = () => {
        this.setState({ addProductActive: !this.state.addProductActive, addUserActive: false, showShoppingListMembers: false });
    }

    openNewUserForm = () => {
        this.setState({ addUserActive: !this.state.addUserActive, addProductActive: false, showShoppingListMembers: false });
    }
    showShoppingListMembers = () => {
        this.setState({ showShoppingListMembers: !this.state.showShoppingListMembers, addProductActive: false, addUserActive: false });
    }

    backButtonHandle = () => {
        const previousScreen = this.props.shoppingListsData.shoppingListInfo.membersIds.length === 1 ? "PrivateShoppingLists" : "CommonShoppingLists";
        RootNavigation.navigate(previousScreen);
    }

    componentDidMount() {
        this.props.showShoppingList(this.props.shoppingListsData.shoppingListInfo.idShoppingList);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.shoppingListsData.products) !== JSON.stringify(prevProps.shoppingListsData.products)) {
            this.props.showShoppingList(this.props.shoppingListsData.shoppingListInfo.idShoppingList);
        }
    };

    render() {
        const { idShoppingList } = this.props.shoppingListsData.shoppingListInfo;
        const { products } = this.props.shoppingListsData;
        return (
            <ScrollView>
            <View style={mainStyling.containerProducts}>
                <View style={mainStyling.containerMenu}>
                    <View style={mainStyling.buttonContainer} className="button-container">
        <TouchableOpacity style={mainStyling.button} onPress={this.openNewProductForm}><Image style={mainStyling.icon} source={plusSrc} /></TouchableOpacity>
                        <Text style={mainStyling.buttonContainerP}>Dodaj produkt</Text>
                    </View>
                    <View style={mainStyling.buttonContainer}>
                        <TouchableOpacity style={mainStyling.button} onPress={this.openNewUserForm}><Image style={mainStyling.icon} source={addUserSrc} /></TouchableOpacity>
                        <Text style={mainStyling.buttonContainerP}>Dodaj osobę</Text>
                    </View>
                    <View style={mainStyling.buttonContainer} >
                        <TouchableOpacity style={mainStyling.button} onPress={this.showShoppingListMembers}><Image style={mainStyling.icon} source={groupSrc} /></TouchableOpacity>
                        <Text style={mainStyling.buttonContainerP}>Zobacz osoby</Text>
                    </View>
                    <View style={mainStyling.buttonContainer} >
                        <TouchableOpacity style={mainStyling.button} onPress={() => {this.props.resetShoppingList(idShoppingList, products); this.props.showShoppingList(idShoppingList)}}><Image style={mainStyling.icon} source={arrowSyncSrc} /></TouchableOpacity>
                        <Text style={mainStyling.buttonContainerP}>Reset listy</Text>
                    </View>
                    <View style={mainStyling.buttonContainer}>
                        <TouchableOpacity style={mainStyling.button} onPress={() => this.backButtonHandle()}><Image style={mainStyling.icon} source={arrowBackSrc} /></TouchableOpacity>
                        <Text style={mainStyling.buttonContainerP}>Powrót</Text>
                    </View>
                </View>
                {this.state.addProductActive ? <AddProduct onClick={() => this.props.showShoppingList(idShoppingList)} id={idShoppingList} /> : null}
                {this.state.addUserActive ? <AddUserToShoppingList onClick={this.openNewUserForm} /> : null}
                {this.state.showShoppingListMembers ? <ShowShoppingListMembers onClick={() => this.props.showShoppingList(idShoppingList)} /> : null}
                <ProgressBar allProducts={products} onChange={() => this.props.showShoppingList(idShoppingList)} />
                {products.map(product =>
                    <View key={product._id} style={mainStyling.containerProduct}>
                        <TouchableOpacity style={mainStyling.productName} onPress={async () => {await this.props.crossProduct(idShoppingList, product.bought, product._id); await this.props.showShoppingList(idShoppingList); console.log(this.props.shoppingListsData)}}>
                            <Text style={[product.bought ? { textDecorationLine: 'line-through', color: 'green' } : null, mainStyling.p]}>{product.name}</Text>
                        </TouchableOpacity>
                        <View style={mainStyling.productNumber}>
                            <Text style={[product.bought ? { textDecorationLine: 'line-through', color: 'green' } : null, mainStyling.p]}>{product.amount}</Text>
                        </View>
                        <View style={mainStyling.productNumber} >
                            <Text style={[product.bought ? { textDecorationLine: 'line-through', color: 'green' } : null, mainStyling.p]}>{product.unit}</Text>
                        </View>
                        <DeleteProductFromShoppingList onClick={() => this.props.showShoppingList(idShoppingList)} idProd={product._id} />
                    </View>)}
            </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
  });
  
  ShowShoppingList.propTypes = {
    shoppingListsData: PropTypes.object
  }
  
  export default connect(mapStateToProps, { showShoppingList, crossProduct, resetShoppingList })(ShowShoppingList);