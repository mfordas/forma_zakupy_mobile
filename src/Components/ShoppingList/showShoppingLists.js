import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { getShoppingLists, setShoppingListInfo } from '../../redux_actions/shoppingListActions';
import AddNewShoppingList from './addNewShoppingList';
import DeleteShoppingList from './deleteShoppingList';
import * as RootNavigation from '../../utils/rootNavigation';
import mainStyling from '../../main_styling/main_styling';

class ShowShoppingLists extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addShoppingListActive: false
        }
    }

    openNewShoppingListForm = () => {
        this.setState({addShoppingListActive: !this.state.addShoppingListActive});
        console.log(this.props.shoppingListsData);
    }

    shoppingListsCompareMethod = (shoppingList, type) => {
        if (type === 'PrivateShoppingLists') {
            return shoppingList.length === 1  
        }  else {
            return shoppingList.length > 1
        } 
    }

    createListOfShoppingLists = (type) => {
        return  this.props.shoppingListsData.shoppingLists.map(list => this.shoppingListsCompareMethod(list.members_id, type) ?
        <ScrollView>
            <View key={list._id} style={mainStyling.containerShoppingList}>
                <View >
                    <Text style={mainStyling.p}>{list.name}</Text>
                </View>
                <View >
                    <Text style={mainStyling.p}>{list.products.length}</Text>
                    </View>
                    <View>
                <TouchableOpacity style={mainStyling.button} onPress={async () => {await this.props.setShoppingListInfo(list); RootNavigation.navigate(`${list._id}`)}} >
                    <Text style={mainStyling.buttonText} >Przejdź</Text>
                </TouchableOpacity>
                </View>
                <DeleteShoppingList onClick={() => this.props.getShoppingLists} id={list._id}/>
            </View></ScrollView> : null)
    }

    componentDidMount() {
        this.props.getShoppingLists();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.shoppingListsData.shoppingLists) !== JSON.stringify(prevProps.shoppingListsData.shoppingLists)) {
            this.props.getShoppingLists();
            this.createListOfShoppingLists();
        }
    };


    render() {
        return (
            <View style={mainStyling.containerShoppingLists}>
                {this.props.type === 'PrivateShoppingLists' ? 
                <TouchableOpacity style={mainStyling.button} onPress={this.openNewShoppingListForm}><Text style={mainStyling.buttonText}>Dodaj listę zakupów</Text></TouchableOpacity> : <></>}
                {this.state.addShoppingListActive ? <AddNewShoppingList /> : null}
                {this.createListOfShoppingLists(this.props.type)}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingListsData: state.shoppingListsData,
  });
  
  ShowShoppingLists.propTypes = {
    shoppingListsData: PropTypes.object
  }

  export default connect(mapStateToProps, { getShoppingLists, setShoppingListInfo })(ShowShoppingLists);