import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { colors, fontSize, spacing } from "../../constants";
import { ChatModal, Icons, ReplyMessage } from "../../components";

const Chat = ({ navigation }) => {
  const [chatModal, setchatModal] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ChatModal modalVisible={chatModal} setmodalVisible={setchatModal} />
      <View style={styles.topContent}>
        <View style={styles.chatHeding}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Icons name={"chevron-back-outline"} size={24} />
          </Pressable>
          <Image
            style={styles.chatAvatar}
            source={{
              uri: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
            }}
          />
          <View style={styles.nameBox}>
            <Text style={styles.name}>Zaire Dorwat</Text>
            <Text style={styles.status}>Online</Text>
          </View>
          <View style={styles.callBox}>
            <Icons name={"videocam-outline"} size={24} />
            <Icons name={"call-outline"} size={22} />
          </View>
        </View>
        <View style={styles.chatContainer}>
          <Text style={styles.date}>Today</Text>
          <Pressable
            onPress={() => setchatModal(true)}
            style={styles.receiverBox}
          >
            <View style={[styles.chatBox, styles.chatReceiver]}>
              <Text>Hi dear</Text>
            </View>
          </Pressable>
          <View style={styles.senderBox}>
            <Pressable
              onPress={() => setchatModal(true)}
              style={[styles.chatBox, styles.chatSender]}
            >
              <Text>Hi dear</Text>
            </Pressable>
            <View>
              <Pressable
                onPress={() => setchatModal(true)}
                style={[styles.chatBox, styles.chatSender]}
              >
                <ReplyMessage />
                <Text>Lorem ipsum dolor sit amet.</Text>
              </Pressable>
              <Text style={styles.sendStatus}>Delivered</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Icons name={"add-outline"} size={24} />
        <TextInput
          style={styles.sendInput}
          placeholder="New Chat"
          onChangeText={(e) => setMessage(e)}
        />
        {message ? (
          <Icons color={"#000"} name={"send"} size={24} />
        ) : (
          <Icons name={"mic-outline"} size={24} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color_white,
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {
    borderTopWidth: 1,
    borderColor: colors.color_light_secondary,
    paddingVertical: spacing.spacing_sx,
    paddingHorizontal: spacing.spacing_md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.spacing_md,
  },
  chatHeding: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.spacing_sx,
    borderBottomWidth: 1,
    borderColor: colors.color_light_secondary,
    paddingHorizontal: spacing.spacing_md,
    paddingVertical: spacing.spacing_sx,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameBox: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.font_size_md,
    fontWeight: "500",
  },
  status: {
    fontSize: fontSize.font_size_sm,
    color: colors.color_light,
  },
  callBox: {
    flexDirection: "row",
    gap: spacing.spacing_md,
  },
  chatContainer: {
    padding: spacing.spacing_md,
  },
  date: {
    textAlign: "center",
    marginVertical: spacing.spacing_sx,
    color: colors.color_light,
  },
  receiverBox: {
    alignItems: "flex-start",
  },
  senderBox: {
    alignItems: "flex-end",
  },
  sendStatus: {
    color: colors.color_light,
    fontSize: fontSize.font_size_sm,
    textAlign: "right",
  },
  chatBox: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    marginVertical: spacing.spacing_sm,
  },
  chatReceiver: {
    backgroundColor: colors.color_light_secondary,
  },
  chatSender: {
    backgroundColor: colors.color_yellow,
  },
  sendInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.color_light_secondary,
    padding: spacing.spacing_sx,
  },
});
