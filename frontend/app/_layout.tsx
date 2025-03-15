//
//everything in layout will be rendered before any other page under /app.
//the folder /app will contain the app screens.

import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <Stack></Stack>
         </GluestackUIProvider>
    );
}