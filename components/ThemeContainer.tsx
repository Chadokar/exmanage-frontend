import { ScrollView, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedContainer({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <ScrollView
      style={[
        {
          backgroundColor,
          display: "flex",
          flexDirection: "column",
          paddingTop: 32,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
