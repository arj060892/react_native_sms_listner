/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Button,PermissionsAndroid} from 'react-native';
import SmsAndroid  from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const instructions = Platform.select({
  ios: 'auto reads OTP',
  android:
    'auto reads OTP',
});

var filter = {
  box: 'inbox',
  address:'+919886326694',
  indexFrom: 0,
    maxCount: 10
};


type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    this.smsListner();
}
componentWillUnmount() {
  this.SMSReadSubscription.remove();
}
  constructor(props) {
    super(props);
    this.reqSmsPerm();
    this.SMSReadSubscription = {};
    this.state = {
      otp:'XXXX',
      output:'Blank'
    }

  }
  
  btnClick =()=>{
      alert(this.state.otp);
    }
    otpEntered=(val)=>{
      this.state.otp=val;      
    }
    bindSMS=()=>{
      SmsAndroid.list(JSON.stringify(filter), (fail) => {
        console.log("Failed with this error: " + fail)
    },
    (count, smsList) => {
        var arr = JSON.parse(smsList);
        arr.forEach(function(object){
          smsOpt = object.body;
          return;
        })
        this.state.output =dt;
        this.setState({ otp: smsOpt })
        alert(smsOpt);
    });
    }

  smsListner() {
    alert('Calling Listner');
    this.SMSReadSubscription = SmsListener.addListener(message => {
      var smsFrom ='';
      smsFrom =message.originatingAddress;
      if (smsFrom.includes('BOISMS')) {
        this.setState({otp:message.body});    
      }
      console.info(message);
    });
  }
      async reqSmsPerm(){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            'title': 'SMS Permission',
            'message': 'So we can read OTP.'
          }
        )
        const smsG = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          {
            'title': 'SMS Permission Recive',
            'message': 'So we can read OTP.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("SMS UP")
        } else {
          console.log("SMS Down")
        }
      } catch (err) {
        console.warn(err)
      }
    }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to My App</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{this.state.output}</Text>
        <TextInput style = {styles.input}
               maxLength={4}
               underlineColorAndroid = "transparent"
               placeholder = "OTP"  
               onChangeText={(text) => this.otpEntered(text)}
               placeholderTextColor = "#9a73ef"
               value ={this.state.otp}
               autoCapitalize = "none"/>
               <Button
  onPress={this.bindSMS}
  title="Submit OTP"
  color="#841584"
  accessibilityLabel="OTP Submit"
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
