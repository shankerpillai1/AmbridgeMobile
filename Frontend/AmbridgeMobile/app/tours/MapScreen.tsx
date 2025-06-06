

import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <WebView
                style={styles.map}
                source={{
                    html: `
            <html>
              <body style="margin:0;padding:0">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-80.2397,40.5764,-80.2170,40.6083&layer=mapnik"
                  style="width:100%; height:100%; border:none;"
                ></iframe>
              </body>
            </html>
          `,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});