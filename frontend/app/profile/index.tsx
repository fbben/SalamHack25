import React from "react";
import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "@/styles";
import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "@/api/users"; // adjust the path as needed
import { getStoredToken } from "@/utils/expoStorage";
import Footer from "@/components/custom/Footer";

export default function ProfileScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = await getStoredToken();
      if (!token) {
        throw new Error("No token found");
      }
      return getProfileData(token);
    },
  });

  const profile = data?.data;

  if (isLoading) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack className="p-5 gap-8 mt-6">
          <Text className={`${styles.header1}`}>Loading...</Text>
        </VStack>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack className="p-5 gap-8 mt-6">
          <Text className={`${styles.header1}`}>Error loading profile</Text>
          <Text>{error.message}</Text>
        </VStack>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack className="p-5 gap-8 mt-6">
        {/* Profile Avatar & Name */}
        <VStack className="items-center gap-4">
          <FontAwesome name="user-circle-o" size={80} color="black" />
          <Text className={`${styles.header1}`}>{profile.username}</Text>
        </VStack>

        {/* Username Field (read-only) */}
        <FormControl className="w-full" size="md">
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>
                اسم المستخدم
              </Text>
            </FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              className={`${styles.par2}`}
              value={profile.username}
              editable={false}
            />
          </Input>
        </FormControl>

        {/* Email Field (read-only) */}
        <FormControl className="w-full" size="md">
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>
                البريد الإلكتروني
              </Text>
            </FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              className={`${styles.par2} ${styles.gray2}`}
              value={profile.email}
              editable={false}
            />
          </Input>
        </FormControl>

        {/* Social Icons */}
        <HStack className="mx-auto gap-10">
          <FontAwesome name="google" size={30} color="grey" />
          <FontAwesome name="github" size={30} color="grey" />
        </HStack>
        <Footer />
      </VStack>
    </ScrollView>
  );
}