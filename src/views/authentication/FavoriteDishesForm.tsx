import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type DishesState = {
  [key: string]: boolean;
};

const dishNames = [
  "Milanesa de Pollo",
  "Carne Asada",
  "Enchiladas",
  "Tacos",
  "Chiles Rellenos",
  "Pozole",
  "Tamales",
  "Quesadillas",
  "Sopes",
  "Pasta",
  "Pizza Margarita",
  "Sushi de Salmón",
  "Enchiladas de Pollo",
  "Hamburguesa con Queso",
  "Pasta Alfredo",
  "Paella",
  "Tacos de Carne Asada",
  "Curry de Pollo",
  "Lasaña",
  "Filete de Salmón al Horno",
  "Pollo a la Parrilla",
  "Risotto de Champiñones",
  "Tostadas de Aguacate",
  "Sopa de Tomate",
  "Pad Thai",
  "Pescado a la Parrilla con Verduras",
  "Canelones de Carne",
  "Fajitas de Carne de Res",
  "Pollo al Curry con Arroz",
  "Burritos de Frijoles y Queso",
  "Tarta de Queso",
  "Bistec con Puré de Papas",
  "Sopa de Lentejas",
  "Pollo al Horno con Papas",
  "Hot Dogs",
  "Espagueti a la Boloñesa",
  "Tacos de Pescado",
  "Estofado de Carne",
  "Quiche de Espinacas y Queso",
  "Arroz Frito con Verduras y Pollo",
];

const FavoriteDishesForm = ({ navigation }: { navigation: any }) => {
  const initialState: DishesState = dishNames.reduce((acc, dish) => {
    acc[dish] = false;
    return acc;
  }, {} as DishesState);

  const [dishes, setDishes] = useState<DishesState>(initialState);
  const [searchText, setSearchText] = useState('');

  const changeDishState = (dish: string, isChecked: boolean) => {
    setDishes((prevDishes) => ({ ...prevDishes, [dish]: isChecked }));
  };

  const filteredDishNames = dishNames.filter(dish => dish.toLowerCase().includes(searchText.toLowerCase()));

  const handleContinue = () => { 
    navigation.navigate('AddPaymentMethod')
    const selectedDishes = Object.keys(dishes).filter((dish) => dishes[dish]);
    console.log(selectedDishes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Select Your Favorite Dishes</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <View style={styles.checkboxContainer}>
        {filteredDishNames.map((dish, index) => (
          <BouncyCheckbox
            key={index}
            size={25}
            fillColor="red"
            unFillColor="#FFFFFF"
            text={dish}
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={styles.checkboxText}
            style={styles.checkbox}
            onPress={(isChecked) => {
              changeDishState(dish, isChecked);
            }}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleContinue}>
        <View style={styles.buttonBox}>
          <Text style={styles.buttonText}>Continuar</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  searchContainer: {
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    width: '100%',
    marginBottom: 20,
  },
  checkbox: {
    marginBottom: 10,
  },
  checkboxText: {
    textDecorationLine: 'none',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 20, 
  },
  buttonBox: {
    backgroundColor: 'blue',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FavoriteDishesForm;
