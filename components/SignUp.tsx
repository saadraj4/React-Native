import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';



type Props = {
    navigation: NavigationProp<any>;
};

const SignUp: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSignup = async () => {

        try {

            console.log('username: ', username);
            console.log('email: ', email);
            console.log('password: ', password);
            console.log('confirmpassword: ', confirmPassword);
            if (password !== confirmPassword) {
                Alert.alert('Passwords do not match');
                return;
            }
            else {
                const response = await axios.post('http://192.168.100.33:5000/api/auth/register', { username, email, password }, {
                    headers: {
                      'Content-Type': 'application/json', // Ensure proper content type
                    },
                  });
                const { token } = response.data;

                Alert.alert('Successfully Signed Up');
                console.log('Token:', token);

                navigation.navigate('Login'); // Navigate to Login   screen
            }
        }
        catch (error) {
            console.error('Error signing up', error);
            Alert.alert('Error', 'Failed to sign up');
        }

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

    };

    return (
        // <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            <Text>Sign Up</Text>
                        </Text>

                    </View>
                    {/* Input */}
                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Username</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={text => setUsername(text)}
                                placeholder="username"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={username} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Email address</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                onChangeText={text => setEmail(text)}
                                placeholder="abc@example.com"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={email} />
                        </View>


                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput

                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={text => setPassword(text)}
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={password} />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <TextInput

                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={text => setConfirmPassword(text)}
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={confirmPassword} />
                        </View>
                        <View style={styles.formAction}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleSignup();
                                }}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Navigation to Signup */}
                    <View style={styles.LoginContainer}>
                        <Text style={styles.LoginText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.LoginLink}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView >
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    // Header
    title: {
        fontSize: 31,
        fontWeight: '700',
        marginBottom: 6,
        color: '#075eec',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
    },

    // Inputs
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
    },
    // Forms
    form: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    formAction: {
        marginTop: 4,
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
    // others
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        paddingHorizontal: 24,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#e8ecf4',
    },
    // Login link
    LoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    LoginText: {
        fontSize: 16,
        color: '#6b7280',
    },
    LoginLink: {
        fontSize: 16,
        color: '#075eec',
        fontWeight: '600',
    },
});

export default SignUp;
