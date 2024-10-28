import React from "react";
import { View, SafeAreaView, Image, StyleSheet, Text } from "react-native";
import { colors } from "../../constants/Colors";
import Icons from "../Icons/Icons";
import { fontSize, iconSize, spacing } from "../../constants";

const ChatMemberCard = ({ newMsgShow, readMsg }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.storyAvatar}
        source={{
          uri: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.chatContent}>
          <Text style={styles.memberName}>Angel Curtis</Text>
          <Text style={{ color: colors.color_light }}>02:11</Text>
        </View>
        {newMsgShow ? (
          <View style={styles.chatContent}>
            <Text style={styles.newMsg}>Lorem ipsum dolor sit amet.</Text>
            <Text style={styles.badge}>2</Text>
          </View>
        ) : (
          <View style={styles.chatContent}>
            <Icons
              name={"checkmark-done"}
              color={readMsg && colors.color_yellow}
              size={iconSize.icon_xsm}
            />
            <Text style={styles.sendMsg}>Lorem ipsum dolor sit amet.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatMemberCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.spacing_sx,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chatContent: {
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.spacing_sm,
  },
  memberName: {
    fontSize: fontSize.font_size_lg,
    fontWeight: "500",
  },
  newMsg: {
    fontWeight: "500",
  },
  sendMsg: {
    color: colors.color_light,
    flex: 1,
  },
  readMsgStatus: {
    color: colors.color_yellow,
  },
  badge: {
    backgroundColor: colors.color_yellow,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    textAlign: "center",
  },
});
