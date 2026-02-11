import React, { ReactElement } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  secureTextEntry?: boolean;
  icon?: ReactElement;
};

export function FormTextInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  secureTextEntry,
  icon,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={{ marginBottom: 14 }}>
          {/* CONTENEDOR INPUT + ICONO */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: error ? "crimson" : "#ccc",
              borderRadius: 10,
              paddingHorizontal: 12,
            }}
          >
            {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}

            <TextInput
              value={(value ?? "") as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              style={{
                flex: 1,
                paddingVertical: 12,
              }}
            />
          </View>

          {error?.message ? (
            <Text style={{ marginTop: 6, color: "crimson" }}>
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
}
