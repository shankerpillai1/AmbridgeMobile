import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useFonts, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { supabase } from '@/lib/supabaseClient';

interface FacebookPost {
    id: number;
    text: string;
    image_url: string | null;
}

const bannerImages = [
    require('../assets/images/ambridgeView.jpeg'),
    require('../assets/images/ambridgeView2.jpeg'),
    require('../assets/images/oldEconomy.jpeg'),
];

export default function HomeScreen() {
    const [fontsLoaded] = useFonts({ Cinzel_700Bold });
    const [posts, setPosts] = useState<FacebookPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('facebook_posts')
                .select('*')
                .order('id', { ascending: false })
                .limit(10);
            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data);
            }
            setLoading(false);
        }
        fetchPosts();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.spacer} />
            <Text style={styles.header}>Home</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginVertical: 40 }} />
            ) : (
                <View style={styles.feedContainer}>
                    {posts.map((post) => (
                        <View key={post.id} style={styles.postContainer}>
                            {post.image_url && (
                                <Image source={{ uri: post.image_url }} style={styles.postImage} />
                            )}
                            <Text style={styles.postText}>{post.text}</Text>
                        </View>
                    ))}
                </View>
            )}

            {bannerImages.map((img, index) => (
                <Image key={index} source={img} style={styles.bannerImage} resizeMode="cover" />
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
    spacer: {
        height: 24,
    },
    header: {
        fontSize: 32,
        fontFamily: 'Cinzel_700Bold',
        textAlign: 'center',
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    feedContainer: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    postContainer: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 6,
        marginBottom: 10,
    },
    postText: {
        fontSize: 16,
        color: '#333',
    },
    bannerImage: {
        width: Dimensions.get('window').width,
        height: 180,
        marginBottom: 12,
    },
    welcomeText: {
        fontSize: 22,
        fontFamily: 'Cinzel_700Bold',
        fontWeight: '600',
        textAlign: 'center',
        padding: 16,
        color: '#333',
    },
});