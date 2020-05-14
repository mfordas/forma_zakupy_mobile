import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import {getValue} from '../../utils/asyncStorageFunctions';
import mainStyling from '../../main_styling/main_styling';

class AddNewShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingListName: '',
            addShoppingListActive: false,
            shoppingListAdded: null
        }
    }


    addShoppingList = async () => {
        const id = await getValue('id');
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${id}/shoppingList`,
            method: 'POST',
            headers: setHeaders(),
            data: {
                name: this.state.shoppingListName
            }
        }).then(res => {
            if (res.status === 200) {

                this.setState({ shoppingListAdded: true});
              } else {
                this.setState({ shoppingListAdded: false });
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
                <View style={mainStyling.containerAddShoppingList}>
                    <View style={mainStyling.horizontalFormContainer}>
                <Text style={mainStyling.p}>Nazwa</Text>
                <TextInput  style={mainStyling.input} onChangeText={text => 
                    this.setState({ shoppingListName: text })}>
                    </TextInput>
                </View>
                <TouchableOpacity style={mainStyling.button} onPress={this.addShoppingList}><Text style={mainStyling.buttonText}>Dodaj</Text></TouchableOpacity>
                </View>
        );
    }
}

export default AddNewShoppingList;