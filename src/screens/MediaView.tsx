import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, Animated, ScrollView, RefreshControl } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  { id: '1', backgroundColor: '#007BFF' },
  { id: '2', backgroundColor: '#007BFF' },
  { id: '3', backgroundColor: '#007BFF' },
  // Añade más datos si es necesario
];

const MediaView = () => {
  const [likedItems, setLikedItems] = useState({});
  const [commentVisible, setCommentVisible] = useState('');
  const [slideAnim] = useState(new Animated.Value(1000)); // Inicia fuera de la pantalla
  const [commentText, setCommentText] = useState(''); // Estado para el texto del comentario
  const [comments, setComments] = useState([
    { id: 'comment1', text: 'Comentario 1', replies: [] },
    { id: 'comment2', text: 'Comentario 2', replies: [] },
    { id: 'comment3', text: 'Comentario 3', replies: [] },
    // Puedes inicializar con datos de prueba
  ]);
  const [replyText, setReplyText] = useState(''); // Estado para el texto de la respuesta
  const [replyingTo, setReplyingTo] = useState(null); // Estado para controlar a qué comentario se está respondiendo
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco

  const handleLikePress = (itemId) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const toggleCommentVisibility = (itemId) => {
    if (commentVisible === itemId) {
      // Si ya está abierto, cerrar
      Animated.timing(slideAnim, {
        toValue: 1000, // Fuera de la pantalla
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCommentVisible('');
      });
    } else {
      // Si está cerrado, abrir
      setCommentVisible(itemId);
      Animated.timing(slideAnim, {
        toValue: 0, // Posición inicial en la pantalla
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeComments = () => {
    Animated.timing(slideAnim, {
      toValue: 1000, // Fuera de la pantalla
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCommentVisible('');
    });
  };

  const handleCommentInputChange = (text) => {
    setCommentText(text); // Actualiza el estado con el texto del comentario
  };

  const handleSendComment = () => {
    // Crea un nuevo comentario
    const newComment = {
      id: `comment${comments.length + 1}`, // Genera un ID único (puedes ajustar según tu lógica)
      text: commentText,
      replies: [], // Añade un array para las respuestas
    };

    // Actualiza el estado de comentarios con el nuevo comentario
    setComments([...comments, newComment]);

    // Limpia el campo de comentario después de enviar
    setCommentText('');
  };

  const handleReplyInputChange = (text) => {
    setReplyText(text); // Actualiza el estado con el texto de la respuesta
  };

  const handleSendReply = (commentId) => {
    // Añade la respuesta al comentario correspondiente
    setComments((prevComments) => 
      prevComments.map((comment) => 
        comment.id === commentId ? { ...comment, replies: [...comment.replies, replyText] } : comment
      )
    );

    // Limpia el campo de respuesta después de enviar
    setReplyText('');
    setReplyingTo(null); // Resetea el estado de respuesta
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.userIconContainer} onPress={() => console.log('User icon pressed')}>
          <FontAwesome5Icon name="user-circle" size={50} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraIconContainer} onPress={() => console.log('Add content pressed')}>
          <MaterialCommunityIconsIcon name="camera-plus" size={40} color="white" style={styles.cameraIcon} />
        </TouchableOpacity>
        <View style={styles.rightAlignedIcons}>
          <TouchableOpacity onPress={() => handleLikePress(item.id)}>
            <AntDesignIcon
              name="heart"
              size={45}
              color={likedItems[item.id] ? 'red' : 'white'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleCommentVisibility(item.id)}>
            <FontAwesomeIcon name="commenting" size={45} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Share pressed')}>
            <FontAwesome5Icon name="share" size={45} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {commentVisible === item.id && (
        <Animated.View style={[styles.commentOverlay, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.commentArea}>
            <TouchableOpacity style={styles.closeButton} onPress={closeComments}>
              <FontAwesome5Icon name="times" size={25} color="#000" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.comment}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  {comment.replies.map((reply, replyIndex) => (
                    <Text key={replyIndex} style={styles.replyText}>{reply}</Text>
                  ))}
                  <TouchableOpacity onPress={() => setReplyingTo(comment.id)}>
                    <Text style={styles.replyButtonText}>Responder</Text>
                  </TouchableOpacity>
                  {replyingTo === comment.id && (
                    <View style={styles.replyContainer}>
                      <TextInput
                        style={styles.replyInput}
                        placeholder="Escribe tu respuesta..."
                        value={replyText}
                        onChangeText={handleReplyInputChange}
                      />
                      <TouchableOpacity onPress={() => handleSendReply(comment.id)}>
                        <FontAwesome5Icon name="paper-plane" size={20} color="#007BFF" style={styles.sendReplyIcon} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Añadir comentario..."
                value={commentText} // Enlaza el valor del input con el estado del comentario
                onChangeText={handleCommentInputChange} // Manejador para cambiar el texto del comentario
              />
              <TouchableOpacity onPress={handleSendComment}>
                <FontAwesome5Icon name="paper-plane" size={25} color="#007BFF" style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Aquí puedes realizar cualquier operación de refresco, como cargar nuevos datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulación de carga, en realidad deberías cargar los datos nuevos aquí
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tupperfy Media</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007BFF']}
            tintColor="#007BFF"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  item: {
    justifyContent: 'center',
    height: 600,
    width: '100%',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  userIconContainer: {
    position: 'absolute',
    bottom: 220,
    left: -10,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 230,
    left: 290,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAlignedIcons: {
    position: 'absolute',
    right: 10,
    top: -20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  commentOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 120,
    backgroundColor: '#fff', // Cambiar el color a blanco
    padding: 10,
    zIndex: 100, // Ajusta el índice z para que esté sobre otros elementos
  },
  commentArea: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendIcon: {
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 100, // Espacio adicional para los comentarios
  },
  comment: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  commentText: {
    fontSize: 16,
  },
  replyText: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 20,
  },
  replyButtonText: {
    color: '#007BFF',
    fontSize: 14,
    marginTop: 5,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  replyInput: {
    flex: 1,
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendReplyIcon: {
    marginLeft: 10,
  },
});

export default MediaView;
