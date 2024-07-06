import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileInfo = ({ navigation, userName }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      {/* ¡Hola (nombre de usuario)! */}
      <Text style={styles.greeting}>¡Hola {userName}!</Text>

      {/* Título "Mi cuenta" */}
      <Text style={styles.title}>Mi cuenta</Text>

      {/* Datos de perfil */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('ProfileDetails')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="person" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Datos de Perfil</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Mensajes */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Messages')}>
        <View style={styles.optionContent}>
          <MaterialCommunityIconsIcon name="message" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Mensajes</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Cocineros Favoritos */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('FavoriteChefs')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="heart" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Cocineros Favoritos</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Tupperfy Premium */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('TupperfyPremium')}>
        <View style={styles.optionContent}>
          <FontAwesome6Icon name="crown" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Tupperfy Premium</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Métodos de Pago */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('PaymentMethods')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="wallet" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Métodos de Pago</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Direcciones */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Addresses')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="location" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Direcciones</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Título "Promociones" */}
      <Text style={styles.subtitle}>Promociones</Text>

      {/* Refiere amigos */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('ReferFriends')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="share" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Refiere amigos</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Códigos de promoción o regalo */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('PromotionCodes')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="gift" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Códigos de promoción</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Título "Información" */}
      <Text style={styles.subtitle}>Información</Text>

      {/* Configuración */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Settings')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="settings" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Configuración</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Ayuda */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Help')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="help-circle" size={22} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Ayuda</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Términos y Condiciones */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('TermsConditions')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="document-text" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Términos y Condiciones</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Legal */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('Legal')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="book" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Legal</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Otros */}
      <Text style={styles.subtitle}>Otros</Text>

      {/* Trabaja con nosotros */}
      <TouchableOpacity style={styles.option} onPress={() => navigateToScreen('WorkWithUs')}>
        <View style={styles.optionContent}>
          <FontAwesome5Icon name="user-friends" size={20} color="#333" style={styles.icon} />
          <Text style={styles.optionText}>Trabaja con nosotros</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#333" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Cerrar Sesión */}
      <TouchableOpacity style={[styles.option, { marginTop: 40 }]} onPress={() => navigateToScreen('Logout')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="log-out" size={20} color="#FF4500" style={styles.icon} />
          <Text style={[styles.optionText, { color: '#FF4500' }]}>Cerrar sesión</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#FF4500" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Eliminar Cuenta */}
      <TouchableOpacity style={[styles.option, { marginBottom: 40 }]} onPress={() => navigateToScreen('DeleteAccount')}>
        <View style={styles.optionContent}>
          <IoniconsIcon name="trash" size={20} color="#FF4500" style={styles.icon} />
          <Text style={[styles.optionText, { color: '#FF4500' }]}>Eliminar Cuenta</Text>
          <View style={styles.arrowContainer}>
            <IoniconsIcon name="chevron-forward" size={20} color="#FF4500" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  arrowIcon: {},
});

export default ProfileInfo;
