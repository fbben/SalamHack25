import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { FontAwesome } from "@expo/vector-icons";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { styles } from "@/styles";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { storeToken, checkStoredToken } from "@/utils/expoStorage";
import { Pressable } from "react-native";

import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

import { Link } from "expo-router";

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
