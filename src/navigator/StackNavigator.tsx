//import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import HomeScreen from '../HomeScreen';
import EditProfileScreen from '../EditProfileScreen';
import ListPatientsScreen from '../ListPatientsScreen';
import AddPatientScreen from '../AddPatientScreen';
import { createStackNavigator } from '@react-navigation/stack';
 

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ListPatientsScreen" component={ListPatientsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} options={{ headerShown: false }} />
     

     
      
    
    </Stack.Navigator>
  );
}
