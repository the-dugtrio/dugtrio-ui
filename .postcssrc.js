module.exports = {
    plugins: [
        require("postcss-partial-import"),
        require("postcss-url"),
        require("saladcss-bem")({
            defaultNamespace: "neg",
            separators: {
                descendent: "__"
            },
            shortcuts: {
                modifier: "m",
                descendent: "d",
                component: "c"
            }
        }),
        require("precss"),
        require("postcss-sass-color-functions"),
        require("postcss-css-reset"),
        require("postcss-shape"),
        require("postcss-utils"),
        require("autoprefixer")
    ]
};
