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
import { Pressable } from "react-native";

import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";


export default function LoginScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Local state for toggling password visibility.
  const [showPassword, setShowPassword] = useState(false);

  // Mutation to call the login API.
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: data.message || "Welcome back!",
      });
      // Optionally, you could reset the form or navigate further here.
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: error?.message || "An error occurred during login.",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <VStack className="p-5 gap-8 mt-6">
      {/* Header */}
      <VStack>
        <Text className={`${styles.header1} ${styles.yellow}`}>
          تسجيل الدّخول
        </Text>
        <Text className={`${styles.par2} ${styles.gray2} mt-2`}>
          يرجى تسجيل الدخول للمتابعة
        </Text>
      </VStack>

      <VStack className="gap-3">
        {/* Identifier Field */}
        <FormControl className="w-full" isInvalid={!!errors.identifier} size="md" isRequired>
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>
              المُعرِّف
              </Text>
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="identifier"
            defaultValue=""
            rules={{ required: "البريد الإلكتروني/اسم المستخدم مطلوب" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  className={`${styles.par2} ${styles.gray2}`}
                  placeholder="أدخل بريدك الإلكتروني أو اسم المستخدم"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.identifier && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {errors.identifier.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        {/* Password Field with Visibility Toggle */}
        <FormControl className="w-full" isInvalid={!!errors.password} size="md" isRequired>
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>
                كلمة السّرّ
              </Text>
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: "كلمة السّرّ مطلوبة",
              minLength: { value: 6, message: "يجب أن تكون 6 أحرف على الأقل." },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="flex-row-reverse">
                <InputField
                  style={{ flex: 1 }}
                  className={`${styles.par2} ${styles.gray2}`}
                  placeholder="أدخل كلمة السّرّ"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FontAwesome
                  className="p-2"
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="grey"
                  onPress={() => setShowPassword(prev => !prev)}
                />
              </Input>
            )}
          />
          {errors.password && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {errors.password.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        {/* Submit Button */}
        <Button
          className={`${styles.yellow_button} mt-2`}
          onPress={handleSubmit(onSubmit)}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <ButtonText className={`${styles.par1} ${styles.gray1}`}>
              جارٍ المعالجة...
            </ButtonText>
          ) : (
            <ButtonText className={`${styles.par1} ${styles.gray1}`}>
              تسجيل الدّخول
            </ButtonText>
          )}
        </Button>

        {/* Social Login & Navigation Links */}
        <HStack className="text-stone-500 mt-4">
          <Text className={`${styles.par2} mx-auto`}>__________</Text>
          <Text className={`${styles.par1} mx-auto`}>
            أو المتابعة باستخدام
          </Text>
          <Text className={`${styles.par2} mx-auto`}>__________</Text>
        </HStack>
        <HStack className="mx-auto gap-10 mt-2">
          <FontAwesome name="google" size={30} color="grey" />
          <FontAwesome name="twitter" size={30} color="grey" />
        </HStack>
        <HStack className="flex-row-reverse mx-auto gap-2 mt-4">
          <Text className={`${styles.par1} text-black mx-auto`}>
            ليس لديك حساب؟
          </Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text className={`${styles.par1} ${styles.yellow} underline text-black mx-auto`}>
              إنشاء حساب
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </VStack>
    </ScrollView>
  );
}
