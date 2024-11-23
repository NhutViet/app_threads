import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Color";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const index = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const data = useQuery(api.users.getAllUsers);

  console.log("data", data);

  const handleFacebookLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log("handle Facebook", createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log("handle Google", createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.loginImg}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>How would you like to use Threads?</Text>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={handleFacebookLogin}
          >
            <View style={styles.btnLoginContent}>
              <Image
                source={require("@/assets/images/instagram_icon.webp")}
                style={styles.btnLoginIcon}
              />
              <Text style={styles.btnLoginText}>Continue with Instagram</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              Log in or create a THreads profile with your Instagram account.
              With a profile, you can post, interact and get personalised
              recommendations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLogin} onPress={handleGoogleLogin}>
            <View style={styles.btnLoginContent}>
              <Text style={styles.btnLoginText}>Continue with Google</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLogin}>
            <View style={styles.btnLoginContent}>
              <Text style={styles.btnLoginText}>Continue with Instagram</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              You can browse Threads without a profile, but won't be able to
              post, interact or get personalised recommendations.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.btnSwitchAccount}>Switch accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loginImg: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  btnContainer: {
    gap: 20,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
  },
  btnLogin: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  btnLoginContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btnLoginIcon: {
    width: 40,
    height: 40,
  },
  btnLoginText: {
    fontFamily: "DMSans_500Medium",
    flex: 1,
  },
  loginButtonSubtitle: {
    fontFamily: "DMSans_400Medium",
    marginTop: 5,
    fontSize: 12,
    color: Colors.border,
  },
  btnSwitchAccount: {
    fontSize: 14,
    color: Colors.border,
    alignSelf: "center",
  },
});
