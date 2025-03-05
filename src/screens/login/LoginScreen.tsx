import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CommonSnackbar from '../../components/Snackbar';

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    link: { marginTop: 10, color: 'blue', textAlign: 'center' },
    emptybox: { height: 50 }
});

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackVisible, setSnackVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    const navigation = useNavigation<AuthScreenNavigationProp>();
    const registeredUsers = useSelector((state: RootState) => state.auth.registeredUsers);
    // console.log(registeredUsers)

    const handleLogin = () => {
        if (!email || !password) {
            setSnackMessage('Email and password are required');
            setSnackVisible(true);
            return;
        }

        const user = registeredUsers.find(user => user.email === email);

        if (!user) {
            setSnackMessage('Email not registered');
        } else if (user.password !== password) {
            setSnackMessage('Incorrect password');
        } else {
            setSnackMessage('Login successful!');
            setTimeout(() => navigation.navigate('Dashboard'), 2000);
        }

        setSnackVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <View style={styles.emptybox} />
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                Don't have an account? Register
            </Text>

            <CommonSnackbar message={snackMessage} visible={snackVisible} onDismiss={() => setSnackVisible(false)} />
        </View>
    );
};

export default LoginScreen;
