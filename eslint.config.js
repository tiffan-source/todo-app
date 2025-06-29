// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const obsidian = require("eslint-plugin-obsidian");

module.exports = defineConfig([
    expoConfig,
    eslintPluginPrettierRecommended,
    {
        ignores: ["dist/*"],
    },
    {
        plugins: {
            obsidian: obsidian,
        },
        rules: {
            "obsidian/unresolved-provider-dependencies": "error",
            "obsidian/no-circular-dependencies": "error",
            "obsidian/strongly-typed-inject-component": "error",
        },
    },
]);
