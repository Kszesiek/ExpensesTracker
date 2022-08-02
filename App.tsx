import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import {GlobalStyles} from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

export type StackParamList = {
  "ExpensesOverview": undefined
  "ManageExpense": { expenseId: string }
};
export type NavigationProps = NativeStackNavigationProp<StackParamList>;

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tabs.Navigator screenOptions={({ navigation }) => ({
      headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor ? tintColor : 'white'}
          onPress={() => {
            navigation.navigate("ManageExpense");
          }} />
      ),
    })}
  >
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
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white',
          }}>
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}} />
            <Stack.Screen name="ManageExpense" component={ManageExpense} options={{presentation: 'modal'}} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}