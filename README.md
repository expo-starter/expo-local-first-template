# Expo Local-first Template  [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40younes0x53)](https://twitter.com/y0x53)

<p align="center">
  <a href="https://expostarter.com/"><img src="assets/github-banner.png?raw=true" alt="Expo Starter Kit"></a>
</p>

The `Expo Starter Template` is a free project model with up-to-date frameworks and configurations for your new Expo project. It helps eliminate repetitive tasks when starting a project from scratch. This template integrates carefully selected libraries to help you bootstrap your new React Native and Expo app with the most effective frameworks and tools available in the market.

The project integrates universal version of [shadcn-ui](https://ui.shadcn.com/) components, Tailwind styling, state management, and a local-first database strategy for universal mobile apps on Android, iOS, and Web.


[Web App Demo](https://expo-starter.github.io/expo-local-first-template)

## 📚 What's inside

- ⚡ [Expo v51](https://expo.dev) - Built with Expo for cross-platform support
- ⚛️ [React Native v0.73.6](https://reactnative.dev) for building native apps using React
- 💎 Integrate with [NativeWind v4](https://www.nativewind.dev), Tailwind CSS for React Native
- 📁 Expo Router and Expo API
- 📦 [zustand](docs.pmnd.rs/zustand) - State management solution.
- 🎨 Common components from the [rn-reusables](https://github.com/mrzachnugent/react-native-reusables) library: Icons, ThemeToggle, Avatar, Button, Card, Progress, Text, Tooltip.
- 🌗 Dark and light mode - Android Navigation Bar matches mode and Persistant mode
- 💡 Absolute Imports using `@` prefix
- 📏 Linter and Code Formatter with [biome](https://biomejs.dev/)
- 🗂 VSCode recommended extensions, settings, and snippets to enhance the developer experience.

New :
- 💽 Local-first based on [Expo SQLite for](https://docs.expo.dev/versions/latest/sdk/sqlite/) for native and [Sqlite.js](https://github.com/sql-js/sql.js) for Web
- 💽 Full integrated with [DrizzleORM](https://drizzle.dev) including live query

In-progress :
- [OP-sqlite](https://github.com/OP-Engineering/op-sqlite) local-first database and sync with [Tusco](https://docs.turso.tech/sdk/ts/quickstart)

### Requirements

- Node.js 20+ and pnpm or bun
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

### Getting started

Run the following command on your local environment:

```shell
bunx create-expo-app --template @expo-starter/template
```

Then, you can run locally in development mode with live reload:

```shell
bun run dev:ios
# Or
bun run dev:android
```

<p align="center">
  <a href="https://expostarter.dev/"><img src="assets/preview-banner.png?raw=true" alt="React Native Expo Starter Kit"></a>
</p>

This will open the app in the iOS simulator or Android emulator.

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug. Totally open to any suggestions and improvements.

### License

Licensed under the MIT License, Copyright © 2024

See [LICENSE](LICENSE) for more information.

---

Made with ♥ by [Expo starter](expostarter.com) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40younes0x53)](https://twitter.com/younes0x53)
