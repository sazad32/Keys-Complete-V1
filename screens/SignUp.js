import React, { Component } from "react";
import firebase from 'firebase';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity  } from 'react-native'
import Loading from './Loading'
import styles from './style'

//This component is used to sign a user up in firebase
export default class signUp extends Component {
  state = { email: '', password: '', errorMessage: null, loading: false}
  handleSignUp = () => {
    this.setState({errorMessage: null, loading: true});
    //Code for Signing a new user in using Firebase Authentication
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.setState({email: '', password: '', loading: false}))
      .then(() => this.props.navigation.navigate('PasswordList'))
      .catch(error => this.setState({ email: '', password: '', errorMessage: error.message }))
  }

  renderButton(){
    if(this.state.loading){
      return <Loading size='small' />;
    }
    return <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp}/>;

  }

render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View>
          {this.renderButton()}
        </View>
        <View>
        <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{color:'#e93766', fontSize: 18}}> Login </Text></Text>
        </View>
      </View>
    )
  }
}
