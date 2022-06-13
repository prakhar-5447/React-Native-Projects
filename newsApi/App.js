/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';

const App = () => {
  const [news, setNews] = useState([]);

  const get_data = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd8a45534c1mshd7a265de9d84244p1379d4jsn2abfdf8e82c3',
        'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
      },
    };

    fetch('https://free-news.p.rapidapi.com/v1/search?q=all&lang=en', options)
      .then(response => response.json())
      .then(response => {
        setNews(response.articles);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <ScrollView>
      {news &&
        news.map((e, i) => (
          <View
            key={i}
            style={[
              {
                backgroundColor: 'whitesmoke',
                margin: 10,
                borderWidth: 1,
                borderRadius: 20,
                padding: 15,
              },
            ]}>
            <Image
              style={[{width: '100%', height: 200}]}
              source={{uri: e.media}}
            />
            <Text
              style={[
                styles.text,
                {
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 5,
                  textDecorationLine: 'underline',
                },
              ]}
              onPress={() => {
                Linking.openURL(e.link);
              }}>
              {e.title}
            </Text>
            <Text style={[styles.text]}>{e.summary}</Text>
            <Text style={[styles.text, {marginTop: 10, textAlign: 'right'}]}>
              - {e.authors}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
});

export default App;
