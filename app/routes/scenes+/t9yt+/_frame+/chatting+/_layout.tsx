import { Outlet } from "@remix-run/react";
import { useEpisode } from "../../../t9yt/utils";

export default function ChattingLayout() {
  const { guests } = useEpisode();

  if (guests.length < 1) {
    return <div>No Guests found.</div>;
  }

  return (
    <div className="flex h-full w-full items-stretch justify-center">
      <Outlet />
    </div>
  );
}
