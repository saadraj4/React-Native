import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen: React.FC = () => {
    const latitude = 37.7749; // Replace with your latitude
    const longitude = -122.4194; // Replace with your longitude

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.05, // Controls the zoom level
                    longitudeDelta: 0.05, // Controls the zoom level
                }}
            >
                <Marker
                    coordinate={{ latitude, longitude }}
                    title="Your Location"
                    description="This is where you're pointing to!"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapScreen;
