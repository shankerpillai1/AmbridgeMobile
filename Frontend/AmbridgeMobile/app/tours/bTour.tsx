import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { supabase } from '@/lib/supabaseClient';

interface Business {
    id: number;
    title: string;
    category: string;
    description: string;
    latitude: number;
    longitude: number;
    image_url: string;
}

export default function Tourb() {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from('businesses')
                .select('*');

            if (error) {
                console.error('Supabase error:', error);
                return;
            }

            if (!data || data.length === 0) {
                console.warn("No data found.");
                return;
            }

            // JS for markers and bounds
            const markersJs = data.map((biz: Business) => `
        const marker${biz.id} = L.marker([${biz.latitude}, ${biz.longitude}])
          .addTo(map)
          .bindPopup(\`
            <div style="max-width: 320px; padding: 8px;">
              <h3 style="margin: 0 0 6px 0; font-size: 18px;">${biz.title}</h3>
              <h4 style="margin: 0 0 6px 0; font-size: 14px; color: gray;">${biz.category}</h4>
              <p style="margin: 0 0 10px 0; font-size: 13px;">${biz.description}</p>
              <img src="${biz.image_url}" alt="Image" style="width: 100%; height: auto; border-radius: 8px;" />
            </div>
          \`);
        bounds.push(marker${biz.id}.getLatLng());
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
            const map = L.map('map');
            const bounds = [];
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19
            }).addTo(map);

            ${markersJs}

            if (bounds.length > 0) {
              map.fitBounds(bounds);
            } else {
              map.setView([40.5967, -80.2317], 15); // fallback
            }
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