import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

// Generar datos aleatorios
const generateRandomItems = (numItems) => {
  const items = [];
  const peopleNames = ["Messi", "María", "Pedro", "Lucía", "Carlos", "Ana", "Miguel", "Laura", "José", "Elena"];
  const dishNames = ["Tacos", "Paella", "Sushi", "Pizza", "Hamburguesa", "Ensalada", "Pasta", "Ramen", "Ceviche", "Empanadas"];
  
  for (let i = 0; i < numItems; i++) {
    const randomPerson = peopleNames[Math.floor(Math.random() * peopleNames.length)];
    const randomDish = dishNames[Math.floor(Math.random() * dishNames.length)];
    const randomPrice = (Math.random() * 100).toFixed(2);
    items.push({ person: randomPerson, dish: randomDish, price: `$${randomPrice}` });
  }
  
  return items;
};

const popularItems = generateRandomItems(5);
const mostSearchedItems = generateRandomItems(5);
const nearestItems = generateRandomItems(5);
const newestItems = generateRandomItems(5);
const otherTasteItems = generateRandomItems(5);

const HomePage = ({ navigation }: { navigation: any }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
    navigation.navigate(buttonName);
  };


  const handleItemPress = (item) => {
    // Aquí puedes navegar a la pantalla deseada, pasando el ítem como parámetro si es necesario
    // navigation.navigate('NombreDeLaPantalla', { item });
    navigation.navigate('DishDetails', { item });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('UserProfile')}>
          <Text style={styles.profileButtonText}>Perfil</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.addressSearchBox}
          placeholder="Buscar dirección..."
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.searchBox}
          placeholder="Buscar..."
          placeholderTextColor="#666"
        />
      </View>
      <Text style={styles.title}>Bienvenido a la Home Page</Text>
      <View style={styles.buttonContainer}>
        <ScrollView horizontal={true} contentContainerStyle={styles.horizontalButtonContainer}>
          <TouchableOpacity 
            style={[styles.button, selectedButton === 'Comidas' && styles.selectedButton]} 
            onPress={() => handleButtonPress('Comidas')}>
            <Text style={[styles.buttonText, selectedButton === 'Comidas' && styles.selectedButtonText]}>Comidas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, selectedButton === 'ComidasVeganas' && styles.selectedButton]} 
            onPress={() => handleButtonPress('ComidasVeganas')}>
            <Text style={[styles.buttonText, selectedButton === 'ComidasVeganas' && styles.selectedButtonText]}>Comidas Veganas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, selectedButton === 'Bebidas' && styles.selectedButton]} 
            onPress={() => handleButtonPress('Bebidas')}>
            <Text style={[styles.buttonText, selectedButton === 'Bebidas' && styles.selectedButtonText]}>Bebidas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, selectedButton === 'Postres' && styles.selectedButton]} 
            onPress={() => handleButtonPress('Postres')}>
            <Text style={[styles.buttonText, selectedButton === 'Postres' && styles.selectedButtonText]}>Postres</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, selectedButton === 'Otros' && styles.selectedButton]} 
            onPress={() => handleButtonPress('Otros')}>
            <Text style={[styles.buttonText, selectedButton === 'Otros' && styles.selectedButtonText]}>Otros</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Text style={styles.subtitle}>Los más populares</Text>
      <ScrollView horizontal={true} style={styles.popularItemsContainer}>
        {popularItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.popularItem} onPress={() => handleItemPress(item)}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemText}>{item.price}</Text>
              <Text style={styles.itemText}>{item.dish}</Text>
              <Text style={styles.itemText}>{item.person}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Los más buscados</Text>
      <ScrollView horizontal={true} style={styles.popularItemsContainer}>
        {mostSearchedItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.popularItem} onPress={() => handleItemPress(item)}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemText}>{item.price}</Text>
              <Text style={styles.itemText}>{item.dish}</Text>
              <Text style={styles.itemText}>{item.person}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Los más cercanos</Text>
      <ScrollView horizontal={true} style={styles.popularItemsContainer}>
        {nearestItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.popularItem} onPress={() => handleItemPress(item)}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemText}>{item.price}</Text>
              <Text style={styles.itemText}>{item.dish}</Text>
              <Text style={styles.itemText}>{item.person}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Los más nuevos</Text>
      <ScrollView horizontal={true} style={styles.popularItemsContainer}>
        {newestItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.popularItem} onPress={() => handleItemPress(item)}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemText}>{item.price}</Text>
              <Text style={styles.itemText}>{item.dish}</Text>
              <Text style={styles.itemText}>{item.person}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Otros gustos</Text>
      <ScrollView horizontal={true} style={styles.popularItemsContainer}>
        {otherTasteItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.popularItem} onPress={() => handleItemPress(item)}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemText}>{item.price}</Text>
              <Text style={styles.itemText}>{item.dish}</Text>
              <Text style={styles.itemText}>{item.person}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'left',
    marginLeft: 20,
  },
  profileButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  profileButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: 150,
  },
  addressSearchBox: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  selectedButton: {
    backgroundColor: '#0056b3', // Cambiar el color de fondo para el botón seleccionado
  },
  selectedButtonText: {
    fontWeight: 'bold', // Cambiar el peso del texto para el botón seleccionado
  },
  popularItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  popularItem: {
    width: 100,
    height: 100,
    backgroundColor: '#007BFF',
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  itemInfo: {
    backgroundColor: '#D3D3D3', // Gris claro
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 2,
  },
  itemText: {
    color: '#000', // Negro
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomePage;
