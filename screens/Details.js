import React from 'react'
import {SafeAreaView, StyleSheet, Platform, Image, Text, Button, View,
  FlatList,
    TouchableOpacity } from 'react-native'
import firebase from 'firebase'

//This component shows the details of a specific item from the list
export default class ShowDetails extends React.Component{
      state = { appname: '', username: '', password: ''}

      render() {

        const {navigation} = this.props;
        const {navigate} = this.props.navigation;

        const key = navigation.getParam('key','');
        const appname = navigation.getParam('appname','');
        const username = navigation.getParam('username','');
        const password = navigation.getParam('password','');
        console.log(username)

        return (

          <View style={styles.container}>

              <View style={{flexDirection: 'column', justifyContent: 'center', marginTop: 100}}>
                <Text style={styles.letters}>
                  App Name: {appname}
                </Text>
                <Text style={styles.letters}>
                  Username: {username}
                </Text>
                <Text style={styles.letters}>
                  Password: {password}
                </Text>
              </View>

                <View style={{justifyContent:'center', margin:30}}>
                  <Button onPress={() => {
                    const {currentUser} = firebase.auth();
                    var database = firebase.database();
                    database.ref(`userInfo/${currentUser.uid}/data/${key}`).remove(); //Deleting a specific item using the data key from firebase
                    this.props.navigation.navigate('PasswordList');
                    }
                  } title='Delete' color="#e93766"></Button>
                </View>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      letters: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      }

    });
