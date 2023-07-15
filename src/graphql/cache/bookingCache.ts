import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            // return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            // return cartItemsVar();
          },
        },
        launches: {
          // ...field policy definitions...
        },
      },
    },
  },
});
