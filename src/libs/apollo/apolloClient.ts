import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { gql } from "@apollo/client";
const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || "https://cqy2y.sse.codesandbox.io";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    resolvers: {
      Mutation: {
        toggleTodo: (_root, variables, { cache, getCacheKey }) => {
          const id = getCacheKey({ __typename: "TodoItem", id: variables.id });
          const fragment = gql`
            fragment completeTodo on TodoItem {
              completed
            }
          `;
          const todo = cache.readFragment({ fragment, id });
          const data = { ...todo, completed: !todo.completed };
          cache.writeData({ id, data });
          return null;
        },
      },
    },
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
  });
});
