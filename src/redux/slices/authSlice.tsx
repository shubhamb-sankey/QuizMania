import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from 'react-native-gesture-handler';

interface User {
    name: string
    email: string
    password: string
}

interface AuthState {
    isAuthenticated: boolean
    user: User | null
    registeredUsers: User[]
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    registeredUsers: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<User>) => {
            const isAlreadyRegistered = state.registeredUsers.some(
                (user) => user.email === action.payload.email
            );

            if (isAlreadyRegistered) {
                console.log('Email already registered!');
            } else {
                state.registeredUsers.push(action.payload);
                console.log('Registration successful!');
            }
        },
        login: (state, action: PayloadAction<User>) => {
            const isValidUser = state.registeredUsers.some(
                (user) => user.email === action.payload.email
            );

            if (isValidUser) {
                state.isAuthenticated = true;
                state.user = action.payload;
                console.log('Login successful!');
                // console.log(`${state.user} is the user`);
                // console.log(`${action.payload.name} is the user`);
            } else {
                console.log('User not registered!');
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            console.log('Logout Success');
            console.log(`${state.user} is the user`);
        },
    },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
