import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Share } from 'react-native';

const ReferFriends = () => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: '¡Únete a Tupperfy y disfruta de comidas caseras deliciosas! Usa mi código de referencia: TU1234',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Compartido con una actividad específica
          console.log('Shared with activity type: ', result.activityType);
        } else {
          // Compartido directamente
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Compartido cancelado
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Refiere a tus amigos</Text>
      <Text style={styles.description}>
        Comparte tu código de referencia con tus amigos y obtén recompensas cuando se unan a Tupperfy.
      </Text>
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Tu código de referencia:</Text>
        <TextInput
          style={styles.codeInput}
          value="TU1234"
          editable={false}
          selectTextOnFocus={true}
        />
        <TouchableOpacity style={styles.copyButton} onPress={() => {}}>
          <Text style={styles.copyButtonText}>Copiar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Compartir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  codeLabel: {
    fontSize: 16,
    color: '#333',
  },
  codeInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  copyButton: {
    backgroundColor: '#006BFF',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    shadowOpacity: 1.5,
    shadowColor: 'gray',
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#006BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowOpacity: 1.5,
    shadowColor: 'gray',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReferFriends;
