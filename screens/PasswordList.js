import React from 'react'
import {SafeAreaView, StyleSheet, Platform, Image, Text, Button, View,
  FlatList,
    TouchableOpacity } from 'react-native'
import firebase from 'firebase';

//Scructure the data in an item component, to be shown as a list
function Item({ appname, username, password }) {
return (
  <View style={styles.item}>
    <Text style={styles.title}>{appname}</Text>
    <Text style={styles.title}>{username}</Text>
  </View>
);
}

//The class shows the list of password saved by the user
export default class PasswordList extends React.Component {
  state = {dataList: []}

handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  //The following code is to get the user specific data from the firebase real time database
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var database = firebase.database();
    console.log(database);

    var ref = database.ref(`userInfo/${currentUser.uid}/data`); //reference to the database
    ref.on('value', (snapshot) =>{
    var datas = snapshot.val();
    console.log(`data ${datas}`);

    if(datas){
        var keys = Object.keys(datas);
        console.log(`${keys.length} key length`);
        var items = []
        for(var i = 0; i<keys.length; i++){
            var k = keys[i];
            var appname = datas[k].appname;
            var username = datas[k].username;
            var password = datas[k].password;

            var item = {key: k, appname: appname, username: username, password: password};
            items.push(item);
        }
        this.setState({dataList: items});
        console.log(`${this.state.dataList} sdfakjsdhaf`);
      }else{
        this.setState({dataList: ''});
      }
    })
  }

render() {


return (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={this.state.dataList}
      renderItem={({ item }) => <View><TouchableOpacity onPress={() => this.props.navigation.navigate('ShowDetails', {key: item.key, appname: item.appname, username: item.username, password: item.password})}><Item id={item.id} appname={item.appname} username={item.username} password={item.password}/></TouchableOpacity></View>}
      keyExtractor={item => item.id}
    />

    <View style={{margin: 3}}>
      <Button title="Add Item" color="#e93766" onPress={() => this.props.navigation.navigate('AddItems')}/>
    </View>
    <View style={{margin: 3}}>
      <Button title="LogOut" color="#e93766" onPress={this.handleLogOut}/>
    </View>

  </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
