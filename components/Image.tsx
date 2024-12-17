import React, { useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ImageScreen: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Function to request camera and storage permissions at runtime
    const requestPermissions = async () => {
        const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
        const storagePermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        return { cameraPermission, storagePermission };
    };

    // Function to handle taking a photo
    const handleTakePhoto = async () => {
        // Request permissions when user clicks on Take Photo
        const { cameraPermission } = await requestPermissions();

        if (cameraPermission === RESULTS.GRANTED) {
            launchCamera(
                {
                    mediaType: 'photo',
                    saveToPhotos: true,
                },
                (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.errorMessage) {
                        console.error('Image Picker Error: ', response.errorMessage);
                        Alert.alert('Error', 'Failed to take photo');
                    } else {
                        const uri = response.assets?.[0]?.uri || null;
                        if (uri) {
                            setSelectedImage(uri);
                        }
                    }
                }
            );
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos');
        }
    };

    // Function to handle choosing from gallery
    const handleChooseFromGallery = async () => {
        // Request permissions when user clicks on Choose from Gallery
        const { storagePermission } = await requestPermissions();

        if (storagePermission === RESULTS.GRANTED) {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                },
                (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.errorMessage) {
                        console.error('Image Picker Error: ', response.errorMessage);
                        Alert.alert('Error', 'Failed to pick image');
                    } else {
                        const uri = response.assets?.[0]?.uri || null;
                        if (uri) {
                            setSelectedImage(uri);
                        }
                    }
                }
            );
        } else {
            Alert.alert('Permission Denied', 'Storage permission is required to access gallery');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose or Take Image</Text>
            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleChooseFromGallery}>
                <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    imagePreview: {
        marginTop: 20,
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default ImageScreen;
