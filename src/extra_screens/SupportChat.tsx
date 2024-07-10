// SupportChatScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SupportChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hola, ¿en qué puedo ayudarte hoy?', fromUser: false },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message = {
      id: messages.length + 1,
      text: newMessage,
      fromUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simular respuesta automática del chat bot después de 1 segundo
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'Gracias por tu mensaje. En breve uno de nuestros agentes te ayudará.',
        fromUser: false,
      };
      setMessages([...messages, botResponse]);
    }, 1000);

    // Hacer scroll hacia abajo automáticamente
    setTimeout(() => {
      flatListRef.current.scrollToEnd({ animated: true });
    }, 200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Soporte</Text>

      <FlatList
        ref={flatListRef}
        style={styles.messagesContainer}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.fromUser ? styles.userMessage : styles.supportMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContent}
        inverted // Para mostrar los mensajes más recientes al final
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage} // Enviar mensaje al presionar "Enter"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  supportMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  sendButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SupportChat;
