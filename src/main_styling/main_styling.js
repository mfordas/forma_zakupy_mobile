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
  margin: 10,
  alignItems: 'center',
  fontFamily: "Lovelo-Black",
}

// body,
// html,
// #root {
//   box-sizing: border-box;
//   margin: 0;
//   padding: 0;
//   background-color: white;
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   align-items: center;
//   flex-direction: column;
//   min-width: 100vw;
//   min-height: 100vh;
//   font-family: "lovelo";
// }

// a,
// link {
//   text-decoration: none;
// }

// * {
//   box-sizing: inherit;
// }





// form {
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   width: 60%;
//   align-self: center;
//   align-items: center;
// }









// .button:hover {
//   border: 2px solid white;
// }




// .buttonMenu.active {
//   border-radius: 0;
//   border: 2px solid white;
//   border-bottom: 2px solid black;
// }

// .buttonMenu:hover {
//   border: 2px solid white;
// }

// .button-container {
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   margin-bottom: 7px;
//   p{
//     margin: auto;
   
//     max-width: 50px;
//     font-size: xx-small;
//   }
// }

// .errorMessage {
//   font-size: 0.7rem;
//   color: red;
// }

// .container-shoppingList {
//   max-width: 100vw;
//   max-height: 100vh;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .container-shoppingLists,
// .container-products {
//   max-width: 100vw;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// }

// .container-product {
//   width: 80%;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .product-name {
//   flex: 3;
//   justify-content: start;
// }
// .product-number {
//   flex: 1;
//   justify-self: center;

//   .p{
//     text-justify: auto;
//   }
// }

// .container-add-shoppingList {
//   width: auto;
//   max-width: 75vw;
//   max-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding-bottom: .2rem;

//   input {
//     background-color: white;
//   }
// }

// .progress-bar {
//   background-color: white;
//   border-radius: 20px;
//   box-sizing: border-box;
//   transition: 0.7s ease-in-out;
//   font-family: "lovelo";
//   text-align: center;
//   font-size: 14px;
//   color: black;
//   width: 100%;
// }
// .progress-bar-container {
//   background-color: white;
//   border: 2px solid black;
//   padding: 0px;
//   margin: 0px;
//   border-radius: 20px;
//   box-sizing: border-box;
//   transition: 0.3s ease-in-out;
//   width: 100%;
// }

// input::-webkit-calendar-picker-indicator {
//   display: none;
// }

// .horizontalFormContainer {
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
// }


})

export default mainStyling;
