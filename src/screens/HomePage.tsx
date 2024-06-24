import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


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
            onPress={() => navigation.navigate('DrawerInfo')}>
            <Text>
              <IoniconsIcon name="menu" size={28} color="black" />
            </Text>
          </TouchableOpacity>
          <View style={styles.addressSearchContainer}>
            <View style={styles.addressSearchBox}>
              <TouchableOpacity style={styles.addressSearchIconWrapper} onPress={() => console.log('Location icon pressed')}>
                <FontAwesome6Icon name="location-dot" size={23} color="#FF4500" />
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
              <AntDesignIcon name="search1" size={20} color="black" />
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
              style={[styles.button, selectedButton === 'Condimentos' && styles.selectedButton]}
              onPress={() => handleCategoryCardPress('Condmientos')}>
              <Text style={[styles.buttonText, selectedButton === 'Condimentos' && styles.selectedButtonText]}>Condimentos</Text>
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
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('CartView')}>
        <AntDesignIcon name="shoppingcart" size={30} color="black" />
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
    alignItems: 'center',
    paddingVertical: 10,
  },
  searchBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: '90%',
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIconWrapper: {
    marginLeft: 10,
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
    marginLeft: 20,
    marginRight: 90,
  },
  addressSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  addressSearchIconWrapper: {
    marginRight: 12,
  },
  addressSearchInput: {
    flex: 1,
    fontSize: 13,
    color: '#333',
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
cartButton: {
  position: 'absolute',
  top: 12,
  right: 20,
  width: 50,
  height: 50,
  borderRadius: 30,
  backgroundColor: 'white',
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