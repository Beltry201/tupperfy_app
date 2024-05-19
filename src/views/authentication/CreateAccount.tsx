import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
// import Icon from 'react-native-vector-icons/FontAwesome';

const CreateAccountView = ({ navigation }: { navigation: any }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('FavoriteDishesForm')
    if (!firstName || !lastName || !email || !phoneNumber || !gender || !dateOfBirth) {
      Alert.alert('Campos Obligatorios', 'Todos los campos excepto Dirección y Género son obligatorios.');
      return;
    }    
    // Lógica para crear la cuenta
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Date of Birth:', dateOfBirth);
    console.log('Gender:', gender);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  // Format date to display in the input field
  const formatDate = (date: Date | null) => {
    if (!date) return 'dia/mes/año'; // Placeholder text when no date is selected
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Crea tu cuenta</Text>
        <View style={{flex:1, flexDirection: "row"}}>
          <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="Nombre"
              />
          </View>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <Text style={styles.label}>Apellido *</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
              placeholder="Apellido"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico *</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono *</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="+52"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha de Nacimiento *</Text>
          {/* Muy importante, usar luego */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setOpen(true)}
          >
            <Text style={dateOfBirth ? styles.text : styles.placeholder}>
              {formatDate(dateOfBirth)}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            mode='date'
            date={dateOfBirth || new Date()}
            onConfirm={(date) => {
              setOpen(false);
              setDateOfBirth(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Género</Text>
          <TextInput
            style={styles.input}
            onChangeText={setGender}
            value={gender}
            placeholder="Género (Hombre/Mujer/Otro)"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña *</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={setPassword}
              value={password}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showHide}>{showPassword ? "Ocultar" : "Mostrar"} contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Contraseña *</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirmar contraseña"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text style={styles.showHide}>{showConfirmPassword ? "Ocultar" : "Mostrar"} contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    width: '100%',
  },
  header: {
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#333',
    marginBottom: 5,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  showHide: {
    marginLeft: 10,
    color: 'blue',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 115, // Ancho ajustado aquí
    borderRadius: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 12
  },
  showDatePicker: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 10,
  },
  datePickerField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
    justifyContent: 'center', // Center the text vertically
  },
  placeholder: {
    fontSize: 16,
    color: '#aaa', // Placeholder text color (grey)
  },
});

export default CreateAccountView;
