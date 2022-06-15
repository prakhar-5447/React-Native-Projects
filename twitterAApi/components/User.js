import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';

const User = ({route}) => {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

  const get_data = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd8a45534c1mshd7a265de9d84244p1379d4jsn2abfdf8e82c3',
        'X-RapidAPI-Host': 'twitter154.p.rapidapi.com',
      },
    };

    fetch(
      `https://twitter154.p.rapidapi.com/user/details?username=${route.params.id}`,
      options,
    )
      .then(response => response.json())
      .then(response => {
        setUser(response);
        setShow(true);
      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    get_data();
  }, []);

  return (
    show && (
      <View
        style={[
          {
            backgroundColor: 'white',
            padding: 15,
          },
        ]}>
        <View
          style={[
            {
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 20,
            },
          ]}>
          <Image
            style={[
              {width: 50, height: 50, borderRadius: 100, marginRight: 15},
            ]}
            source={{uri: user.profile_pic_url}}
          />
          <View style={[[{}]]}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 30,
                  fontWeight: 'bold',
                },
              ]}>
              {user.name}
            </Text>
            <Text
              onPress={() => {
                Linking.openURL(`https://twitter.com/${user.username}`);
              }}
              style={[
                styles.text,
                {
                  fontSize: 13,
                  color: 'blue',
                },
              ]}>
              @{user.username}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.text,
            {
              backgroundColor: 'whitesmoke',
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 15,
            },
          ]}>
          {user.description}
        </Text>
        <Text style={[styles.text, {marginTop: 15, textAlign: 'right'}]}>
          Followers :- {user.follower_count}
        </Text>
        <Text style={[styles.text, {marginTop: 15, textAlign: 'right'}]}>
          No. of tweets :- {user.number_of_tweets}
        </Text>
      </View>
    )
  );
};

export default User;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
});
