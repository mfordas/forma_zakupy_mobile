import { StyleSheet } from 'react-native';

const heartRightSideColor =  'rgb(233, 82, 18)';
const heartLeftSideColor = 'rgb(197, 60, 28)';
const humanColor = 'rgb(245, 239, 191)';
const leafRightSideColor = 'rgb(142, 193, 79)';
const leafLeftSideColor = 'rgb(119, 170, 49)';

// @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
// @font-face {
//   font-family: "lovelo";
//   src: url("../fonts/Lovelo-Black.eot");
//   src: url("../fonts/Lovelo-Black.otf");
//   src: url("../fonts/Lovelo-Black.ttf");
// }


const mainStyling = StyleSheet.create({

  zakupy: {
    fontSize: 20,
    marginTop: -120,
    marginRight: -170,
    alignSelf: 'center',
  },
  
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logo: {
    width: 300,
    height: 300,
    marginTop: -120,
    resizeMode: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },

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

// .container {
//   max-width: 100vw;
//   max-height: 100vh;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }

// .registerCard {
//   max-width: 20vw;
//   margin: auto;
//   background-color: $leaf-right-side-color;
//   border: 2px solid black;
//   align-self: center;
//   display: flex;
//   flex-direction: column;
// }

// form {
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   width: 60%;
//   align-self: center;
//   align-items: center;
// }



// input {
//   border: none;
//   background-color: $leaf-right-side-color;
//   border-bottom: 2px solid black;
//   text-align: center;
//   font-family: "Lovelo";
// }

// p {
//   margin: 10px;
//   display:flex;
//   align-items: center;
// }

// .button {
//   background-color: white;
//   border: 2px solid black;
//   padding: 10px;
//   margin: 10px;
//   border-radius: 20px;
//   box-sizing: border-box;
//   font-family: "lovelo";
//   text-align: center;
//   font-size: 14px;
//   color: black;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .button:hover {
//   border: 2px solid white;
// }

// .containerMenu {
//   min-width: 20vw;
//   max-width: 70vw;
//   align-self: center;
//   display: flex;
//   justify-content: center;
// }

// .buttonMenu {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   border: 2px solid black;
//   color: black;
//   background-color: white;
//   box-sizing: border-box;
//   font-family: "lovelo";
//   text-decoration: none;
//   font-size: 14px;
//   flex: 2;
//   padding: 10px;
//   margin: 10px;
//   border-radius: 20px;
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
