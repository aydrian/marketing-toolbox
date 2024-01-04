import { Outlet } from "@remix-run/react";
import { ScreenContainer } from "~/components/screen-container";

export default function ProgrammingLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full flex-col items-stretch justify-center">
        <Outlet />
      </div>
      <ScreenContainer showGuides={true} />
    </div>
  );
}
