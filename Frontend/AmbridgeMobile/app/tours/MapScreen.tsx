import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MapView } from '@maplibre/maplibre-react-native';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // @ts-ignore
                styleUrl="https://demotiles.maplibre.org/style.json"
                zoomLevel={14}
                centerCoordinate={[-79.929, 40.277]} // Ambridge, PA
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});