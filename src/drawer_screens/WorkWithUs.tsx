import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WorkWithUs = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonType) => {
    setSelectedButton(buttonType);
    // Aquí puedes agregar lógica adicional según el tipo de botón seleccionado
    if (buttonType === 'chef') {
      console.log('Quiero trabajar como Chef');
    } else if (buttonType === 'delivery') {
      console.log('Quiero ser parte del equipo de entrega');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selectedButton === 'chef' && styles.selectedButton]}
        onPress={() => handleButtonPress('chef')}
      >
        <Text style={styles.buttonText}>Quiero trabajar como Chef</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedButton === 'delivery' && styles.selectedButton]}
        onPress={() => handleButtonPress('delivery')}
      >
        <Text style={styles.buttonText}>Quiero ser parte del equipo de entrega</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: '85%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  selectedButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default WorkWithUs;
