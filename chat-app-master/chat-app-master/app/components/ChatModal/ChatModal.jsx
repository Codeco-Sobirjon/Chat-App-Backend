import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { colors, fontSize, spacing } from "../../constants";
import Icons from "../Icons/Icons";

const ChatModal = ({ modalVisible, setmodalVisible }) => {
  return (
    <View style={styles.modalContainer}>
      <Modal
        swipeDirection={"down"}
        onBackdropPress={() => setmodalVisible(false)}
        transparent
        animationType="fade"
        visible={modalVisible}
      >
        <Pressable
          onPress={() => setmodalVisible(false)}
          style={styles.modalWrapp}
        >
          <View style={styles.modalContent}>
            <View style={styles.textCard}>
              <Text>Please help me find a good monitor for the design</Text>
            </View>
            <View style={styles.reactionContainer}>
              <Text style={styles.reactionTitle}>React</Text>
              <View style={styles.reactionBox}>
                <Pressable>
                  <Text style={styles.reactionText}>🔥</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.reactionText}>🙌</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.reactionText}>😭</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.reactionText}>🤣</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.reactionText}>👀</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.reactionText}>🙈</Text>
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.modalCard}>
              <Text style={styles.title}>Copy</Text>
              <Icons name={"copy-outline"} size={20} />
            </Pressable>
            <Pressable style={[styles.modalCard, styles.cardBordered]}>
              <Text style={styles.title}>Reply</Text>
              <Icons name={"arrow-redo-outline"} size={20} />
            </Pressable>
            <Pressable style={[styles.modalCard, styles.cardBordered]}>
              <Text style={styles.title}>Forward</Text>
              <Icons name={"return-up-forward-outline"} size={20} />
            </Pressable>
            <Pressable style={[styles.modalCard, styles.cardBordered]}>
              <Text style={styles.title}>Delete</Text>
              <Icons name={"trash-outline"} size={20} />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ChatModal;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "red",
  },
  modalWrapp: {
    backgroundColor: "#00000077",
    flex: 1,
    paddingBottom: spacing.spacing_sm,
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: spacing.spacing_md,
    paddingVertical: spacing.spacing_sm,
    paddingHorizontal: spacing.spacing_md,
    borderRadius: 24,
    marginTop: "auto",
  },
  modalCard: {
    paddingVertical: spacing.spacing_sx,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.spacing_md,
  },
  textCard: {
    backgroundColor: colors.color_light_secondary,
    padding: spacing.spacing_sx,
    marginVertical: spacing.spacing_md,
    borderRadius: 12,
  },
  reactionContainer: {
    marginVertical: spacing.spacing_sx,
  },
  reactionTitle: {
    fontSize: fontSize.font_size_lg,
    fontWeight: "500",
  },
  reactionText: {
    fontSize: fontSize.font_size_2xl,
  },
  reactionBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.spacing_md,
    overflow: "scroll",
  },
  cardBordered: {
    borderTopWidth: 1,
    borderColor: colors.color_light_secondary,
  },
  title: {
    fontWeight: "500",
    fontSize: fontSize.font_size_md,
    flex: 1,
  },
  description: {
    fontSize: fontSize.font_size_sm,
    color: colors.color_light,
  },
});
