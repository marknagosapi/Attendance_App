import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "@/screens/RegisterScreen/RegisterScreen";
import LoginScreen from "@/screens/LoginScreen/LoginScreen";
import SplashScreen from "@/screens/SplashScreen/SplashScreen";
import CameraScreen from "@/screens/ProfessorScreens/CameraScreen/CameraScreen";
import Colors from "@/constants/Colors";
import YourScreen from "@/screens/ProfessorScreens/HomeScreen/HomeScreen";
import Header from "@/components/Header";
import ProfileDetailScreen from "@/screens/ProfessorScreens/ProfileDetailScreen/ProfilesDetailScreen";
import ClassDetailScreen from "@/screens/ProfessorScreens/ClassDetailScreen/ClassDetailScreen";
import ResultScreen from "@/screens/ProfessorScreens/ResultScreen/ResultScreen";

function AppRouter() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashSreen"
        screenOptions={{
          headerStyle: { backgroundColor: Colors.usedGreenColor },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            title: "",
            headerBackTitle: "",
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Group>
          <Stack.Screen
            name="HomeScreen"
            component={YourScreen}
            options={{ header: Header }}
          />
          <Stack.Screen
            name="ClassDetailScreen"
            component={ClassDetailScreen}
            options={{ header: Header }}
          />
          <Stack.Screen
            name="ProfileDetailScreen"
            component={ProfileDetailScreen}
            options={{ header: Header }}
          />
          <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{ header: Header }}
          />
          <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{ title: "Camera", headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouter;
