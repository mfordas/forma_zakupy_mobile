import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { addShoppingList, getShoppingLists } from '../../redux_actions/shoppingListActions';
import mainStyling from '../../main_styling/main_styling';

class AddNewShoppingList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingListName: ''
            // addShoppingListActive: false,
            // shoppingListAdded: null
        }
    }


    // addShoppingList = async () => {
    //     const id = await getValue('id');
    //     const headers = await setHeaders();
    //     await axios({
    //         url: `http://192.168.0.38:8080/api/shoppingLists/${id}/shoppingList`,
    //         method: 'POST',
    //         headers: headers,
    //         data: {
    //             name: this.state.shoppingListName
    //         }
    //     }).then(res => {
    //         if (res.status === 200) {

    //             this.setState({ shoppingListAdded: true});
    //           } else {
    //             this.setState({ shoppingListAdded: false });
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
                <View style={mainStyling.containerAddShoppingList}>
                    <View style={mainStyling.horizontalFormContainer}>
                <Text style={mainStyling.p}>Nazwa</Text>
                <TextInput  style={mainStyling.input} onChangeText={text => 
                    this.setState({ shoppingListName: text })}>
                    </TextInput>
                </View>
                <TouchableOpacity style={mainStyling.button} onPress={() => {this.props.addShoppingList(this.state.shoppingListName); this.props.getShoppingLists()}}><Text style={mainStyling.buttonText}>Dodaj</Text></TouchableOpacity>
                </View>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
  });
  
  AddNewShoppingList.propTypes = {
    shoppingListsData: PropTypes.object
  }

  export default connect(mapStateToProps, { addShoppingList, getShoppingLists })(AddNewShoppingList);