import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, Image, Button, ActivityIndicator, View } from 'react-native';
import { supabase } from '@/lib/supabaseClient';

export default function TourDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        if (!id) return;

        (async () => {
            const { data, error } = await supabase
                .from('locations')
                .select('*')
                .eq('id', id)
                .single();

            if (error) console.error(error);
            else setLocation(data);
        })();
    }, [id]);

    if (!location) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    return (
        <ScrollView style={{ padding: 16 }}>
            <View style={{ marginTop: 24, marginBottom: 16 }}>
                <Button title="Back to Tour" onPress={() => router.push('/tours/TourOne')} />
            </View>

            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>{location.title}</Text>
            <Text style={{ marginBottom: 12 }}>{location.description}</Text>
            {location.description_extended && (
                <Text style={{ marginBottom: 16 }}>{location.description_extended}</Text>
            )}

            {location.image_url && (
                <Image source={{ uri: location.image_url }} style={{ width: '100%', height: 200, marginBottom: 16 }} />
            )}
            {location.image2_url && (
                <Image source={{ uri: location.image2_url }} style={{ width: '100%', height: 200, marginBottom: 16 }} />
            )}
            {location.image3_url && (
                <Image source={{ uri: location.image3_url }} style={{ width: '100%', height: 200, marginBottom: 16 }} />
            )}
            {location.image4_url && (
                <Image source={{ uri: location.image4_url }} style={{ width: '100%', height: 200, marginBottom: 16 }} />
            )}
        </ScrollView>
    );
}
