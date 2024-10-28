import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { spacing } from "../../constants/Spacing";
import { fontSize } from "../../constants/FontSize";

const StoryAvatar = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.storyAvatar}
        source={{
          uri: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
        }}
      />
      <Text style={styles.storyName}>Terry</Text>
    </View>
  );
};

export default StoryAvatar;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.spacing_sm,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: spacing.spacing_sm,
  },
  storyName: {
    fontSize: fontSize.font_size_sm,
    textAlign: "center",
  },
});
