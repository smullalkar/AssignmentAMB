import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';

const mockData = [
  {
    "id": 1,
    "title": "Milk",
  },
  {
    "id": 2,
    "title": "Bread",
  },
  {
    "id": 3,
    "title": "Coffee",
  },
  {
    "id": 4,
    "title": "Oranges",
  },
]

const App = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setfilteredData] = useState(mockData);
  const [masterDataSource, setMasterDataSource] = useState(mockData);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setSearch(text);
    } else {
      setfilteredData(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View style={styles.separator} />
    );
  };

  const getItem = (item) => {
    alert('You clicked on List Item');
  };

  const generateText = () => {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

  const onPress = () => {
    let randomString = generateText()
    let id = masterDataSource.length + 1
    let newItem = {
      id: id,
      title: randomString
    }
    const newData = [...masterDataSource, newItem];
    setMasterDataSource(newData);
    setfilteredData(newData);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Search Here"
            />
          </View>
          <View style={{ flex: 0.2, margin: 10 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={onPress}
            >
              <Text style={styles.add}>Add++</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 70
  },
  itemStyle: {
    padding: 15,
    fontSize: 18,
    width: 200,
    paddingLeft: 20,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: 'black',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 10,
    width: '100%'
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  header: {
    flexDirection: 'row'
  },
  add: {
    height: 15
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 11,
    borderRadius: 5
  },
  add: {
    fontSize: 13,
    color: 'white'
  }
});

export default App;