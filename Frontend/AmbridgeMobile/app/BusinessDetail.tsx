import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ? Added
import { supabase } from '@/lib/supabaseClient';

interface Business {
    id: number;
    title: string;
    description: string;
    image_url: string;
}

export default function BusinessDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        supabase
            .from('businesses')
            .select('*')
            .eq('id', id)
            .single()
            .then(({ data, error }) => {
                if (error) console.error(error);
                else setBusiness(data);
                setLoading(false);
            });
    }, [id]);

    if (loading || !business) return <Text style={{ margin: 20 }}>Loading...</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={() => router.push('/businesses')} style={styles.backButton}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="arrow-back" size={20} color="#b22222" />
                    <Text style={styles.backButtonText}>Back</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.title}>{business.title}</Text>
            <Image
                source={{ uri: business.image_url }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.description}>{business.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 12,
        borderRadius: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#b22222',
        marginLeft: 6,
    },
    spacer: {
        height: 24,
    },
});