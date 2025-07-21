import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
    return (
        <GluestackUIProvider mode="system">
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#f2f1f1",
                    },
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen
                    name="create-todo"
                    options={{
                        presentation: "modal",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="[edit-todo]"
                    options={{
                        presentation: "modal",
                        headerShown: false,
                    }}
                />
            </Stack>
        </GluestackUIProvider>
    );
}
