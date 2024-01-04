import { VideoContainer } from "~/components/video-container";
import { useEpisode } from "~/routes/scenes+/t9yt/utils";

export default function Programming2() {
  const { guests } = useEpisode();

  if (!guests) return null;

  return (
    <>
      {guests.slice(0, 2).map((guest, index) => (
        <VideoContainer
          guest={guest}
          index={index}
          key={guest.id}
          showGuides={true}
        />
      ))}
    </>
  );
}
