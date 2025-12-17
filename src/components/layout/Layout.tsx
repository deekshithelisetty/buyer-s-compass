import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

interface LayoutProps {
  children: ReactNode;
  hideFloatingChat?: boolean;
}

export function Layout({ children, hideFloatingChat = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {!hideFloatingChat && <FloatingChatButton />}
    </div>
  );
}
