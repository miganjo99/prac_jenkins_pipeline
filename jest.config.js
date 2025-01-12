module.exports = {
    testMatch: [
      "*aaa*/__tests__/*aaa*/*.{test,spec}.{js,jsx,ts,tsx}",
      "**/?(*.)+(test|spec).[tj]s?(x)"
    ],
    testPathIgnorePatterns: ["/node_modules/", "/build/"]
  };
  