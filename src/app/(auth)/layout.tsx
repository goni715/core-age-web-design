import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PublicRoute from "@/providers/PublicRoute";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicRoute>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </PublicRoute>
  );
}
