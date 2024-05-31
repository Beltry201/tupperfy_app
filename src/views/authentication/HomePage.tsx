import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Generar datos aleatorios
const generateRandomItems = (numItems) => {
  const items = [];
  const peopleNames = ["José", "María", "Pedro", "Lucía", "Carlos", "Ana", "Miguel", "Laura", "José", "Elena"];
  const dishNames = ["Arepas", "Paella", "Sushi", "Pizza", "Hamburguesa", "Ensalada", "Pasta", "Ramen", "Ceviche", "Empanadas"];
  
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

const HomePage = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const navigation = useNavigation();

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
    navigation.navigate(buttonName);
  };

  const handleItemPress = (item) => {
    navigation.navigate('DishDetails', { item });
  };

  const handleSeeMorePress = (category) => {
    navigation.navigate('CategoryDetails', { category });
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
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('CartView')}>
         <Text style={styles.profileButtonText}>Carrito</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>¡Bienvenido a Tupperfy!</Text>
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="¿Qué se te antoja hoy?"
          placeholderTextColor="#666"
        />
      </View>
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
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Los más populares</Text>
        <TouchableOpacity onPress={() => handleSeeMorePress('Los más populares')}>
          <Text style={styles.seeMoreButton}>Ver más</Text>
        </TouchableOpacity>
      </View>
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

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Los más buscados</Text>
        <TouchableOpacity onPress={() => handleSeeMorePress('Los más buscados')}>
          <Text style={styles.seeMoreButton}>Ver más</Text>
        </TouchableOpacity>
      </View>
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

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Los más cercanos</Text>
        <TouchableOpacity onPress={() => handleSeeMorePress('Los más cercanos')}>
          <Text style={styles.seeMoreButton}>Ver más</Text>
        </TouchableOpacity>
      </View>
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

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Los más nuevos</Text>
        <TouchableOpacity onPress={() => handleSeeMorePress('Los más nuevos')}>
          <Text style={styles.seeMoreButton}>Ver más</Text>
        </TouchableOpacity>
      </View>
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

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Otros gustos</Text>
        <TouchableOpacity onPress={() => handleSeeMorePress('Otros gustos')}>
          <Text style={styles.seeMoreButton}>Ver más</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 10, // Reducido
    paddingBottom: 10, // Añadido para más consistencia
  },
  title: {
    fontSize: 24,
    marginVertical: 10, // Reducido
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15, // Reducido
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    width: 320,
  },
  subtitle: {
    fontSize: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18, // Reducido
    marginHorizontal: 20,
  },
  seeMoreButton: {
    color: '#007BFF',
    fontSize: 14,
    marginLeft: 10, // Añadir margen para separar el botón del subtítulo
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
  addressSearchBox: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  cartButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  buttonContainer: {
    marginTop: 10, // Reducido
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
    marginHorizontal: 3, // Reducido
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
