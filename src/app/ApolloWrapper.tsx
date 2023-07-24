"use client";

import { bookingInformationVar } from "@/cache/vars";
import { ApolloLink, HttpLink, SuspenseCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT || "https://cqy2y.sse.codesandbox.io",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            bookingInformation: {
              read() {
                return bookingInformationVar();
              },
            },
          },
        },
        AirportItem: {
          fields: {
            name: {
              read(name) {
                // Return the cached name, transformed to upper case
                // return name.toUpperCase();
                return name;
              },
            },
          },
        },
      },
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
    connectToDevTools: true,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  loadErrorMessages(), loadDevMessages();
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
