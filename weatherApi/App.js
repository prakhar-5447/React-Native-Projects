/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';

const App = () => {
  const [place, setPlace] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [location, setLocation] = useState([]);
  const [result, setResult] = useState(false);

  const get_data = e => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd8a45534c1mshd7a265de9d84244p1379d4jsn2abfdf8e82c3',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    };

    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&offset=0&namePrefix=${e}`,
      options,
    )
      .then(response => response.json())
      .then(response => {
        setFilteredData(response.data);
      })
      .catch(err => console.error(err));
  };
  const get_weather = dest => {
    Keyboard.dismiss();
    setMenuVisible(false);
    setPlace('');
    setFilteredData([]);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd8a45534c1mshd7a265de9d84244p1379d4jsn2abfdf8e82c3',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      },
    };

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/find?q=${dest}&cnt=5&type=link%2C%20accurate&units=imperial%2C%20metric`,
      options,
    )
      .then(response => response.json())
      .then(response => {
        if (response.list.length > 0) {
          setLocation(response.list);
          setResult(true);
        } else {
          setResult(false);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <View
      style={[
        {
          padding: 20,
          height: '100%',
          alignItems: 'center',
        },
      ]}>
      <View style={[{width: '100%'}]}>
        {/* <TextInput onChange={(text)=>{get_data(text)}}></TextInput> */}
        <TextInput
          onFocus={() => {
            setMenuVisible(true);
            setLocation([]);
          }}
          value={place}
          onBlur={() => setMenuVisible(false)}
          onChangeText={text => {
            setPlace(text.toLowerCase());
            get_data(place);
          }}
          style={[
            {
              padding: 10,
              width: '100%',
              borderColor: 'black',
              borderWidth: 1,
            },
          ]}></TextInput>
        {menuVisible && filteredData && (
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              flexDirection: 'column',
              borderColor: 'grey',
              width: '100%',
              position: 'absolute',
              top: 48,
            }}>
            {filteredData.map((e, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  get_weather(e.city);
                }}>
                <View
                  style={[
                    {
                      width: '100%',
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      borderTopWidth: 0.5,
                      borderBottomWidth: 0.5,
                      borderColor: 'grey',
                    },
                  ]}>
                  <Text>{e.city}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      {result ? (
        <ScrollView
          style={[
            {
              marginTop: 20,
              flexDirection: 'row',
            },
          ]}>
          {!menuVisible &&
            location.map((e, i) => (
              <View
                key={i}
                style={[
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey',
                    width: 200,
                    height: 200,
                    margin: 10,
                    borderRadius: 20,
                  },
                ]}>
                <Text style={[styles.text]}>{e.name}</Text>
                <Text style={[styles.text]}>Weather : {e.weather[0].main}</Text>
                <Text style={[styles.text]}>
                  Temp : {Math.round(e.main.temp - 273.15)}&deg;C
                </Text>
              </View>
            ))}
        </ScrollView>
      ) : (
        <View
          style={[
            {
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text>Nothing to display</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default App;
