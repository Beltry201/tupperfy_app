import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Generar datos aleatorios
const generateRandomItems = (numItems: number, categoryId: string) => {
  const items = [];
  const peopleNames = ["José", "María", "Pedro", "Lucía", "Carlos", "Ana", "Miguel", "Laura", "José", "Elena"];
  const dishNames = ["Arepas", "Paella", "Sushi", "Pizza", "Hamburguesa", "Ensalada", "Pasta", "Ramen", "Ceviche", "Empanadas"];

  for (let i = 0; i < numItems; i++) {
    const randomPerson = peopleNames[Math.floor(Math.random() * peopleNames.length)];
    const randomDish = dishNames[Math.floor(Math.random() * dishNames.length)];
    const randomPrice = (Math.random() * 100).toFixed(2);
    const randomId = Math.floor(Math.random() * 1000).toString();
    items.push({ id: randomId, person: randomPerson, dish: randomDish, price: `$${randomPrice}`, categoryId });
  }

  return items;
};

const popularItems = generateRandomItems(5, "POP123");
const mostSearchedItems = generateRandomItems(5, "BUS456");
const nearestItems = generateRandomItems(5, "NEA789");
const newestItems = generateRandomItems(5, "NEW012");
const otherTasteItems = generateRandomItems(5, "TAS345");

const HomePage = ({ navigation }: { navigation: any }) => {
  const [selectedButton, setSelectedButton] = useState('') as [String, Function];
  

  const handleCategoryCardPress = (buttonName: String) => {
    setSelectedButton(buttonName);
  };

  const handleItemPress = (item: any) => {
    navigation.navigate("DishDetails", { item });
  };

  const searchInputRef = useRef<TextInput | null>(null);

  const handleSearchIconPress = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const getCategoryItems = (categoryId: string) => {
    const categoryItems: { [key: string]: any[] } = {
      "POP123": popularItems,
      "BUS456": mostSearchedItems,
      "NEA789": newestItems,
      "NEW012": newestItems,
      "TAS345": otherTasteItems,
    };

    return categoryItems[categoryId];
  };

  const handleSeeMorePress = (category: any) => {};

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('UserProfile')}>
            <Text>
              <Icon name="user" size={35} color="black" />
            </Text>
          </TouchableOpacity>
          <View style={styles.addressSearchContainer}>
            <View style={styles.addressSearchBox}>
              <TouchableOpacity style={styles.addressSearchIconWrapper} onPress={() => console.log('Location icon pressed')}>
                <Icon name="map-marker" size={23} color="red" />
              </TouchableOpacity>
              <TextInput
                ref={searchInputRef}
                style={styles.addressSearchInput}
                placeholder="Agrega una dirección"
                placeholderTextColor="#666"
              />
            </View>
          </View>
        </View>
        <Text style={styles.title}>¡Bienvenido a Tupperfy!</Text>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBoxWrapper}>
            <TextInput
              ref={searchInputRef}
              style={styles.searchBox}
              placeholder="¿Qué se te antoja hoy?"
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={styles.searchIconWrapper}
              onPress={handleSearchIconPress}>
              <Icon name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ScrollView horizontal={true} contentContainerStyle={styles.horizontalButtonContainer}>
            <TouchableOpacity
              style={[styles.button, selectedButton === 'Comidas' && styles.selectedButton]}
              onPress={() => handleCategoryCardPress('Comidas')}>
              <Text style={[styles.buttonText, selectedButton === 'Comidas' && styles.selectedButtonText]}>Comidas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedButton === 'ComidasVeganas' && styles.selectedButton]}
              onPress={() => handleCategoryCardPress('ComidasVeganas')}>
              <Text style={[styles.buttonText, selectedButton === 'ComidasVeganas' && styles.selectedButtonText]}>Comidas Veganas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedButton === 'Bebidas' && styles.selectedButton]}
              onPress={() => handleCategoryCardPress('Bebidas')}>
              <Text style={[styles.buttonText, selectedButton === 'Bebidas' && styles.selectedButtonText]}>Bebidas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedButton === 'Postres' && styles.selectedButton]}
              onPress={() => handleCategoryCardPress('Postres')}>
              <Text style={[styles.buttonText, selectedButton === 'Postres' && styles.selectedButtonText]}>Postres</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedButton === 'Otros' && styles.selectedButton]}
              onPress={() => handleCategoryCardPress('Otros')}>
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
      <TouchableOpacity
        style={styles.floatingCartButton}
        onPress={() => navigation.navigate('CartView')}>
        <Text>
          <Icon name="shopping-cart" size={30} color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    width: 320,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
  },
  searchBoxWrapper: {
    position: 'relative',
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  subtitle: {
    fontSize: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
    marginHorizontal: 20,
  },
  seeMoreButton: {
    color: '#007BFF',
    fontSize: 14,
    marginLeft: 10,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginLeft: 10, // Ajuste para mover el ícono un poco a la derecha
  },
  profileButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  addressSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#666',
    marginRight: 115,
    marginLeft: 25,
    paddingHorizontal: 8,
    // Agregar sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // Este es para Android
  },
  addressSearchInput: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    flex: 1,
  },
  addressSearchIconWrapper: {
    padding: 5,
  },
  buttonContainer: {
    marginTop: 10,
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
    marginHorizontal: 3,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  selectedButton: {
    backgroundColor: '#0056b3',
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  popularItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  popularItem: {
    width: 140, // Ancho de la caja
    height: 140, // Alto de la caja
    backgroundColor: '#007BFF',
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
itemInfo: {
    backgroundColor: '#D3D3D3',
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 5, // Espacio vertical dentro de la caja
},
itemText: {
    color: '#000',
    fontSize: 14, // Tamaño del texto
    textAlign: 'center',
},
  floatingCartButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default HomePage;