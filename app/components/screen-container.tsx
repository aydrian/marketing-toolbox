import { useShowGuides } from "~/hooks/use-show-guides";
export function ScreenContainer({ showGuides }: { showGuides?: boolean }) {
  const { Guide, elementRef } = useShowGuides<HTMLDivElement>(`Screen 16x9`);

  return (
    <div className="aspect-video h-full" ref={elementRef}>
      {showGuides ? <Guide /> : null}
    </div>
  );
}
