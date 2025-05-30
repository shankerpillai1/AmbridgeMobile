import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#8B3A3A',         // link color
        background: '#fff',         // or change to match your red too
        card: '#8B3A3A',            // tab bar and headers
        text: '#ffffff',            // tab text, header text
        border: '#8B3A3A',
    },
};


export default function Layout() {
    return (


        <ThemeProvider value={MyTheme}>
        <Tabs

                screenOptions={({ route }) => ({

                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#8B3A3A',
                        borderTopWidth: 0,
                    },
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#FFD6D6', // Light pink or grayish-red for inactive

                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'home') iconName = 'home';
                    else if (route.name === 'tours') iconName = 'map';
                    else if (route.name === 'info') iconName = 'information';
                    else if (route.name === 'businesses') iconName = 'bag-sharp';
                    

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
            })}

        >
            <Tabs.Screen
                name="index"
                options={{
                    href: null, // Prevents it from showing in tab bar
                }}
            />
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="tours" options={{ title: 'Tours' }} />
            <Tabs.Screen name="businesses" options={{ title: 'Businesses'}}/>
            <Tabs.Screen name="info" options={{ title: 'Info' }} />
        </Tabs>
        </ThemeProvider>
    );
}