import React from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addProductToList, showProductsProposals, showShoppingList } from '../../redux_actions/shoppingListActions';
import mainStyling from '../../main_styling/main_styling';

class AddProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productName: '',
            productAmount: 0,
            productUnit: 'kg',
        }
    };

    addProductToList = () => {
        this.props.addProductToList(this.props.shoppingListsData.shoppingListInfo.idShoppingList, this.state);
        this.props.showShoppingList(this.props.shoppingListsData.shoppingListInfo.idShoppingList)
    };

    render() {
        return (
            <View style={mainStyling.containerAddShoppingList}>
                <View style={mainStyling.horizontalFormContainer}>
                <Text style={mainStyling.p}>Nazwa</Text>
                <TextInput  style={mainStyling.input} onChangeText={async text => {
                    await this.props.showProductsProposals(text);
                    this.setState({ productName: text })}} value={this.state.productName}>
                    </TextInput>
                </View>
                <View style={mainStyling.horizontalFormContainer}>
            {this.props.shoppingListsData.productsProposals.map(product => <TouchableOpacity key={product._id} style={mainStyling.button} onPress={() => this.setState({productName: product.name})}><Text style={mainStyling.productsProposalText}>{product.name}</Text></TouchableOpacity>)}
          </View>
                <View style={mainStyling.horizontalFormContainer}>
                <Text style={mainStyling.p}>Ilość</Text>
                <TextInput  style={[{maxWidth: 50}, mainStyling.input]} onChangeText={text => {
                   this.setState({ productAmount: text })}}>
                    </TextInput>
                <Picker
                selectedValue={this.state.productUnit}
                style={{height: 50, width: 100}}
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
                <TouchableOpacity style={mainStyling.button} onPress={this.addProductToList}><Text style={mainStyling.buttonText}>Dodaj</Text></TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
});

AddProduct.propTypes = {
    shoppingListsData: PropTypes.object
}

export default connect(mapStateToProps, { addProductToList, showProductsProposals, showShoppingList })(AddProduct);