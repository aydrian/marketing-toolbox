import { VideoContainer } from "~/components/video-container";
import { useEpisode } from "~/routes/scenes+/t9yt/utils";

export default function Chatting2() {
  const { guests } = useEpisode();

  if (!guests) return null;

  return (
    <>
      {guests.slice(0, 2).map(guest => (
        <VideoContainer guest={guest} key={guest.id} showGuides={true} />
      ))}
    </>
  );
}
