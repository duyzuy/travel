"use client";

import { ApolloLink, HttpLink, SuspenseCache, gql } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { resolvers } from "@/app/resolver";
import { bookingInformationResolver } from "@/app/components/BookingFormSearch/resolver";
import { cache } from "@/graphql/cache";
function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT || "https://cqy2y.sse.codesandbox.io",
  });

  return new NextSSRApolloClient({
    cache: cache,
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
    resolvers: {
      ...resolvers,
      ...bookingInformationResolver,
    },
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
