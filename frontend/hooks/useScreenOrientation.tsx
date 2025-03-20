import { useFocusEffect } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";

const useScreenOrientation = (
  orientation: ScreenOrientation.OrientationLock
) => {
  useFocusEffect(() => {
    // Lock orientation when entering the screen
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(orientation);
      } catch (e) {
        console.error("Failed to lock orientation:", e);
      }
    };
    lockOrientation();

    // Unlock orientation when leaving the screen
    return async () => {
      try {
        await ScreenOrientation.unlockAsync();
      } catch (e) {
        console.error("Failed to unlock orientation:", e);
      }
    };
  });
};

export default useScreenOrientation;
