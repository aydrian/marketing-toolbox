import { VideoContainer } from "~/components/video-container";
import { useEpisode } from "~/routes/scenes+/t9yt/utils";

export default function Chatting() {
  const { guests } = useEpisode();

  if (!guests) return null;

  return <VideoContainer guest={guests[0]} showGuides={true} />;
}
