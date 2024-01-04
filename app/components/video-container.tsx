import { useShowGuides } from "~/hooks/use-show-guides";
import { cn } from "~/utils/misc";
import { type IGuest } from "~/utils/notion.server";

export function VideoContainer({
  className,
  guest,
  index = 0,
  showGuides
}: {
  className?: string;
  guest: IGuest;
  index?: number;
  showGuides?: boolean;
}) {
  const { Guide, elementRef } = useShowGuides<HTMLElement>(
    `${index === 0 ? "Host" : "Guest"} ${index > 0 ? index : ""}`
  );

  return (
    <figure
      className={cn(
        className,
        `relative m-0 flex grow flex-col items-center justify-end`
      )}
      ref={elementRef}
    >
      {showGuides ? <Guide /> : null}
      <figcaption className="absolute bottom-4 left-4 z-10">
        <h3>{guest.name}</h3>
        <h4>{guest.title}</h4>
      </figcaption>
    </figure>
  );
}
