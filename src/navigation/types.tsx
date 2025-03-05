import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
};

// Define type for navigation prop
export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
