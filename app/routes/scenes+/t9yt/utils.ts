import { useRouteLoaderData } from "@remix-run/react";
import type { Loader as LayoutLoader } from "../t9yt+/_layout";

export function useEpisode() {
  const data = useRouteLoaderData<LayoutLoader>("routes/scenes+/t9yt+/_layout");
  if (data === undefined) {
    throw new Error(
      "useEpisode must be used within the routes/scenes+/t9yt+/ route or its children"
    );
  }
  return { ...data.nextEpisode, show: data.show };
}
