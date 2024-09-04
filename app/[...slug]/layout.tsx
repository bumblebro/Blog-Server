import Navbar from "@/components/navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}
const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default layout;
