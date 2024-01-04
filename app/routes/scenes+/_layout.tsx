import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  // const url = new URL(request.url);
  return null;
}

export default function ScenesLayout() {
  return <Outlet />;
}
