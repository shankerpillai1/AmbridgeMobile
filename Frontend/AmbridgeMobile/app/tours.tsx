import { useRouter } from 'expo-router';
import { View, Button, StyleSheet } from 'react-native';

export default function ToursScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Button
                title="Walking Tour 1"
                onPress={() => router.push('./tours/MapScreen')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});