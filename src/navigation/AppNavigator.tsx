import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import Dashboard from '../screens/dashboard/Dashboard';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ title: 'Login', headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ title: 'Register', headerShown: false }}
                    />
                    <Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{ title: 'Dashboard', headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default AppNavigator;
