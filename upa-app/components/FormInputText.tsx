import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export function FormTextInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  secureTextEntry,
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
          <TextInput
            value={(value ?? "") as string}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              borderColor: error ? "crimson" : "#ccc",
              padding: 12,
              borderRadius: 10,
            }}
          />
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
