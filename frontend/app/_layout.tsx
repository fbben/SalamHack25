
import { Tabs, Stack } from "expo-router";
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
import * as React from 'react';

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
        console.log("Font is loaded!");
        return (
            <GluestackUIProvider>
                {/* <Tabs></Tabs> */}
                <Stack></Stack>
                {/* <Footer /> */}
            </GluestackUIProvider>
        );
    }
}

//we must define it in he pages at least once, it works, it needs explanation!
const styles = {
    header1: "font-readex-bold text-4xl text-right",
    header2: "font-readex-semibold text-2xl text-right",
    par1: "font-readex-regular text-xl text-right",
    par2: "font-readex-regular text-sm text-right",
    tag: "font-readex-bold text-sm text-right",
    cap: "font-readex-regular text-xs text-right",
    yellow: "text-[#FECC32]",
    gray1: "text-[#484C52]",
    gray2: " text-[#737373]",
    yellow_button: " bg-[#FECC32] hover:bg-yellow-400 text-[#484C52]"
};