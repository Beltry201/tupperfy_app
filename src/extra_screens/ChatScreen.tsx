// ChatScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ChatScreen = ({ route }) => {
  const { conversation } = route.params; // Obtiene la conversación seleccionada desde las props de navegación
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: conversation.lastMessage, type: 'received' }, // Simula un mensaje recibido al inicio
  ]);

  const handleSend = () => {
    if (message.trim() === '') {
      return;
    }

    const newMessage = { id: messages.length + 1, text: message, type: 'sent' };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{conversation.name}</Text>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageBubble, msg.type === 'received' ? styles.otherMessage : styles.myMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#006BFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
