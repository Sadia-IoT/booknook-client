import "./globals.css";
import Link from "next/link";
import { BookOpen, Home, Search } from "lucide-react";
export const metadata = {
  title: "Page Not Found",
};
const NotFound = () => {
  return (
    <main
      style={{
        minHeight: "70vh",
        background: "#faf9f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "520px" }}>
        <div
          style={{
            width: "110px",
            height: "110px",
            margin: "0 auto 28px",
            borderRadius: "50%",
            background: "#dcfce7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BookOpen size={54} color="#047f39" />
        </div>

        <h1
          style={{
            fontSize: "clamp(80px, 15vw, 120px)",
            fontWeight: 900,
            color: "#047f39",
            lineHeight: 1,
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: 700,
            color: "#1f2937",
            marginTop: "20px",
          }}
        >
          Oops! Page Not Found
        </h2>

        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
            lineHeight: 1.7,
            marginTop: "14px",
          }}
        >
          The page you are looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "30px",
            padding: "14px 26px",
            background: "#047f39",
            color: "white",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <Home size={19} />
          Back to Home
        </Link>

        <p
          style={{
            marginTop: "30px",
            color: "#9ca3af",
            fontSize: "13px",
          }}
        >
          <Search
            size={15}
            style={{
              display: "inline",
              verticalAlign: "middle",
              marginRight: "6px",
            }}
          />
          Keep exploring the BookNook library!
        </p>
      </div>
    </main>
  );
}
export default NotFound;