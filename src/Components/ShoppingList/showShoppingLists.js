import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';
import AddNewShoppingList from './addNewShoppingList';
import DeleteShoppingList from './deleteShoppingList';
import {getValue} from '../../utils/asyncStorageFunctions';
import * as RootNavigation from '../../utils/rootNavigation';
import mainStyling from '../../main_styling/main_styling';

class ShowShoppingLists extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingLists: [],
            addShoppingListActive: false
        }
    }

    getShoppingLists = async () => {
        const id = await getValue('id');
        let shoppingListIds = await axios.get(`http://192.168.0.38:8080/api/shoppingLists/${id}/shoppingLists`);

        const idArray = shoppingListIds.data;

        await Promise.all(idArray.map(async listId => (await axios.get(`http://192.168.0.38:8080/api/shoppingLists/${listId}`)
            .then(res => res.data))))
            .then(res => this.setState({ shoppingLists: res }));
    }

    openNewShoppingListForm = () => {
        this.setState({addShoppingListActive: !this.state.addShoppingListActive});
    }

    shoppingListsCompareMethod = (shoppingList, type) => {
        if (type === 'PrivateShoppingLists') {
            return shoppingList.length === 1  
        }  else {
            return shoppingList.length > 1
        } 
    }

    createListOfShoppingLists = (type) => {
        this.props.onClick();
        return  this.state.shoppingLists.map(list => this.shoppingListsCompareMethod(list.members_id, type) ?
        <ScrollView>
            <View key={list._id} style={mainStyling.containerShoppingList}>
                <View >
                    <Text style={mainStyling.p}>{list.name}</Text>
                </View>
                <View >
                    <Text style={mainStyling.p}>{list.products.length}</Text>
                    </View>
                    <View>
                <TouchableOpacity style={mainStyling.button} onPress={() => RootNavigation.navigate(`${list._id}`)} >
                    <Text style={mainStyling.buttonText} >Przejdź</Text>
                </TouchableOpacity>
                </View>
                <DeleteShoppingList onClick={this.getShoppingLists} id={list._id}/>
            </View></ScrollView> : null)
    }

    componentDidMount() {
        this.getShoppingLists();
    }


    render() {
        return (
            <View style={mainStyling.containerShoppingLists}>
                {this.props.type === 'PrivateShoppingLists' ? 
                <TouchableOpacity style={mainStyling.button} onPress={this.openNewShoppingListForm}><Text style={mainStyling.buttonText}>Dodaj listę zakupów</Text></TouchableOpacity> : <></>}
                {this.state.addShoppingListActive ? <AddNewShoppingList onClick={this.getShoppingLists}/> : null}
                {this.createListOfShoppingLists(this.props.type)}
            </View>
        );
    }
}

export default ShowShoppingLists;