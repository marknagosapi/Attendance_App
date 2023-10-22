import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "@/screens/RegisterScreen";
import LoginScreen from "@/screens/LoginScreen";
import SplashScreen from "@/screens/SplashScreen";


function AppRouter(){

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerStyle: { backgroundColor: '#2ECC71' } }}>


            <Stack.Screen name="SplashScreen" 
                component={SplashScreen} 
                options={{title:'', headerBackTitle:'', headerBackVisible: false}}
            />
                <Stack.Screen name="Register" component={RegistrationScreen} options={{title:'Register', headerBackVisible: false}}></Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen} options={{title:'Login', headerBackVisible: false}} ></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
 }
 
 export default AppRouter;