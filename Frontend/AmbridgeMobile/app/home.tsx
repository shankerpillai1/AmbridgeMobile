import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

// Importing local images using require()
const bannerImages = [
    require('../assets/images/ambridgeView.jpeg'),
    require('../assets/images/ambridgeView2.jpeg'),
    require('../assets/images/oldEconomy.jpeg'),
];

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.spacer} />
            <Text style={styles.header}>Home</Text>

            {bannerImages.map((img, index) => (
                <Image
                    key={index}
                    source={img}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
            ))}

            <Text style={styles.welcomeText}>Welcome to Ambridge Mobile!</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 16,
        backgroundColor: '#fff',
    },
    bannerImage: {
        width: Dimensions.get('window').width,
        height: 180,
        marginBottom: 12,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        padding: 16,
        color: '#333',
    },
    spacer: {
        height: 24,
    },
});