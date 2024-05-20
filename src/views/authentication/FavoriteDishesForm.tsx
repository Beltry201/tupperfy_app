import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
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
];

const FavoriteDishesForm = ({ navigation }: { navigation: any }) => {
  const initialState: DishesState = dishNames.reduce((acc, dish) => {
    acc[dish] = false;
    return acc;
  }, {} as DishesState);

  const [dishes, setDishes] = useState<DishesState>(initialState);

  const changeDishState = (dish: string, isChecked: boolean) => {
    setDishes((prevDishes) => ({ ...prevDishes, [dish]: isChecked }));
  };

  const handleContinue = () => { 
    navigation.navigate('AddPaymentMethod')
    const selectedDishes = Object.keys(dishes).filter((dish) => dishes[dish]);
    console.log(selectedDishes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Select Your Favorite Dishes</Text>
      <View style={styles.checkboxContainer}>
        {dishNames.map((dish, index) => (
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
    marginBottom: 65,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
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
    paddingRight: 20, // Añadir un padding derecho para separar el botón del borde de la pantalla
  },
  buttonBox: {
    backgroundColor: 'blue',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FavoriteDishesForm;
