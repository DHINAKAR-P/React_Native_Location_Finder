

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { AppRegistry, Button, Image } from 'react-native';
import { DhinakarComponent } from './DhinakarComponent'
import Geocoder from 'react-native-geocoder';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'Dhinaa',
      latitude: null,
      longitude: null,
      refreshing: false,
      error: null,
      api_key: "AIzaSyDVV_YAdeSp6KDfnZLH0s73dHwdaC1o0C0",
      formatted_address: "Yet to find the ADDRESS"
    };
  }

  onRefresh = () => {
    //Clear old data of the list 
    this.setState({
      refreshing: true,
    });
    //Call the Service to get the latest data
    this.findtheLocation();
  }

  findtheLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.getAddressViaGeoCoder();

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }


  getAddressViaGeoCoder = () => {
    Geocoder.fallbackToGoogle("AIzaSyDVV_YAdeSp6KDfnZLH0s73dHwdaC1o0C0");
    console.log("this.state.latitude, this.state.longitude -- ", this.state.latitude, this.state.longitude)
    // use the lib as usual
    let data = { lat: this.state.latitude, lng: this.state.longitude }
    Geocoder.geocodePosition(data).then(res => {
      // alert(res[0].formattedAddress);
      this.setState({
        formatted_address: res[0].formattedAddress,
        refreshing: false
      })
    })
      .catch(error => alert(error));
  }
  componentDidMount() {
    this.findtheLocation();
  }

  render() {
    let pic = {
      uri: 'https://img12.androidappsapk.co/300/2/a/2/zeal.place.png'
    };

    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 2, paddingTop: 50 }}>
          <ActivityIndicator />
          <Text style={styles.welcome}> LOADING PLZ WAIT A WHILE...</Text>
          <Image source={pic} style={{ width: 400, height: 350 }} />
        </View>
      );
    }
    if (!this.state.refreshing) {
      return (


        <View style={styles.container}>

          <Text >Welcome Buddy</Text>
          {/* <Text >{this.state.user}</Text> */}
          <View >
            <DhinakarComponent name='Dhinaa' />
          </View>

          <Text> latitude - {this.state.latitude} </Text>
          <Text> longitude -  {this.state.longitude} </Text>
          <Image source={pic} style={{ width: 400, height: 350 }} />
          <View>
            <Text style={styles.welcome}>
              {this.state.formatted_address}
            </Text>
          </View>
          {this.state.latitude != null &&
            <View style={{ height: 70, width: 200 }} >
              <Button
                onPress={this.onRefresh}
                title="Locate Now"
                color="#841584"
              />
            </View>
          }
        </View>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    color: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    padding: 50,
    color: '#c166d6',

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

/*
,container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
  */