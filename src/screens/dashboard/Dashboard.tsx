import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, Modal, Pressable } from 'react-native'
import CommonCard from '../../components/CommonCard'
import quizdata from "../../../data.json"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProp } from '../../navigation/types'
import { logout } from '../../redux/slices/authSlice'

const styles = StyleSheet.create({
    container: { justifyContent: 'center', padding: 20 },
    headerContainer: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    greetings: { justifyContent: 'flex-start', alignItems: 'center' },
    heading: { fontSize: 22, fontWeight: 'bold', paddingVertical: 10 },
    modalView: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 16,
        borderRadius: 8,
        padding: 3,
    },
})

const Dashboard = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user)
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const dispatch = useDispatch();
    console.log(`${user?.name} is the name`)

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Dashboard</Text>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={require('../../assets/imgs/user.png')} />
                </Pressable>
            </View>
            <View>
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={modalVisible}
                    collapsable={true}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>Do you want to logout?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 30 }}>
                            <Pressable onPress={() => setModalVisible(false)}><Text style={styles.button}>Close</Text></Pressable>
                            <Pressable onPress={() => {
                                navigation.navigate('Login')
                                dispatch(logout())
                            }}>
                                <Text style={styles.button}>Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.heading}>Greetings, {user?.name}</Text>
            </View>
            <FlatList
                data={quizdata.quizzes}
                renderItem={({ item }) => <CommonCard
                    title={item.subject}
                    description='Hard | Med | Easy'
                    onPress={() => console.log(`${item.subject} clicked`)}
                />}
                keyExtractor={(item) => item.subject}
            />
        </View>
    );
}

export default Dashboard;
