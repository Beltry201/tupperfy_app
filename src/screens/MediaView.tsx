import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, Animated, ScrollView, RefreshControl, Share, Dimensions } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');

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

  const handleShare = async () => {
    try {
      await Share.share({
        message: '¡Mira este contenido en Tupperfy!',
      });
    } catch (error) {
      console.error('Error al compartir', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.content}>
  <TouchableOpacity style={[styles.userIconContainer, { top: -20 }]} onPress={() => console.log('User icon pressed')}>
    <FontAwesome5Icon name="user-circle" size={50} color="white" style={styles.icon} />
  </TouchableOpacity>
  <TouchableOpacity style={[styles.cameraIconContainer, { top: -20 }]} onPress={() => console.log('Add content pressed')}>
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
    <TouchableOpacity onPress={handleShare}>
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
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // Espacio blanco entre elementos
  },
  content: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 200,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  icon: {
    margin: 15,
  },
  userIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  cameraIconContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  cameraIcon: {
    margin: 20,
  },
  rightAlignedIcons: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  commentOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%', // Ajusta la altura según sea necesario
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  commentArea: {
    flex: 1,
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  replyText: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
    color: '#888',
  },
  replyButtonText: {
    color: '#007BFF',
    fontSize: 14,
    marginBottom: 5,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendReplyIcon: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendIcon: {
    marginLeft: 10,
  },
});

export default MediaView;
