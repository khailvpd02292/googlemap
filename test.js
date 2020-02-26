import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class test extends Component {
    handlePress = async () => {
        fetch('https://facebook.github.io/react-native/movies.json')
          .then((response) => response.json())
          .then((responseJson) => {
       Alert.alert("The film at 2nd:  " + responseJson.movies[1].title);
          })
          .catch((error) => {
            console.error(error);
          });
      }
}

export default test
