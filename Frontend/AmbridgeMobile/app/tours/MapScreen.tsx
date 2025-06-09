
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { supabase } from '@/lib/supabaseClient';

interface Location {
    id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
}

export default function MapScreen() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLocations() {
            const { data, error } = await supabase.from('locations').select('*');
            if (error) console.error(error);
            else setLocations(data);
            setLoading(false);
        }

        fetchLocations();
    }, []);

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Ambridge Tour 1</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <style>
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        const map = L.map('map').setView([40.5937, -80.2256], 14); // Ambridge center
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const locations = PLACEHOLDER_DATA;

        locations.forEach(({ title, description, latitude, longitude }) => {
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup('<strong>' + title + '</strong><br>' + description);
        });
      </script>
    </body>
    </html>
  `;

    const injectedHtml = html.replace(
        'PLACEHOLDER_DATA',
        JSON.stringify(locations)
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <WebView
            originWhitelist={['*']}
            source={{ html: injectedHtml }}
            javaScriptEnabled
            domStorageEnabled
        />
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});