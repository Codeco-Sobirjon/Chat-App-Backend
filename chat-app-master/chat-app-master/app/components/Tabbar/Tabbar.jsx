import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { colors, spacing } from "../../constants";
import Icons from "../Icons/Icons";
import NewChatModal from "../NewChatModal/NewChatModal";

const Tabbar = ({ navigation }) => {
  const [modalVisible, setmodalVisible] = useState(false);
  return (
    <SafeAreaView>
      <NewChatModal
        modalVisible={modalVisible}
        setmodalVisible={setmodalVisible}
      />
      <View style={styles.tabBarContainer}>
        <View style={styles.buttonsWrapp}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Icons name="home-outline" size={24} />
          </Pressable>
          <Pressable
            style={styles.newChatBtn}
            onPress={() => setmodalVisible(true)}
          >
            <Icons name="add-outline" color={"#fff"} size={24} />
            <Text style={styles.btnText}>New Chat</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("User-profile")}>
            <Icons name="person-outline" size={24} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tabbar;
const styles = StyleSheet.create({
  tabBarContainer: {
    borderTopWidth: 1,
    borderColor: colors.color_light_secondary,
  },
  buttonsWrapp: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: spacing.spacing_md,
  },
  newChatBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 18,
    paddingHorizontal: spacing.spacing_lg,
    paddingVertical: 6,
  },
  btnText: {
    color: "#fff",
  },
});
