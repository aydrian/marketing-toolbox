import { useEpisode } from "~/routes/scenes+/t9yt/utils";

export default function StartingSoon() {
  const nextEpisode = useEpisode();
  return (
    <div className="h-full w-full bg-gradient-to-tl from-blue-400 to-fuchsia-500">
      <h1>{nextEpisode.show?.title}</h1>
      <h2>{nextEpisode?.title}</h2>
      {nextEpisode.guests ? (
        <ul className="flex gap-4">
          {nextEpisode.guests.map(guest => (
            <li key={guest.id}>
              <img
                alt={guest.name}
                className="h-36 rounded-full"
                src={guest.picture.file.url}
              />
              <h3>{guest.name}</h3>
              <h4>{guest.title}</h4>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
