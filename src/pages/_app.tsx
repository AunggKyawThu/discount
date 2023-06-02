import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { PromptProvider, BranchProvider, ProductProvider } from "../contexts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <SignedIn>
        <PromptProvider>
          <BranchProvider>
            <ProductProvider>
              <Component {...pageProps} />
            </ProductProvider>
          </BranchProvider>
        </PromptProvider>
      </SignedIn>
      <SignedOut>
        <div className="flex h-screen items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
