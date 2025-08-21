"use client";
const { AuthProvider } = require("@/app/Providers");
import { StoreProvider, store } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
const MainLayout = ({ children }) => {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
};
// function Auth({ children }) {
//   const router = useRouter();
//   const { status} = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/unauthirized?message=login required");
//     },
//   });
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }
//   return children;
// }
export default MainLayout;
