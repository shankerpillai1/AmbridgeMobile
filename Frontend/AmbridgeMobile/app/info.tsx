import { View, Text, Image } from 'react-native';

export default function InfoScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
            <View>
                <Text style={{ fontSize: 16, marginBottom: 20, marginTop: 40, textAlign: 'center' }}>
                    Run by Ambridge Borough and Old Economy
                </Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Correspond Ambridge Historic District EDC:
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 16 }}>
                    600 Eleventh Street{"\n"}
                    Ambridge, PA 15003
                </Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Information Historic District Kiosk:
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 16 }}>
                    1398 Church St{"\n"}
                    Ambridge, PA 15003
                </Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    General Inquiries:
                </Text>
                <Text style={{ fontSize: 16 }}>
                    HistoricDistrict@gmail.com
                </Text>
            </View>

            <Image
                source={require('../assets/images/HD_LOGO.jpg')}
                style={{ width: '100%', height: 300, resizeMode: 'contain', marginTop: 20 }}
            />
        </View>
    );
}