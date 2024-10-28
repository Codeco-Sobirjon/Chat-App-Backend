import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Icons, StoryAvatar } from "../../components";
import ChatMemberCard from "../../components/ChatMemberCard/ChatMemberCard";
import { colors, fontSize, iconSize, spacing } from "../../constants";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Mengobrol</Text>
        <Icons name={"search-outline"} size={iconSize.icon_md} />
      </View>
      <View style={styles.storiesWrapp}>
        <View style={styles.storiesCard}>
          <View style={styles.storyAvatar}>
            <Icons name={"add-outline"} size={iconSize.icon_md} />
          </View>
          <Text style={styles.storyName}>Add story</Text>
        </View>
        <StoryAvatar />
        <StoryAvatar />
      </View>
      <ScrollView style={styles.chatsWrapp}>
        <View style={styles.heading}>
          <Text style={styles.chatTitle}>Chats</Text>
          <Icons name={"ellipsis-horizontal"} size={iconSize.icon_md} />
        </View>
        <View style={styles.chatMemberList}>
          <Pressable onPress={() => navigation.navigate("Chat")}>
            <ChatMemberCard newMsgShow={true} />
          </Pressable>
          <ChatMemberCard />
          <ChatMemberCard readMsg={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color_white,
    padding: spacing.spacing_md,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.spacing_md,
  },
  title: {
    fontSize: fontSize.font_size_xl,
    fontWeight: "500",
  },
  storiesWrapp: {
    flexDirection: "row",
    marginTop: spacing.spacing_md,
    gap: spacing.spacing_sx,
  },
  storiesCard: {
    alignItems: "center",
    marginRight: spacing.spacing_sx,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.color_light,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.spacing_sm,
  },
  storyName: {
    fontSize: fontSize.font_size_sm,
  },
  chatTitle: {
    fontSize: fontSize.font_size_lg,
    fontWeight: "500",
  },
  chatMemberList: {
    gap: spacing.spacing_md,
  },
});
