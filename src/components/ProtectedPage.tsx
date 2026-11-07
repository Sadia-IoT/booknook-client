import ProtectedRoute from "@/components/ProtectedRoute";

type ProtectedPageProps = {
  children: React.ReactNode;
};

export default function ProtectedPage({
  children,
}: ProtectedPageProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}