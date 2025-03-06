import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface SnackbarProps {
    message: string;
    visible: boolean;
    onDismiss: () => void;
}

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#333',
        padding: 14,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    message: { color: '#fff', fontSize: 14 },
    dismiss: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
});


const Snackbar: React.FC<SnackbarProps> = ({ message, visible, onDismiss }) => {
    const translateY = useRef(new Animated.Value(100)).current; // Keep value persistent

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : 100,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Animated.View style={[styles.snackbar, { transform: [{ translateY }], opacity: visible ? 1 : 0 }]}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={onDismiss}>
                <Text style={styles.dismiss}>Dismiss</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Snackbar;
