import React, { ReactElement } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type Props = {
  title: string;
  onPress: () => void;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;

  loading?: boolean;
  disabled?: boolean;

  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  hitSlop?: number;
};

const base = {
  radius: 12,
  gap: 10,
};

function containerStyle(
  state: PressableStateCallbackType,
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth?: boolean,
  disabled?: boolean,
): ViewStyle {
  const isDisabled = !!disabled;
  const isPressed = state.pressed && !isDisabled;

  const paddings: Record<ButtonSize, { py: number; px: number; fs: number }> = {
    sm: { py: 10, px: 12, fs: 14 },
    md: { py: 12, px: 14, fs: 16 },
    lg: { py: 14, px: 16, fs: 18 },
  };

  const v: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: "#111827",
      borderColor: "#111827",
      borderWidth: 1,
    },
    secondary: {
      backgroundColor: "#FFFFFF",
      borderColor: "#D1D5DB",
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      borderWidth: 1,
    },
    danger: {
      backgroundColor: "#B91C1C",
      borderColor: "#B91C1C",
      borderWidth: 1,
    },
  };

  return {
    borderRadius: base.radius,
    paddingVertical: paddings[size].py,
    paddingHorizontal: paddings[size].px,
    alignItems: "center",
    justifyContent: "center",
    width: fullWidth ? "100%" : undefined,

    // Estados
    opacity: isDisabled ? 0.5 : isPressed ? 0.9 : 1,

    // “Elevación” simple
    transform: [{ scale: isPressed ? 0.99 : 1 }],

    ...v[variant],
  };
}

function labelStyle(variant: ButtonVariant, size: ButtonSize): TextStyle {
  const colors: Record<ButtonVariant, string> = {
    primary: "#FFFFFF",
    secondary: "#111827",
    ghost: "#111827",
    danger: "#FFFFFF",
  };

  const fontSizes: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 };

  return {
    fontSize: fontSizes[size],
    fontWeight: "600",
    color: colors[variant],
  };
}

export function ProButton({
  title,
  onPress,
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = true,
  style,
  textStyle,
  hitSlop = 10,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={(state) => [
        containerStyle(state, variant, size, fullWidth, isDisabled),
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: base.gap,
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            {iconLeft ? (
              <View style={{ marginRight: 2 }}>{iconLeft}</View>
            ) : null}
            <Text style={[labelStyle(variant, size), textStyle]}>{title}</Text>
            {iconRight ? (
              <View style={{ marginLeft: 2 }}>{iconRight}</View>
            ) : null}
          </>
        )}
      </View>
    </Pressable>
  );
}
