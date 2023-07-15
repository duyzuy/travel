import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";
import { bookingInformationVar } from "@/app/components/BookingFormSearch/operations/vars";
export const cache: NextSSRInMemoryCache = new NextSSRInMemoryCache({
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
  },
});
