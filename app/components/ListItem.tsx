import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  style?: object;
  rightIcon?: React.ReactNode | null;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  onPress,
  style,
  rightIcon,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default ListItem;
