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
import { signup } from "@/api/auth";

// Import toast directly from react-native-toast-message
import Toast from "react-native-toast-message";

export default function SignupScreen() {
  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const passwordValue = watch("password");

  // Local state for toggling password visibility.
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mutation to call the signup API.
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: data.message || "Your account has been created.",
      });
      reset();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Signup Error",
        text2: error?.message || "An error occurred during signup.",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <VStack className="p-5 gap-8 mt-6">
      {/* Header */}
      <VStack>
        <Text className={`${styles.header1} ${styles.yellow}`}>التسجيل</Text>
      </VStack>

      <VStack className="gap-3">
        {/* Username Field */}
        <FormControl className="w-full" isInvalid={!!errors.username} size="md" isRequired>
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>اسم المستخدم</Text>
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="username"
            defaultValue=""
            rules={{
              required: "اسم المستخدم مطلوب",
              minLength: { value: 3, message: "يجب أن يكون على الأقل 3 أحرف." },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  className={`${styles.par2}`}
                  placeholder="أدخل اسم المستخدم الخاص بك"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          <FormControlHelper className="ml-auto">
            <FormControlHelperText>
              <Text className={`${styles.cap} ${styles.gray2}`}>يجب أن يكون على الأقل 3 أحرف.</Text>
            </FormControlHelperText>
          </FormControlHelper>
          {errors.username && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.username.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        {/* Email Field */}
        <FormControl className="w-full" isInvalid={!!errors.email} size="md" isRequired>
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>البريد الإلكترونيّ</Text>
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: "البريد الإلكترونيّ مطلوب",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "صيغة البريد الإلكتروني غير صحيحة" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  className={`${styles.par2} ${styles.gray2}`}
                  placeholder="أدخل بريدك الإلكتروني"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.email && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.email.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        {/* Password Field with Visibility Toggle */}
        <FormControl className="w-full" isInvalid={!!errors.password} size="md" isRequired>
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>كلمة السّرّ</Text>
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
          <FormControlHelper className="ml-auto">
            <FormControlHelperText>
              <Text className={`${styles.cap} ${styles.gray2}`}>يجب أن تكون 6 أحرف على الأقل.</Text>
            </FormControlHelperText>
          </FormControlHelper>
          {errors.password && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.password.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        {/* Confirm Password Field with Visibility Toggle */}
        <FormControl className="w-full" isInvalid={!!errors.confirmPassword} size="md" isRequired>
          <FormControlLabel className="ml-auto">
            <FormControlLabelText>
              <Text className={`${styles.par1} ${styles.gray1}`}>تأكيد كلمة السّرّ</Text>
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            rules={{
              required: "تأكيد كلمة السّرّ مطلوب",
              validate: (value) => value === passwordValue || "كلمتا السّر غير متطابقتين",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="flex-row-reverse">
                <InputField
                  style={{ flex: 1 }}
                  className={`${styles.par2} ${styles.gray2}`}
                  placeholder="أدخل كلمة السّرّ مرة أخرى"
                  secureTextEntry={!showConfirmPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FontAwesome
                  className="p-2"
                  name={showConfirmPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="grey"
                  onPress={() => setShowConfirmPassword(prev => !prev)}
                />
              </Input>
            )}
          />
          {errors.confirmPassword && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.confirmPassword.message}</FormControlErrorText>
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
        <HStack className="text-stone-500">
          <Text className={`${styles.par2} mx-auto`}>__________</Text>
          <Text className={`${styles.par1} mx-auto`}>أو المتابعة باستخدام</Text>
          <Text className={`${styles.par2} mx-auto`}>__________</Text>
        </HStack>
        <HStack className="mx-auto gap-10">
          <FontAwesome name="google" size={30} color="grey" />
          <FontAwesome name="twitter" size={30} color="grey" />
        </HStack>
        <HStack className="flex-row-reverse mx-auto gap-2">
          <Text className={`${styles.par1} text-black mx-auto`}>لديك حساب؟</Text>
          <Text
            className={`${styles.par1} ${styles.yellow} underline text-black mx-auto`}
            onPress={() => console.log("Navigate to login")}
          >
            تسجيل الدّخول
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}