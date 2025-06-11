
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { supabase } from '@/lib/supabaseClient';

interface Location {
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    description: string;
    image_url: string;
}

export default function MapScreen() {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.from('locations').select('*');
            if (error) {
                console.error('Supabase error:', error);
                return;
            }

            const markersJs = data.map((loc: Location) => `
        L.marker([${loc.latitude}, ${loc.longitude}])
          .addTo(map)
          .bindPopup(\`
              <div style="max-width: 320px; padding: 8px;">
                <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">${loc.title || "Location"}</p>
                <p style="margin: 0 0 10px 0; font-size: 14px;">${loc.description}</p>
                <img src="${loc.image_url}" alt="Image" style="width: 100%; height: auto; border-radius: 8px;" />
              </div>
            \`);

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
            const map = L.map('map').setView([40.5926, -80.2259], 15);
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
        />
    );
}