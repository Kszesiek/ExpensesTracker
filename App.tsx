import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import {GlobalStyles} from "./constants/styles";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (<Tabs.Navigator screenOptions={{
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
  }}>
    <Tabs.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: "Recent expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color} />
      }}
    />
    <Tabs.Screen
      name="AllExpenses"
      component={AllExpenses}
      options={{
        title: "All expenses",
        tabBarLabel: "All expenses",
        tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color} />
      }}/>
  </Tabs.Navigator>)
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}} />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}