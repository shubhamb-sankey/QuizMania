import React from 'react';
import { Snackbar } from 'react-native-paper';

interface SnackbarProps {
    message: string;
    visible: boolean;
    onDismiss: () => void;
}

const CommonSnackbar: React.FC<SnackbarProps> = ({ message, visible, onDismiss }) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            action={{ label: 'OK', onPress: onDismiss }}
        >
            {message}
        </Snackbar>
    );
};

export default CommonSnackbar;
