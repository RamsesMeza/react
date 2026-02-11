import { Divider } from "@/components/Divider";
import { FormTextInput } from "@/components/FormInputText";
import { GoogleIcon } from "@/components/GoogleIcon";
import { ProButton } from "@/components/ProButton";
import { LoginForm, loginSchema } from "@/validations/auth.schema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
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
    Alert.alert("OK", JSON.stringify(data, null, 2));
    onSuccessLogin();
  };

  return (
    <LinearGradient
      colors={[
        "#4863bdff", // claro
        "#2B3E7E", // oscuro (tu color)
        "#344b97ff", // claro
      ]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }} // esquina superior izquierda
      end={{ x: 1, y: 1 }} // esquina inferior derecha
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: "#fff", fontSize: 20, textAlign: "center" },
            ]}
          >
            Universidad Politécnica de Aguascalientes
          </Text>
          <Text style={[styles.text, { color: "#00D4FF" }]}>
            Ingresa a tu cuenta
          </Text>
        </View>

        <View style={styles.formContainer}>
          <ProButton
            title={"Continuar con Google"}
            variant="primary"
            onPress={() => {}}
            iconLeft={<GoogleIcon />}
          />

          <Divider label="O ingresa con tu correo" />

          <Text style={styles.label}>Correo Institucional</Text>
          <FormTextInput<LoginForm>
            control={control}
            name="email"
            placeholder="Email"
            icon={<Ionicons name="mail-outline" size={20} color="#666" />}
          />

          <Text style={styles.label}>Contraseña</Text>
          <FormTextInput<LoginForm>
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
            icon={
              <Ionicons name="lock-closed-outline" size={20} color="#666" />
            }
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "transparent", // importante
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  formContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  label: {
    fontWeight: "500",
    marginBottom: 5,
    color: "#2B3E7E",
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
    backgroundColor: "#2B3E7E",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
