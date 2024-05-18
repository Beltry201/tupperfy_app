import { View, Text, StyleSheet } from "react-native";


const FavoriteDishesForm = ({ navigation }: { navigation: any }) => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Coloca tu usuario y contraseña para iniciar sesión</Text>
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
    color: 'black',
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  buttonContainer: {
    width: '90%',
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavoriteDishesForm;