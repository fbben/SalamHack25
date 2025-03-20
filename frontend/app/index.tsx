import { Text } from "@/components/ui/text";
import { styles } from "@/styles";

import { Pressable } from "react-native";

import { useRouter } from "expo-router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <Pressable onPress={() => router.replace("/login")}>
        <Text
          className={`${styles.par1} ${styles.yellow} underline text-black mx-auto`}
        >
          تسجيل الدّخول
        </Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/Library")}>
        <Text
          className={`${styles.par1} ${styles.yellow} underline text-black mx-auto`}
        >
          library
        </Text>
      </Pressable>
    </>
  );
}
