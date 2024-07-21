import 'react-native-gesture-handler'; // Esto debe ir al principio
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import HomeScreen from './src/HomeScreen';
import AddPatientScreen from './src/AddPatientScreen';
import EditProfileScreen from './src/EditProfileScreen';
import ListPatientsScreen from './src/ListPatientsScreen';
import EditPatientScreen from './src/EditPatientScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddPatient: undefined;
  EditProfile: undefined;
  ListPatients: undefined;
  EditPatient: { patientId: string }; // Añade el parámetro patientId
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListPatients" component={ListPatientsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditPatient" component={EditPatientScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
