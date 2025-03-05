import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import CommonSnackbar from '../../components/Snackbar';

const RegisterScreen = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // const [email, setEmail] = useState('');
    // const [name, setName] = useState('');
    // const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackVisible, setSnackVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    const navigation = useNavigation<AuthScreenNavigationProp>();
    const dispatch = useDispatch();
    const registeredUsers = useSelector((state: RootState) => state.auth.registeredUsers);

    const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

    const checkPassword = () => {
        if (form.password.length < 6) {
            setSnackMessage('Password must be at least 6 characters');
            return false;
        }
        if (form.password !== confirmPassword) {
            setSnackMessage('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleRegister = () => {
        if (!form.name || !form.email || !form.password || !confirmPassword) {
            setSnackMessage('All fields are required');
            setSnackVisible(true);
            return;
        }

        if (!isEmailValid(form.email)) {
            setSnackMessage('Invalid email format');
            setSnackVisible(true);
            return;
        }

        if (!checkPassword()) {
            setSnackVisible(true);
            return;
        }

        const isAlreadyRegistered = registeredUsers.some(user => user.email === form.email);

        if (isAlreadyRegistered) {
            setSnackMessage('Email already registered!');
        } else {
            dispatch(register(form));
            setSnackMessage('Registration successful!');
        }
        setSnackVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={form.name}
                onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={form.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <View style={styles.emptybox} />
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                Already have an account? Login
            </Text>

            <CommonSnackbar message={snackMessage} visible={snackVisible} onDismiss={() => setSnackVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    link: { marginTop: 10, color: 'blue', textAlign: 'center' },
    emptybox: { height: 50 }
});

export default RegisterScreen;
