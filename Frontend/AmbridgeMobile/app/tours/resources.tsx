import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native';
import { supabase } from '@/lib/supabaseClient';

interface Resource {
    id: number;
    description: string;
    image_url: string;
}

export default function ResourcesScreen() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchResources() {
            const { data, error } = await supabase.from('resources').select('*');
            if (error) {
                console.error('Error fetching resources:', error);
            } else {
                setResources(data || []);
            }
            setLoading(false);
        }

        fetchResources();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {resources.map(resource => (
                    <View key={resource.id} style={styles.item}>
                        <Text style={styles.description}>{resource.description}</Text>
                        {resource.image_url ? (
                            <TouchableOpacity onPress={() => setSelectedImage(resource.image_url)}>
                                <Image
                                    source={{ uri: resource.image_url }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                ))}
            </ScrollView>

            {/* Fullscreen Modal for Image */}
            <Modal visible={!!selectedImage} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <Pressable style={styles.modalBackground} onPress={() => setSelectedImage(null)}>
                        <Image
                            source={{ uri: selectedImage! }}
                            style={styles.fullscreenImage}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        backgroundColor: 'white',
    },
    item: {
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    image: {
        width: Dimensions.get('window').width - 32,
        height: 200,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullscreenImage: {
        width: '100%',
        height: '100%',
    },
});