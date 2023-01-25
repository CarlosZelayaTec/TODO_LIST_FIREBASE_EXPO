import "dotenv/config";

export default ({ config }) => {
  return {
    expo: {
      name: "Lista de tareas",
      slug: "CRUD_firebase",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/App-Icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/Splash-Icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
      },
      android: {
        package: "com.yourcompany.listadetareas",
        versionCode: 1,
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#FFFFFF"
        },
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      extra: {
        eas: {
          projectId: "f29cdbc0-4b0c-4c60-bc52-7ad1f07e4205",
        },
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
      },
    },
  };
};
