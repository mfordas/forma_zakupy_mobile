import axios from 'axios';

import setHeaders from '../utils/setHeaders';
import {
    TYPES
} from '../redux_actions/types';
import { getValue } from '../utils/asyncStorageFunctions';


export const getShoppingLists = () => async (dispatch) => {
    const id = await getValue('id');
    let shoppingListIds = await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${id}/shoppingLists`,
        method: 'GET',
        headers: await setHeaders()
    });
    
    const idArray = shoppingListIds.data;

    await Promise.all(idArray.map(async listId => (await axios({
                    url: `http://192.168.0.38:8080/api/shoppingLists/${listId}`,
                    method: 'GET',
                    headers: await setHeaders()
                }

            )
            .then(res => res.data))))
        .then(res =>
            dispatch({
                type: TYPES.SHOWSHOPPINGLISTS,
                shoppingLists: res
            }));
};

export const addShoppingList = (shoppingListName) => async (dispatch) => {
    const id = await getValue('id');
    await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${id}/shoppingList`,
        method: 'POST',
        headers: await setHeaders(),
        data: {
            name: shoppingListName
        }
    }).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: TYPES.ADDSHOPPINGLIST,
                    shoppingListAdded: true
                });
            } else {
                dispatch({
                    type: TYPES.ADDSHOPPINGLIST,
                    shoppingListAdded: false
                });
            }
        },
        error => {
            console.log(error);
        }
    );
};

export const removeShoppingListFromUsersShoppingLists = (id, idSL) => async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/users/${id}/shoppingList/${idSL}`,
        method: "PUT",
        headers: await setHeaders()
    }).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: TYPES.DELETESHOPPINGLIST,
                    shoppingListDeleted: true
                });
            } else {
                dispatch({
                    type: TYPES.DELETESHOPPINGLIST,
                    shoppingListDeleted: false
                });
            }
        },
        error => {
            console.log(error);
        }
    );
};

export const deleteShoppingListFromDataBase = (id) => async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${id}`,
        method: "DELETE",
        headers: await setHeaders()
    }).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: TYPES.DELETESHOPPINGLIST,
                    shoppingListDeleted: true
                });
            } else {
                dispatch({
                    type: TYPES.DELETESHOPPINGLIST,
                    shoppingListDeleted: true
                });
            }
        },
        error => {
            console.log(error);
        }
    );
};

export const addProductToList = (id, productData) => async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${id}/product`,
        method: 'PUT',
        headers: await setHeaders(),
        data: {
            name: productData.productName,
            amount: productData.productAmount,
            unit: productData.productUnit
        }
    }).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: TYPES.ADDPRODUCT,
                    products: res.data.products,
                    productAdded: true,
                    productsProposals: []
                })
            } else {
                dispatch({
                    type: TYPES.ADDPRODUCT,
                    productAdded: false
                })
            }
        },
        error => {
            console.log(error);
        }
    );
};


export const showProductsProposals = (productName) => async (dispatch) => {
    if (productName.length >= 3) {
        let productsList = await axios({
            url: `http://192.168.0.38:8080/api/products/${productName.toLowerCase()}`,
            method: 'GET',
            headers: await setHeaders(),
        });
        dispatch({
            type: TYPES.SHOWPRODUCTPROPOSALS,
            productsProposals: productsList.data
        });
    } else {
        dispatch({
            type: TYPES.SHOWPRODUCTPROPOSALS,
            productsProposals: []
        });
    }
};

export const showShoppingList = (idShoppingList) => async (dispatch) => {
    let products = await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${idShoppingList}/products`,
        method: "GET",
        headers: await setHeaders()
    });
    const productsArray = products.data;
    dispatch({
        type: TYPES.SHOWSHOPPINGLIST,
        products: productsArray
    })
};

export const crossProduct = (idShoppingList, currentProductStatus, idProduct) => async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${idShoppingList}/product/${idProduct}`,
        method: 'PUT',
        headers: await setHeaders(),
        data: {
            bought: !currentProductStatus,
        }
    }).then(res => {
            if (res.status === 200) {
                dispatch({
                    type: TYPES.CROSSPRODUCT
                })
            } else {
                console.log('warrning');
            }
        },
        error => {
            console.log(error);
        }
    );

};

