import { Alert, SafeAreaView, StyleSheet, Text, View, Image, Button } from 'react-native';

const SignInView = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.sectionContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo-tupperfy-v1.png')}
          resizeMode="contain"
        />
        <Text style={styles.title}>{"Tranqui, dejale tus tuppers a tupperfy"}</Text>
      </View>
      <View style={{ ...styles.sectionContainer }}>
        <View style={styles.buttonContainer}>
          <Button
            title="Inicia sesión"
            color='white'
            onPress={() => navigation.navigate('LogIn')}
          />
        </View>
        <View style={{ ...styles.buttonContainer, marginTop: 20 }}>
          <Button
            title="Crea una cuenta"
            color='white'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Thin',
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'blue',
  },
});

export default SignInView;
