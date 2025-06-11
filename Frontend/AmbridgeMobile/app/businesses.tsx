import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Business {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url: string;
}

const CATEGORIES = [
    'Coffeeshop',
    'Restaurant',
    'Grocery',
    'Automotive/Gas',
    'Antique Shop',
    'Other',
];

export default function BusinessScreen() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [openCategories, setOpenCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchBusinesses() {
            const { data, error } = await supabase.from('businesses').select('*');
            if (error) {
                console.error(error);
            } else {
                setBusinesses(data);
            }
            setLoading(false);
        }
        fetchBusinesses();
    }, []);

    if (loading) return <Text style={{ margin: 20 }}>Loading...</Text>;

    const grouped: { [key: string]: Business[] } = {};
    CATEGORIES.forEach(cat => {
        grouped[cat] = businesses.filter(b => b.category === cat);
    });

    const toggleCategory = (cat: string) => {
        setOpenCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const openDetail = (id: number) => {
        router.push({ pathname: './BusinessDetail', params: { id: id.toString() } });
    };

    return (
        <ScrollView style={styles.container}>
            {CATEGORIES.map(cat => (
                <View key={cat} >
                    <View style={styles.spacer} />
                    <TouchableOpacity style={styles.header} onPress={() => toggleCategory(cat)}>
                        <Text style={styles.headerText}>{cat}</Text>
                        <Ionicons
                            name={openCategories.includes(cat) ? 'chevron-up' : 'chevron-down'}
                            size={20}
                        />
                    </TouchableOpacity>
                    {openCategories.includes(cat) &&
                        grouped[cat].map(b => (
                            <TouchableOpacity
                                key={b.id}
                                style={styles.businessButton}
                                onPress={() => openDetail(b.id)}
                            >
                                <Text style={styles.businessText}>{b.title}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        padding: 12,
        marginTop: 8,
        borderRadius: 4,
    },
    headerText: { fontSize: 18, fontWeight: 'bold' },
    businessButton: {
        padding: 10,
        paddingLeft: 20,
    },
    businessText: {
        fontSize: 16,
        color: '#0066cc',
    },
    spacer: {
        height: 16,
    },
});