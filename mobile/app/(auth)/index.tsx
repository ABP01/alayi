import { AnimatedOrb } from "@/components/AnimatedOrb";
import { useAuth } from "@/contexts/AuthContext";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = isLogin
        ? await login(email, password)
        : await register(name, email, password);

      if (!result.success) {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden">
        <LinearGradient
          colors={["#0D0D0F", "#1A1A2E", "#16213E", "#0D0D0F"]}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <AnimatedOrb
          colors={["#F4A261", "#E76F51"]}
          size={300}
          initialX={-80}
          initialY={height * 0.1}
          duration={4000}
        />
        <AnimatedOrb
          colors={["#E76F51", "#F4A261"]}
          size={250}
          initialX={width - 100}
          initialY={height * 0.3}
          duration={5000}
        />
        <AnimatedOrb
          colors={["#FFD7BA", "#F4A261"]}
          size={200}
          initialX={width * 0.3}
          initialY={height * 0.6}
          duration={3500}
        />
        <AnimatedOrb
          colors={["#F4B183", "#E76F51"]}
          size={180}
          initialX={-50}
          initialY={height * 0.8}
          duration={4500}
        />
      </View>

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center px-6">
          {/* LOGO */}
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: width - 48,
                height: height * 0.3,
              }}
              contentFit="contain"
            />
          </View>

          {/* FORM */}
          <View className="bg-surface-card/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <Text className="text-2xl font-bold text-foreground text-center mb-6">
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>

            {!isLogin && (
              <TextInput
                className="bg-white/10 rounded-xl px-4 py-3 mb-4 text-foreground placeholder:text-subtle-foreground"
                placeholder="Full Name"
                placeholderTextColor="#6B6B70"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}

            <TextInput
              className="bg-white/10 rounded-xl px-4 py-3 mb-4 text-foreground placeholder:text-subtle-foreground"
              placeholder="Email"
              placeholderTextColor="#6B6B70"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              className="bg-white/10 rounded-xl px-4 py-3 mb-6 text-foreground placeholder:text-subtle-foreground"
              placeholder="Password"
              placeholderTextColor="#6B6B70"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <Pressable
              className="bg-primary rounded-xl py-4 items-center active:scale-[0.98]"
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white font-semibold text-lg">
                  {isLogin ? "Sign In" : "Sign Up"}
                </Text>
              )}
            </Pressable>

            <Pressable
              className="mt-4 items-center"
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text className="text-subtle-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Text className="text-primary font-semibold">
                  {isLogin ? "Sign Up" : "Sign In"}
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
