import BookDetailsComponent from "@/components/BookDetailsComponent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const instant = false;

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  const { id } = await params;

  if (!session) {
    redirect(`/login?callbackUrl=/books/${id}`);
  }
  return <BookDetailsComponent id={id} />;
}
