import React, {Component} from 'react';
import { View, Text} from 'react-native';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import SignUpScreen from './screens/SignUp'
import LogInScreen from './screens/LogIn'
import PasswordListScreen from './screens/PasswordList'
import ShowDetailsScreen from './screens/Details'
import AddItemScreen from './screens/AddItemScreen'

class App extends Component{
  //Activate Firebase here
  componentDidMount(){
    firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    });
  }
  render(){
    return(
        <AppContainer />
      )
  }
}

//The screens and the navigation tree
const AppStackNavigator = createStackNavigator({
    Login: LogInScreen,
    SignUp: SignUpScreen,
    PasswordList: PasswordListScreen,
    ShowDetails: ShowDetailsScreen,
    AddItems: AddItemScreen
})

const AppContainer = createAppContainer(AppStackNavigator);

export default App;
