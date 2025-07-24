import { useRouter } from 'expo-router';
import { View, Button, StyleSheet } from 'react-native';

export default function ToursScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Button
                title="All Locations"
                onPress={() => router.push('./tours/MapScreen')}
            />
            <View style={styles.spacer} />
            <Button
                title="Markers"
                onPress={() => router.push('./tours/TourOne')}
            />
            <View style={styles.spacer} />
            <Button
                title="Businesses"
                onPress={() => router.push('./tours/bTour')}
            />
            <View style={styles.spacer} />
            <Button
                title="Resources"
                onPress={() => router.push('./tours/resources')}
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
    spacer: {
        height: 16,
    },
});