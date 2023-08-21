import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: ["src/Models/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: ["typescript"],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
