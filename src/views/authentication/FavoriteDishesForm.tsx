import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type DishesState = {
  [key: string]: boolean;
};


const FavoriteDishesForm = ({ navigation }: { navigation: any }) => {
  const [dishes, setDishes] = useState<DishesState>({
    dish1: false,
    dish2: false,
    dish3: false,
  });

  const changeDishState = (dish: string, isChecked: boolean) => {
    setDishes((prevDishes) => ({ ...prevDishes, [dish]: isChecked }));
  };

  const handleContinue = () => {
    const selectedDishes = Object.keys(dishes).filter(dish => dishes[dish]);
    console.log(selectedDishes);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Select Your Favorite Dishes
      </Text>
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Dish 1"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked) => {
            changeDishState('dish1', isChecked);
          }}
        />
        <BouncyCheckbox
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Dish 2"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked) => {
            changeDishState('dish2', isChecked);
          }}
        />
        <BouncyCheckbox
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Dish 3"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked) => {
            changeDishState('dish3', isChecked);
          }}
        />
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    marginBottom: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});

export default FavoriteDishesForm;
