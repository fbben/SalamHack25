//
//everything in layout will be rendered before any other page under /app.
//the folder /app will contain the app screens.
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useEffect } from "react";
import { I18nManager } from "react-native";

export default function RootLayout() {

    //RTL support:
    useEffect(() => {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
    }, []);

    return (
        <GluestackUIProvider>
            <Stack></Stack>
        </GluestackUIProvider>);
}