import { FormTextInput } from "@/components/FormInputText";
import { LoginForm, loginSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSuccessLogin = () => router.replace("/(tabs)/home");

  const onSubmit = async (data: LoginForm) => {
    // aquí llamas tu API
    Alert.alert("OK", JSON.stringify(data, null, 2));
    onSuccessLogin();
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <FormTextInput<LoginForm>
        control={control}
        name="email"
        placeholder="Email"
      />
      <FormTextInput<LoginForm>
        control={control}
        name="password"
        placeholder="password"
      />
      <Button
        title={isSubmitting ? "Enviando..." : "Entrar"}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
