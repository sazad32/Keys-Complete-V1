import React, { Component } from "react";
import firebase from 'firebase';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity  } from 'react-native'
import Loading from './Loading'
import styles from './style'


//The code template has been taken from https://medium.com/@eng.sohaddader/start-with-react-native-firebase-authentication-and-realtime-database-services-466359d577c6


export default class Login extends Component {
  state = { email: '', password: '', errorMessage: null, loading: false}

 handleLogin = () => {

   this.setState({errorMessage: null, loading: true});
   //Code for authenticating users in using Firebase Authentication
   firebase
     .auth()
     .signInWithEmailAndPassword(this.state.email, this.state.password)
     .then(() => this.setState({email: '', password: '', loading: false}))
     .then(() => this.props.navigation.navigate('PasswordList'))
     .catch(error => this.setState({ errorMessage: error.message, loading: false }))
 }


 renderButton(){
   //Spinner option while Firebase is authenticating the user in
   if(this.state.loading){
     return <Loading size='small' />;
   }
   return <Button title="Login" color="#e93766" onPress={this.handleLogin.bind(this)}/>;

 }

  render() {
      return (
      <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View>
          {this.renderButton()}
        </View>
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}
