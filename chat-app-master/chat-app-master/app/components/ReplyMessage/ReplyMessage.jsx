import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "../../constants";

const ReplyMessage = () => {
  return (
    <View style={styles.replyContainer}>
      <Text style={styles.name}>Zaire Dorwart</Text>
      <Text style={styles.text}>Lorem ipsum dolor sit amet.</Text>
    </View>
  );
};

export default ReplyMessage;
const styles = StyleSheet.create({
  replyContainer: {
    paddingLeft: spacing.spacing_sm,
    borderLeftWidth: 1,
  },
  name: {
    fontSize: fontSize.font_size_sm,
    fontWeight: "500",
  },
  text: {
    fontSize: fontSize.font_size_sm,
    color: "#3C3C3C",
  },
});
