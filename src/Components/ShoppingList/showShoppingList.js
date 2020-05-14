import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AddProduct from './addProduct';
import setHeaders from '../../utils/setHeaders';
import DeleteProductFromShoppingList from './deleteProducFromShoppingList';
import AddUserToShoppingList from './addUserToShoppingList';
import ProgressBar from './progressBar';
import ShowShoppingListMembers from './showShoppingListMembers'
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
            products: [],
            name: this.props.listInfo.name,
            idShoppingList: this.props.listInfo.id,
            members: this.props.listInfo.members_id,
            addProductActive: false,
            addUserActive: false,
            showShoppingListMembers: false
        }
    }

    showShoppingList = async () => {
        let products = await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${this.state.idShoppingList}/products`,
            method: "GET"
        });
        const productsArray = products.data;
        this.setState({ products: productsArray });
    }

    crossProduct = async (currentStatus, idProduct) => {
        const id = this.state.idShoppingList;
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${id}/product/${idProduct}`,
            method: 'PUT',
            headers: setHeaders(),
            data: {
                bought: !currentStatus,
            }
        }).then(res => {
            if (res.status === 200) {
                this.showShoppingList();
            } else {
                console.log('warrning');
            }
        },
            error => {
                console.log(error);
            }
        );

    }

    resetShoppingList = async () => {
        const id = this.state.idShoppingList;
        this.state.products.map(async product => {
            await axios({
                url: `http://192.168.0.38:8080/api/shoppingLists/${id}/product/${product._id}`,
                method: 'PUT',
                headers: setHeaders(),
                data: {
                    bought: false,
                }
            }).then(res => {
                if (res.status === 200) {
                    this.showShoppingList();
                } else {
                    console.log('warrning');
                }
            },
                error => {
                    console.log(error);
                }
            );
        })
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

    componentDidMount() {
        this.showShoppingList();
    }

    render() {
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
                        <TouchableOpacity style={mainStyling.button} onPress={this.resetShoppingList}><Image style={mainStyling.icon} source={arrowSyncSrc} /></TouchableOpacity>
                        <Text style={mainStyling.buttonContainerP}>Reset listy</Text>
                    </View>
                    <View style={mainStyling.buttonContainer}>
                        <TouchableOpacity style={mainStyling.button} ><Image style={mainStyling.icon} source={arrowBackSrc} /></TouchableOpacity>
                        <Text style={mainStyling.buttonContainerP}>Powrót</Text>
                    </View>
                </View>
                {this.state.addProductActive ? <AddProduct onClick={this.showShoppingList} id={this.state.idShoppingList} /> : null}
                {this.state.addUserActive ? <AddUserToShoppingList onClick={this.openNewUserForm} id={this.state.idShoppingList} /> : null}
                {this.state.showShoppingListMembers ? <ShowShoppingListMembers onClick={this.showShoppingList} id={this.state.idShoppingList} membersIds={this.state.members} /> : null}
                <ProgressBar allProducts={this.state.products} onChange={this.showShoppingList} />
                {this.state.products.map(product =>
                    <View key={product._id} style={mainStyling.containerProduct}>
                        <TouchableOpacity style={mainStyling.productName} onPress={() => this.crossProduct(product.bought, product._id)}>
                            <Text style={[product.bought ? { textDecorationLine: 'line-through', color: 'green' } : null, mainStyling.p]}>{product.name}</Text>
                        </TouchableOpacity>
                        <View style={mainStyling.productNumber}>
                            <Text style={[product.bought ? { textDecorationLine: 'line-through', color: 'green' } : null, mainStyling.p]}>{product.amount}</Text>
                        </View>
                        <View style={mainStyling.productNumber} >
                            <Text style={[product.bought ? { textDecorationLine: 'line-through', color: 'green' } : null, mainStyling.p]}>{product.unit}</Text>
                        </View>
                        <DeleteProductFromShoppingList onClick={this.showShoppingList} id={this.state.idShoppingList} idProd={product._id} />
                    </View>)}
            </View>
            </ScrollView>
        );
    }
}

export default ShowShoppingList;