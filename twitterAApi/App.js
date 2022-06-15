/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import User from './components/User';
import {useState} from 'react';

function HomeScreen({navigation}) {
  const [user, setUser] = useState('');
  const [result, setResult] = useState(false);
  const [tweets, setTweets] = useState([]);

  const get_data = e => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd8a45534c1mshd7a265de9d84244p1379d4jsn2abfdf8e82c3',
        'X-RapidAPI-Host': 'twitter154.p.rapidapi.com',
      },
    };

    fetch(
      `https://twitter154.p.rapidapi.com/user/tweets?username=${e}&limit=40`,
      options,
    )
      .then(response => response.json())
      .then(response => {
        Keyboard.dismiss();
        setUser('');
        if (response.length > 0) {
          setTweets(response);
          setResult(true);
        } else {
          setResult(false);
          alert('check username');
        }
      })
      .catch(err => console.error(err));
  };
  return (
    <View style={[{justifyContent: 'center'}]}>
      <View
        style={[
          {
            marginVertical: 30,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <TextInput
          placeholder="Username"
          value={user}
          onChangeText={text => {
            setUser(text.trim());
          }}
          style={[
            {
              width: '70%',
              borderColor: 'black',
              borderWidth: 1,
              paddingHorizontal: 10,
            },
          ]}></TextInput>
        <TouchableOpacity
          disabled={user === ''}
          style={[
            {
              backgroundColor: 'lightblue',
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 10,
            },
          ]}
          onPress={() => {
            get_data(user);
          }}>
          <Text style={[{fontWeight: 'bold'}]}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={[{marginBottom: 100}]}>
        {result ? (
          tweets.map((e, i) => (
            <View
              key={i}
              style={[
                {
                  backgroundColor: 'white',
                  margin: 10,
                  borderWidth: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                },
              ]}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  },
                ]}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 25,
                      fontWeight: 'bold',
                      marginBottom: 5,
                    },
                  ]}>
                  {e.user.username}
                </Text>
                <Button
                  title="about owner"
                  onPress={() => {
                    navigation.navigate('user', {id: e.user.username});
                  }}
                  style={[styles.text, {textAlign: 'right', color: 'blue'}]}
                />
              </View>
              <Text style={[styles.text]}>{e.text}</Text>
              <Text style={[styles.text, {marginTop: 15, textAlign: 'right'}]}>
                - {e.creation_date}
              </Text>
            </View>
          ))
        ) : (
          <View style={[{justifyContent: 'center', alignItems: 'center'}]}>
            <Text>Nothing to display</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="user" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
});

export default App;
