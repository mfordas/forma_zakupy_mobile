import { StyleSheet } from 'react-native';

const heartRightSideColor =  'rgb(233, 82, 18)';
const heartLeftSideColor = 'rgb(197, 60, 28)';
const humanColor = 'rgb(245, 239, 191)';
const leafRightSideColor = 'rgb(142, 193, 79)';
const leafLeftSideColor = 'rgb(119, 170, 49)';

// @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

const mainStyling = StyleSheet.create({

  zakupy: {
    fontSize: 20,
    marginTop: -120,
    marginRight: -150,
    alignSelf: 'center',
    fontFamily: 'Lovelo-Black',
  },
  
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
  logo: {
    width: 270,
    height: 300,
    marginTop: -120,
    resizeMode: 'center',
  },

  containerMenu: {
  alignSelf: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
},

  buttonMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    color: 'black',
    fontSize: 14,
    flex: 2,
    margin: 10,
    borderRadius: 20,
    maxWidth: 120,
  },

  buttonMenuText: {
    paddingVertical: 10,
    paddingHorizontal: 1,
    textAlign: 'center',
    fontFamily: 'Lovelo-Black',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    color: 'black',
    fontSize: 14,
    margin: 10,
    borderRadius: 20,
  },

  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: 'Lovelo-Black',
  },

  container: {
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
},

input: {
  width: 150,
  borderStyle: 'solid',
  borderBottomColor: 'black',
  borderBottomWidth: 2,
  textAlign: 'center',
  fontFamily: "Lovelo-Black",
  alignSelf: 'center',
  paddingVertical: 0,
},

registerCard: {
  maxWidth: 270,
  marginVertical: 20,
  backgroundColor: leafRightSideColor,
  borderStyle: 'solid',
  borderColor: 'black',
  borderWidth: 2,
  alignSelf: 'center',
  flexDirection: 'column',
},

buttonRegisterCard: {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'black',
  color: 'black',
  fontSize: 14,
  flex: 2,
  margin: 10,
  borderRadius: 20,
  maxWidth: 120,
  backgroundColor: 'white',
},

p: {
  fontSize: 16,
  margin: 10,
  alignItems: 'center',
  fontFamily: "Lovelo-Black",
},

errorMessage: {
  fontSize: 10,
  color: 'red',
  fontFamily: "Lovelo-Black",
  textAlign: 'center',
},

containerShoppingList: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},

containerShoppingLists: {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
},

progressBar: {
  backgroundColor: 'white',
  borderRadius: 20,
  fontFamily: "Lovelo-Black",
  textAlign: 'center',
  fontSize: 14,
  color: 'black',
  width: 100,
},

progressBarContainer: {
  backgroundColor: 'white',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'black',
  padding: 0,
  margin: 0,
  borderRadius: 20,
  width: 100,
},

containerProduct: {
  width: 80,
  justifyContent: 'center',
  alignItems: 'center',
},

productName: {
  flex: 3,
  justifyContent: "flex-start",
},

productNumber: {
  flex: 1,

  
},

productNumberP: {
  textAlign: 'auto',
},

containerAddShoppingList: {
  alignItems: 'center',
},

containerAddShoppingListInput: {
  backgroundColor: 'white',
},

horizontalFormContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
},

productsProposalText: {
  fontSize: 12,
  fontFamily: 'Lovelo-Black',
  margin: 10,
  alignItems: 'center',
}

})

export default mainStyling;