export const resetShoppingList = (idShoppingList, products) => async (dispatch) => {
    products.map(async product => {
        await axios({
            url: `http://192.168.0.38:8080/api/shoppingLists/${idShoppingList}/product/${product._id}`,
            method: 'PUT',
            headers: await setHeaders(),
            data: {
                bought: false,
            }
        }).then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: TYPES.RESETSHOPPINGLIST
                    })
                } else {
                    console.log('warrning');
                }
            },
            error => {
                console.log(error);
            }
        );
    })
};

export const setShoppingListInfo = (data) => (dispatch) => {
    dispatch({
        type: TYPES.SETSHOPPINGLISTINFO,
        shoppingListInfo: {
            name: data.name,
            idShoppingList: data._id,
            membersIds: data.members_id,
        } 
    })
};

export const getMembersIds = (idShoppingList) => async (dispatch) => {
    try{
    let members = await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${idShoppingList}/members`,
        method: "GET",
        headers: await setHeaders()
    });
    dispatch({
        type: TYPES.GETSHOPPINGLISTMEMBERSIDS,
        shoppingListInfo: {
            membersIds: members.data
        },
    })
    } catch (error){
        console.log(error);
    }
}

export const getMembersData = (membersIds) => async (dispatch) => {
    try{
    let membersArray = await Promise.all(membersIds.map(async memberId => (await axios({
        url: `http://192.168.0.38:8080/api/users/byId/${memberId}`,
        method: "GET",
        headers: await setHeaders()
    }).then(res => res.data))));
    dispatch({
        type: TYPES.GETSHOPPINGLISTMEMBERS,
        members: membersArray
    })
} catch (error) {
    console.log(error);
}
};

export const deleteMemberFromShoppingList = (memberId, shoppingListId) =>  async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${shoppingListId}/user/${memberId}`,
        method: 'PUT',
        headers: await setHeaders()
    }).then(res => {
        if (res.status === 200) {
            dispatch({
                type: TYPES.DELETESHOPPINGLISTMEMBER,
                    membersIds: res.data.members_id,
            })
        } else {
            console.log('warrning');
        }
    },
        error => {
            console.log(error);
        }
    );
};

export const addUserToList = (idShoppingList ,idUser) => async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${idShoppingList}/commonShoppingList/${idUser}`,
        method: 'PUT',
        headers: await setHeaders()
    }).then(res => {
        if (res.status === 200) {
            dispatch({
                type: TYPES.ADDSHOPPINGLISTMEMBER,
                membersIds: res.data.members_id,
                userAdded: true
            });
        } else {
            dispatch({
                type: TYPES.ADDSHOPPINGLISTMEMBER,
                userAdded: false
            });
        }
    },
        error => {
            console.log(error);
        }
    );
};


export const showUsersProposals = (e) => async (dispatch) => {
    if (e.length >= 3) {
        let usersList = await axios({
            url: `http://192.168.0.38:8080/api/users/names/${e.toLowerCase()}`,
            method: 'GET',
            headers: await setHeaders()
        });
        dispatch({
            type: TYPES.SHOWUSERSPROPOSAL,
            usersProposals: usersList.data
        });
    } else { 
    dispatch({
        type: TYPES.SHOWUSERSPROPOSAL,
        usersProposals: []
    }); }
};

export const deleteProduct = (idShoppingList, idProduct) => async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/shoppingLists/${idShoppingList}/product/${idProduct}`,
        method: "DELETE",
        headers: await setHeaders()
    }).then(res => {
        if (res.status === 200) {
            dispatch({
                type: TYPES.DELETEPRODUCTFROMSHOPPINGLIST,
                products: res.data.products,
                productDeleted: true
            })
          } else {
            dispatch({
                type: TYPES.DELETEPRODUCTFROMSHOPPINGLIST,
                productDeleted: false
            })
          }
        },
        error => {
          console.log(error);
        }
    );
};

export const resetUsersProposals = () => (dispatch) => {
    dispatch({
        type: TYPES.RESETUSERSPROPOSAL,
        usersProposals: []
    });
};

export const resetProductsProposals = () => (dispatch) => {
    dispatch({
        type: TYPES.RESETPRODUCTSPROPOSAL,
        productsProposals: []
    });
};