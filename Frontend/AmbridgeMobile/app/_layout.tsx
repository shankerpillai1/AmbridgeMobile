import { Tabs } from 'expo-router';

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="tours" options={{ title: 'Tours' }} />
            <Tabs.Screen name="info" options={{ title: 'Info' }} />
        </Tabs>
    );
}