import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GoogleSignin, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const loginUser = async (email: any, password: any) => {
    try {
        const response = await axios.post('http://192.168.137.1/api/auth/login', {
            email,
            password,
        });
        const { token, user } = response.data;

        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userDetails', JSON.stringify(user));
        return true;
    } catch (error) {
        return false;
    }
};

type Props = {
    navigation: NavigationProp<any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '292869626734-7bj0lbdibfemgpqmt5gn6d942fp4gu94.apps.googleusercontent.com', // Replace with your Firebase web client ID
            offlineAccess: true,
            scopes: ['email', 'profile'],
        });
    }, []);

    const handleLogin = async () => {
        const condition = await loginUser(email.toLowerCase(), password);
        if (condition) {
            Alert.alert('Successfully logged in');
            navigation.navigate('Dashboard');
        } else {
            Alert.alert('Invalid email or password');
        }
        setEmail('');
        setPassword('');
    };

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {idToken, user} = await GoogleSignin.signIn();
            console.log(user);
                // const userInfo = response.data;
                console.log(user);

                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                const response = await auth().signInWithCredential(googleCredential);
                console.log(response);
                // await AsyncStorage.setItem('userToken', user.user.uid);
                Alert.alert('Successfully logged in with Google');
                // navigation.navigate('Dashboard');

        } catch (error) {
            if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Sign-in canceled');
            } else if ((error as any).code === statusCodes.IN_PROGRESS) {
                Alert.alert('Sign-in in progress');
            } else if ((error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Play services not available');
            }//  else if ((error as any).message) {
            //     Alert.alert((error as any).message);
            // }
            else {
                console.error('Google Sign-In Error', JSON.stringify(error));
                Alert.alert('An Unknown error occurred while signing in with Google');
            }
        }

    };


    // const handlefbSignIn = async () => {
    //     Alert.alert('fb sign in');
    // };
    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>LOGIN</Text>
                    </View>
                    <View style={styles.form}>


                    <View style={styles.input}>
                            <Text style={styles.inputLabel}>Username/Email</Text>
                            <TextInput
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={text => setEmail(text)}
                                placeholder="abc@example.com"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={email}
                            />
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
                                value={password}
                            />
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={handleLogin}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Sign in</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={handleGoogleSignIn}>
                                <View style={[styles.btn, styles.GoogleSigninButton]} >
                                    <Text style={styles.btnText}>Sign in with Google</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* <View style={styles.formAction}>
                            <TouchableOpacity onPress={handlefbSignIn}>
                                <View style={[styles.btn, styles.FbSigninButton]}>
                                    <Text style={styles.btnText}>Sign in with Facebook</Text>
                                </View>
                            </TouchableOpacity>
                        </View> */}


                    </View>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signupLink}> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupText: {
        fontSize: 16,
        color: '#6b7280',
    },
    signupLink: {
        fontSize: 16,
        color: '#075eec',
        fontWeight: '600',
    },
    FbSigninButton: {
        backgroundColor: '#1877F2',
        borderColor: '#1877F2',
    },
    GoogleSigninButton: {
        backgroundColor: '#DB4437',
        borderColor: '#DB4437',
    },
});

export default LoginScreen;
