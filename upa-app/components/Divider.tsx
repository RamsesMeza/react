import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label?: string;
  color?: string;
  textColor?: string;
  thickness?: number;
  spacing?: number;
};

export function Divider({
  label,
  color = "#E5E7EB",
  textColor = "#6B7280",
  thickness = 1,
  spacing = 12,
}: Props) {
  return (
    <View style={[styles.container, { marginVertical: spacing }]}>
      <View
        style={[styles.line, { backgroundColor: color, height: thickness }]}
      />

      {label ? (
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      ) : null}

      <View
        style={[styles.line, { backgroundColor: color, height: thickness }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
  },
  text: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "500",
  },
});
