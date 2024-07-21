import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Campos vacíos', 'Por favor completa todos los campos.');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario logueado:', user);

      // Navegar a la pantalla HomeScreen después del inicio de sesión exitoso
      navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      Alert.alert('Error', 'Hubo un error durante el inicio de sesión. Por favor intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="home" size={50} color="black" />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <Text
        style={styles.textRedirect}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
        ¿No tienes una cuenta? Regístrate ahora
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9e8787',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#6dbbdc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textRedirect: {
    marginTop: 20,
    fontSize: 15,
    color: '#105529',
  },
});

export default LoginScreen;
