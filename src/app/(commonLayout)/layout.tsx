import { Footer } from "@/components/modules/Home/footer";
import { PublicNavbar } from "@/components/shared/PublicNavbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      {children}
      <Footer />
    </>
  );
};

export default CommonLayout;
