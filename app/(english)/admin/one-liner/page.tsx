import OneLinerAdminPage from "@/Components/admin/one-liner-editor/OneLinerAdminPage";
import db from "@/lib/db";

export default async function OneLinerPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  let liner = null;

  const res = (await searchParams).id;

  if (res) {
    liner = await db.liner.findUnique({
      where: { id: parseInt(res) },
    });
  }

  return <OneLinerAdminPage liner={liner} />;
}
