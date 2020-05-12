import React from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import mainStyling from '../../main_styling/main_styling';
import setHeaders from '../../utils/setHeaders';

class AddProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productName: '',
            productAmount: 0,
            productUnit: 'kg',
            idShoppingList: this.props.id,
            productAdded: null,
            productsProposals: [],
        }
    }

    addProductToList = async () => {
        const id = this.state.idShoppingList;
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${id}/product`,
            method: 'PUT',
            headers: setHeaders(),
            data: {
                name: this.state.productName,
                amount: this.state.productAmount,
                unit: this.state.productUnit
            }
        }).then(res => {
            if (res.status === 200) {

                this.setState({ productAdded: true });
            } else {
                this.setState({ productAdded: false });
            }
        },
            error => {
                console.log(error);
            }
        );

        this.props.onClick();

    };


    showProductsProposals = async (productName) => {
        if (productName.length >= 3) {
            let productsList = await axios({
                url: `http://192.168.0.38:8080/api/products/${productName.toLowerCase()}`,
                method: 'GET',
                headers: setHeaders(),
                data: {
                    name: this.state.productName,
                    amount: this.state.productAmount,
                    unit: this.state.productUnit
                }
            });
            this.setState({ productsProposals: productsList.data });
        } else {this.setState({ productsProposals: [] });}
    }

    render() {
        return (
            <View style={mainStyling.containerAddShoppingList}>
                <View style={mainStyling.horizontalFormContainer}>
                <Text style={mainStyling.p}>Nazwa</Text>
                <TextInput  style={mainStyling.input} onChangeText={text => {
                    this.showProductsProposals(text);
                    this.setState({ productName: text })}} value={this.state.productName}>
                    </TextInput>
                </View>
                <View style={mainStyling.horizontalFormContainer}>
            {this.state.productsProposals.map(product => <TouchableOpacity key={product._id} style={mainStyling.button} onPress={() => this.setState({productName: product.name, productsProposals: []})}><Text style={mainStyling.productsProposalText}>{product.name}</Text></TouchableOpacity>)}
          </View>
                <View style={mainStyling.horizontalFormContainer}>
                <Text style={mainStyling.p}>Ilość</Text>
                <TextInput  style={[{maxWidth: 50}, mainStyling.input]} onChangeText={text => {
                   this.setState({ productAmount: text })}}>
                    </TextInput>
                <Picker
                selectedValue={this.state.productUnit}
                style={{height: 50, width: 100}}
                itemStyle={{alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'black',
                color: 'black',
                fontSize: 14,
                margin: 10,
                borderRadius: 20,}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ productUnit: itemValue })
                }>
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="g" value="g" />
                <Picker.Item label="l" value="l" />
                <Picker.Item label="ml" value="ml" />
                <Picker.Item label="szt" value="szt" />
              </Picker>
                </View>
                <TouchableOpacity style={mainStyling.button} onPress={this.addProductToList}><Text style={mainStyling.p}>Dodaj</Text></TouchableOpacity>
            </View>
        );
    }
}

export default AddProduct;