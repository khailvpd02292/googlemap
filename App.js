import React, { Fragment, Component } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    }
  }

  componentDidMount(){
    this.handlePress();
  }
  handlePress = async () => {
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJsonss) => {
              console.log(' responseJsonss.movies[1].title'+ JSON.stringify(responseJsonss.movies))
        //  Alert.alert("The film at 2nd:  " + responseJsonss.title);
        
        this.setState({
          arr: responseJsonss.movies
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <Fragment>

        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <TouchableOpacity onPress={this.handlePress.bind(this)}>
                <Text style={{ paddingTop: 50, paddingLeft: 50, color: '#FF0000' }}> View film at 2nd </Text>
              </TouchableOpacity>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Please read some guides</Text>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                  </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                  </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>

    );
  }
}


const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: Colors.lighter,

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});