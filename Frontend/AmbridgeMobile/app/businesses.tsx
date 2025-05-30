import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '@/lib/supabaseClient';

interface Business {
    id: number;
    title: string;
    description: string;
}
export default function BusinessesScreen() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBusinesses();
    }, []);

    async function fetchBusinesses() {
        const { data, error } = await supabase.from('businesses').select('*');
        if (error) {
            console.error('Error fetching businesses:', error);
        } else {
            setBusinesses(data);
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={businesses}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={<View style={{ height: 50 }} />}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});