import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CardProps {
    title: string
    description: string
    onPress: () => void
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 12,
        borderColor: 'black',
        borderWidth: 2,
    },
    title: { fontSize: 22, fontWeight: 'bold', paddingBottom: 50 },
    description: { fontSize: 14 }
})

const CommonCard: React.FC<CardProps> = ({ title, description, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
}

export default CommonCard
