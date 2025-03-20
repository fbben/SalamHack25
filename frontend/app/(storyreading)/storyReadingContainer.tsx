import { VStack } from "@/components/ui/vstack";
import { StyleSheet, ScrollView } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import useScreenOrientation from "../../hooks/useScreenOrientation";

import StoryReading from "./storyReadingComponent";

export default function storyReadingContainer() {
  useScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <VStack style={styles.vStack}>
        <StoryReading />
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  vStack: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
});
