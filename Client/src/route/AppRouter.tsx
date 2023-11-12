import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "@/screens/AuthScreens/RegisterScreen/RegisterScreen";
import LoginScreen from "@/screens/AuthScreens/LoginScreen/LoginScreen";
import SplashScreen from "@/screens/AuthScreens/SplashScreen/SplashScreen";
import CameraScreen from "@/screens/ProfessorScreens/CameraScreen/CameraScreen";
import Colors from "@/constants/Colors";
import YourScreen from "@/screens/ProfessorScreens/HomeScreen/HomeScreen";
import Header from "@/components/Header";
import ProfileDetailScreen from "@/screens/ProfessorScreens/ProfileDetailScreen/ProfilesDetailScreen";
import ClassDetailScreen from "@/screens/ProfessorScreens/ClassDetailScreen/ClassDetailScreen";
import ResultScreen from "@/screens/ProfessorScreens/ResultScreen/ResultScreen";
import StudentHomeScreen from "@/screens/StudentScreens/StudentHomeScreen/StudentHomeScreen";
import StudentProfileScreen from "@/screens/StudentScreens/StudentProfileScreen/StudentProfileScreen";
import CourseDetailScreen from "@/screens/StudentScreens/CourseDetailScreen/CourseDetailScreen";

function AppRouter() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
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

        {/* Student Screens */}

        <Stack.Group>
          <Stack.Screen
            name="StudentHomeScreen"
            component={StudentHomeScreen}
            options={{ header: Header }}
          />

        <Stack.Screen
            name="StudentProfileScreen"
            component={StudentProfileScreen}
            options={{ header: Header }}
        />
        <Stack.Screen
            name="CourseDetailScreen"
            component={CourseDetailScreen}
            options={{ header: Header }}
        />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouter;
