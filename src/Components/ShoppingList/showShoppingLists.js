import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
// import AddNewShoppingList from './addNewShoppingList';
// import DeleteShoppingList from './deleteShoppingList';
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
        if (type === 'private') {
            return shoppingList.length === 1  
        }  else {
            return shoppingList.length > 1
        } 
    }

    createListOfShoppingLists = (type) => {
        return  this.state.shoppingLists.map(list => this.shoppingListsCompareMethod(list.members_id, type) ?
            // <div key={list._id} className="container-shoppingList">
            //     <div className="shoppinglist-name">
            //         <p>{list.name}</p>
            //     </div>
            //     <div className="shoppinglist-productsNumber">
            //         <p>{list.products.length}</p>
            //     </div>
            //     <Link className="button" to={{pathname:`/shoppingList/${list.name}`, listInfo:{id:list._id, name:list.name, members_id:list.members_id}}}>Przejdź</Link>
                
            //     <DeleteShoppingList onClick={this.getShoppingLists} id={list._id}/> </div> : null)
            <View key={list._id} style={mainStyling.containerShoppingList}>
                <View >
                    <Text style={mainStyling.p}>{list.name}</Text>
                </View>
                <View >
                    <Text style={mainStyling.p}>{list.products.length}</Text>
                </View>
                {/* <Link className="button" to={{pathname:`/shoppingList/${list.name}`, listInfo:{id:list._id, name:list.name, members_id:list.members_id}}}>Przejdź</Link> */}
                <View>
                <TouchableOpacity style={mainStyling.button} onPress={() => RootNavigation.navigate(`${list.name}`)} listInfo={{id:list._id, name:list.name, members_id:list.members_id}}>
                    <Text style={mainStyling.buttonText} >Przejdź</Text>
                </TouchableOpacity>
                </View>
            </View> : null)
    }

    componentDidMount() {
        this.getShoppingLists();
    }


    render() {
        return (
            <View style={mainStyling.containerShoppingLists}>
                <TouchableOpacity style={mainStyling.button} onPress={this.openNewShoppingListForm}><Text style={mainStyling.buttonText}>Dodaj listę zakupów</Text></TouchableOpacity>
                {/* {this.state.addShoppingListActive ? <AddNewShoppingList onClick={this.getShoppingLists}/> : null} */}
                {this.createListOfShoppingLists(this.props.type)}
            </View>
        );
    }
}

export default ShowShoppingLists;