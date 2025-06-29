module.exports = function (api) {
    api.cache(true);

    return {
        presets: [
            [
                "babel-preset-expo",
                {
                    jsxImportSource: "nativewind",
                },
            ],
            "nativewind/babel",
            ["@babel/preset-typescript", { onlyRemoveTypeImports: true }],
        ],

        plugins: [
            [
                "module-resolver",
                {
                    root: ["./"],

                    alias: {
                        "@": "./",
                        "tailwind.config": "./tailwind.config.js",
                    },
                },
            ],
            "react-obsidian/dist/transformers/babel-plugin-obsidian",
            ["@babel/plugin-proposal-decorators", { version: "legacy" }],
        ],
    };
};
