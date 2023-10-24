import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "@/screens/RegisterScreen/RegisterScreen";
import LoginScreen from "@/screens/LoginScreen/LoginScreen";
import SplashScreen from "@/screens/SplashScreen";
import CameraScreen from "@/screens/ProfessorScreens/CameraScreen/CameraScreen";


function AppRouter(){

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CameraScreen" screenOptions={{ headerStyle: { backgroundColor: '#2ECC71'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}, headerBackVisible: false }}>


            <Stack.Screen name="SplashScreen" 
                component={SplashScreen} 
                options={{title:'', headerBackTitle:'', headerBackVisible: false}}
            />
                <Stack.Screen name="Register" component={RegistrationScreen} options={{title:'Register'}}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{title:'Login'}}/>
            
            <Stack.Group>
                <Stack.Screen name="CameraScreen" component={CameraScreen} options={{title:'Camera', headerShown:false} } />
            </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    )
 }
 
 export default AppRouter;