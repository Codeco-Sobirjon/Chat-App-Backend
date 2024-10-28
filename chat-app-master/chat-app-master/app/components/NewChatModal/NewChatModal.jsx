import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { colors, fontSize, spacing } from "../../constants";
import Icons from "../Icons/Icons";

const NewChatModal = ({ modalVisible, setmodalVisible }) => {
  return (
    <View style={styles.modalContainer}>
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalWrapp}>
          <View style={styles.modalContent}>
            <View style={styles.modalCard}>
              <Icons name={"chatbox-ellipses-outline"} size={24} />
              <View>
                <Text style={styles.title}>New Chat</Text>
                <Text style={styles.description}>
                  Send a message to your contant
                </Text>
              </View>
            </View>
            <View style={[styles.modalCard, styles.cardBordered]}>
              <Icons name={"reader-outline"} size={24} />
              <View>
                <Text style={styles.title}>New Contact</Text>
                <Text style={styles.description}>
                  Send a message to your contant
                </Text>
              </View>
            </View>
            <View style={[styles.modalCard, styles.cardBordered]}>
              <Icons name={"people-outline"} size={24} />
              <View>
                <Text style={styles.title}>New Community</Text>
                <Text style={styles.description}>
                  Send a message to your contant
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Pressable
              style={styles.cancelBtn}
              onPress={() => setmodalVisible(false)}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewChatModal;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "red",
  },
  modalWrapp: {
    backgroundColor: "#00000077",
    flex: 1,
    paddingBottom: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: spacing.spacing_md,
    paddingVertical: spacing.spacing_sm,
    borderRadius: 20,
    marginTop: "auto",
  },
  modalCard: {
    paddingHorizontal: spacing.spacing_md,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  cardBordered: {
    borderTopWidth: 1,
    borderColor: colors.color_light_secondary,
  },
  title: {
    fontWeight: "500",
  },
  description: {
    fontSize: fontSize.font_size_sm,
    color: colors.color_light,
  },
  cancelBtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 18,
    height: 38,
    width: 145,
  },
});
