import { Outlet } from "@remix-run/react";
import { useEpisode } from "../../t9yt/utils";

export default function T9YTLayout() {
  const { show, title, subtitle } = useEpisode();

  return (
    <div className="grid h-full w-full grid-rows-[auto_200px]">
      <main>
        <Outlet />
      </main>
      <footer className="bg-gradient-to-tl from-blue-400 to-fuchsia-500 p-2">
        <div className="flex h-full flex-col px-8 py-1.5 text-white">
          <h1 className="mb-1 max-w-fit text-6xl font-bold leading-tight">
            {show?.title}
          </h1>
          <h2 className=" text-4xl font-semibold">{title}</h2>
          {subtitle ? (
            <h3 className="text-2xl font-semibold">{subtitle}</h3>
          ) : null}
        </div>
      </footer>
    </div>
  );
}
