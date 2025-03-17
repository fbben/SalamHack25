
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useEffect } from "react";
import { I18nManager } from "react-native";
import {
    useFonts,
    ReadexPro_200ExtraLight,
    ReadexPro_300Light,
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold,
} from '@expo-google-fonts/readex-pro';
import Footer from "@/components/custom/Footer"

//
//everything in layout will be rendered before any other page under /app.
//the folder /app will contain the app screens.
export default function RootLayout() {

    //RTL support:
    useEffect(() => {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
    }, []);

    //upload font:
    let [fontsLoaded] = useFonts({
        ReadexPro_200ExtraLight,
        ReadexPro_300Light,
        ReadexPro_400Regular,
        ReadexPro_500Medium,
        ReadexPro_600SemiBold,
        ReadexPro_700Bold,
    });

    if (!fontsLoaded) {
        console.log("Font is not loaded!");
    } else {
        return (
            <GluestackUIProvider>
                <Stack></Stack>
                <Footer />
            </GluestackUIProvider>);
    }
}