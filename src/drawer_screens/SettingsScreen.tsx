import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
  },
  pickerContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  option: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
  pickerContainer: {
    backgroundColor: '#555',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

const SettingsScreen = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('Español');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const toggleDarkMode = () => {
    setDarkModeEnabled((prev) => !prev);
    // Lógica adicional para cambiar el tema de la aplicación
  };

  const toggleNotifications = () => {
    setReceiveNotifications((prev) => !prev);
    // Lógica para habilitar/deshabilitar notificaciones
  };

  const languages = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano'];

  const handleLanguageChange = (itemValue, itemIndex) => {
    setSelectedLanguage(itemValue);
    setShowLanguagePicker(false); // Cerrar el Picker después de seleccionar un idioma
    // Aquí puedes agregar lógica adicional para guardar el idioma seleccionado en tu aplicación
  };

  return (
    <View style={darkModeEnabled ? darkTheme.container : lightTheme.container}>
      <Text style={darkModeEnabled ? darkTheme.title : lightTheme.title}>Configuración</Text>
      <TouchableOpacity
        style={darkModeEnabled ? darkTheme.option : lightTheme.option}
        onPress={() => setShowLanguagePicker((prev) => !prev)}>
        <Text style={darkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Idioma</Text>
        <FontAwesome5Icon
          name={showLanguagePicker ? 'angle-up' : 'angle-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {showLanguagePicker && (
        <View style={darkModeEnabled ? darkTheme.pickerContainer : lightTheme.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            style={{ height: 200, width: '100%' }}
            itemStyle={{ fontSize: 18 }}
            onValueChange={handleLanguageChange}>
            {languages.map((language, index) => (
              <Picker.Item key={index} label={language} value={language} />
            ))}
          </Picker>
        </View>
      )}
      <View style={darkModeEnabled ? darkTheme.option : lightTheme.option}>
        <Text style={darkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Dark Mode o Modo Claro</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkModeEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkModeEnabled}
        />
      </View>
      <View style={darkModeEnabled ? darkTheme.option : lightTheme.option}>
        <Text style={darkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Privacidad</Text>
        {/* Opción para configurar la privacidad */}
      </View>
      <View style={darkModeEnabled ? darkTheme.option : lightTheme.option}>
        <Text style={darkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Recibir Notificaciones</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={receiveNotifications ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={receiveNotifications}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
