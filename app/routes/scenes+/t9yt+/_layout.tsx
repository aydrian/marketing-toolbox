import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getNextEpisode, getShow } from "~/utils/notion.server";

const SHOW_ID = "7b05199a-d585-4473-8b78-9738c7fa34b6";

export async function loader({ request }: LoaderFunctionArgs) {
  const [show, nextEpisode] = await Promise.all([
    getShow(SHOW_ID),
    getNextEpisode(SHOW_ID)
  ]);

  return json({ show, nextEpisode });
}

export default function Layout() {
  return (
    <div className="aspect-video max-h-[1080px] max-w-[1920px]">
      <Outlet />
    </div>
  );
}

export type Loader = typeof loader;
