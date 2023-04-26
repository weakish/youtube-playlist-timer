module.exports = {
    extends: [
        "plugin:svelte/prettier",
    ],
    rules: {
        "prefer-arrow-callback": "error",
        "no-multi-assign": "error",
        "no-var": "error",
        "prefer-const": "error",
        "no-param-reassign": "error",
    }
}