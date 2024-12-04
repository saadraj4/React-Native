import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = {
    navigation: NavigationProp<any>;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
    const [user, setUser] = useState<any>({ username: 'admin', email: 'admin@gmail.com' });
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState<any>(null);
    const [fetching, setFetching] = useState(false);  // To manage Fetch button loading state

    const fetchAPI = async () => {
        try {
            setFetching(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            console.log('Response:', response.data);
            setApiData(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
            Alert.alert('Error', 'Failed to fetch data');
        }
        finally {
            setFetching(false);
        }

    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const userDetails = await AsyncStorage.getItem('userDetails');

                if (userDetails) {
                    setUser(JSON.parse(userDetails));
                    console.log('Token:', token);
                } else {
                    Alert.alert('Error', 'User details not found');
                }
            } catch (error) {
                console.error('Error retrieving user data', error);
                Alert.alert('Error', 'Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            // Clear the token and user details from AsyncStorage
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userDetails');
            console.log('Logged out');
            // Redirect to LoginScreen
            navigation.navigate('Login'); // Adjust the name based on your stack navigation
        } catch (error) {
            console.error('Error logging out', error);
            Alert.alert('Error', 'Failed to log out');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {user ? (
                <View style={styles.userInfo}>
                    <Text style={styles.username}>Username: {user.username}</Text>
                    <Text style={styles.email}>Email: {user.email}</Text>

                    <TouchableOpacity
                        onPress={() => {
                            handleLogout();
                        }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Log out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text>No user data available</Text>
            )}
            {/* Fetch Button */}
            <TouchableOpacity onPress={fetchAPI} disabled={fetching}>
                <View style={styles.fetchBtn}>
                    <Text style={styles.fetchBtnText}>{fetching ? 'Fetching...' : 'Fetch'}</Text>
                </View>
            </TouchableOpacity>

            {/* Display API Response */}
            {apiData && (
    <View style={styles.apiResponse}>
        <Text style={styles.apiResponseText}>Fetched Data:</Text>
        {Object.keys(apiData).map((key) => (
            <View key={key} style={styles.keyValuePair}>
                <Text style={styles.keyText}>{key}:</Text>
                <Text style={styles.valueText}>
                    {typeof apiData[key] === 'object' ? JSON.stringify(apiData[key]) : 
                        typeof apiData[key] === 'boolean' ? (apiData[key] ? 'true' : 'false') :
                        apiData[key]}
                </Text>
            </View>
        ))}
    </View>
)}

        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    userInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    username: {
        fontSize: 18,
        marginVertical: 8,
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 16,
    },
    // Buttons
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#075eec',
        borderColor: '#075eec',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
    fetchBtn: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    fetchBtnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
    apiResponse: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
    },
    apiResponseText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    keyValuePair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    keyText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    valueText: {
        fontSize: 14,
        color: '#555',
    },
});

export default DashboardScreen;
