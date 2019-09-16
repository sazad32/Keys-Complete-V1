import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';
import firebase from 'firebase';
import styles from './style'



function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class AddItemScreen extends Component{
  state={appname: '', username: '', password: '', dataList: [], currentUser: ''}

  //Adding data to the firebase database
  addButtonPressed(){
    console.log('add button pressed');
    const {currentUser} = firebase.auth();
    var database = firebase.database();
    if(this.state.appname !== '' || this.state.username !== ''|| this.state.password !== ''){
      var ref = database.ref(`userInfo/${currentUser.uid}/data`).push(
        {appname: this.state.appname, username: this.state.username, password: this.state.password}
      ).then(() => this.setState({appname: '', username: '', password: ''}))
      .then(() => this.props.navigation.navigate('PasswordList'));
    }

  }


  render(){
    return (
      <View style={styles.container}>
      <Text>{this.state.currentUser}</Text>
      <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Appname"
          onChangeText={appname => this.setState({ appname })}
          value={this.state.appname}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="AddButton" color="red" onPress={this.addButtonPressed.bind(this)}/>
      </View>
    );
  }

}
