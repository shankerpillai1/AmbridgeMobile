import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'expo-router';

interface Location {
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    description: string;
    image_url: string;
    tour: string;
}

export default function TourOne() {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from('locations')
                .select('*')
                .eq('tour', 'M');

            if (error) {
                console.error('Supabase error:', error);
                return;
            }

            const markersJs = data.map((loc: Location) => `
        L.marker([${loc.latitude}, ${loc.longitude}])
          .addTo(map)
          .on('click', () => {
            window.ReactNativeWebView.postMessage('${loc.id}');
          });
      `).join('\n');

            const leafletHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <style>
            #map { height: 100vh; width: 100vw; }
            body { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <script>
            const map = L.map('map').setView([40.5967, -80.2317], 17);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19
            }).addTo(map);
            ${markersJs}
          </script>
        </body>
        </html>
      `;

            setHtmlContent(leafletHtml);
        })();
    }, []);

    if (!htmlContent) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            javaScriptEnabled
            style={{ flex: 1 }}
            onMessage={(event) => {
                const locationId = event.nativeEvent.data;
                router.push({
                    pathname: '/tours/TourDetail',
                    params: { id: locationId },
                });
            }}
        />
    );
}