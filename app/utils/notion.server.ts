import { Client } from "@notionhq/client";
import { type QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const EPISODES_DATABASE_ID = "9543816e8e0d4511921b22a3e4a84dc2";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export type DbResult = Extract<
  QueryDatabaseResponse["results"][number],
  { properties: Record<string, unknown> }
>;

type PropertyValueMap = DbResult["properties"];
type PropertyValue = PropertyValueMap[string];

type PropertyValueType = PropertyValue["type"];

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
  PropertyValue,
  { type: TType }
>;

export type PropertyValueTitle = ExtractedPropertyValue<"title">;
export type PropertyValueRichText = ExtractedPropertyValue<"rich_text">;
export type PropertyValueDate = ExtractedPropertyValue<"date">;
export type PropertyValueRelation = ExtractedPropertyValue<"relation">;

export interface IEpisode {
  id: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  showId: string;
  guestIds: string[];
}

export interface IGuest {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  twitter: string;
  picture: {
    name: string;
    type: string;
    file: { url: string; expiry_time: string };
  };
}

type EpisodeItem = DbResult & {
  properties: {
    Title: PropertyValueTitle;
    Subtitle: PropertyValueRichText;
    Show: PropertyValueRelation;
    Date: PropertyValueDate;
    Guests: PropertyValueRelation;
  };
};

const extractEpisodes = async (
  response: QueryDatabaseResponse
): Promise<IEpisode[]> => {
  const episodeItems: EpisodeItem[] = response.results.map(
    episodeItem => episodeItem as EpisodeItem
  );
  const episodes = episodeItems.map(episodeItem => {
    const title = episodeItem.properties.Title.title.at(0)?.plain_text ?? "";
    const subtitle =
      episodeItem.properties.Subtitle.rich_text.at(0)?.plain_text ?? "";
    const startDate = episodeItem.properties.Date.date?.start ?? "";
    const endDate = episodeItem.properties.Date.date?.end ?? "";
    const guestIds = episodeItem.properties.Guests.relation.map(
      guest => guest.id
    );
    const showId = episodeItem.properties.Show.relation[0].id;

    const episode: IEpisode = {
      id: episodeItem.id,
      showId,
      title,
      subtitle,
      endDate,
      startDate,
      guestIds
    };
    return episode;
  });
  return episodes;
};

export const getShow = async (showId: string) => {
  const response = await notion.pages.retrieve({ page_id: showId });

  if (!response) {
    return null;
  }

  const { Title } = response.properties;

  const title = Title.title.at(0)?.plain_text ?? "";

  return {
    id: response.id,
    title
  };
};

export const getNextEpisode = async (showId: string) => {
  const response = await notion.databases.query({
    database_id: EPISODES_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Date",
          date: {
            on_or_after: new Date().toISOString()
          }
        },
        {
          property: "Show",
          relation: {
            contains: showId
          }
        }
      ]
    }
  });
  const [nextEpisode] = await extractEpisodes(response);

  if (!nextEpisode) {
    return null;
  }
  const guests: IGuest[] = (
    await Promise.all([
      ...nextEpisode.guestIds.map(async id => await getGuest(id))
    ])
  ).filter(Boolean);

  return { ...nextEpisode, guests };
};

export const getGuest = async (guestId: string) => {
  const response = await notion.pages.retrieve({ page_id: guestId });

  if (!response) {
    return null;
  }

  const {
    Title,
    "First Name": FirstName,
    "Last Name": LastName,
    Name,
    Company,
    Twitter,
    Picture
  } = response.properties;

  return {
    id: response.id,
    name: Name.title.at(0)?.plain_text ?? "",
    firstName: FirstName.rich_text.at(0)?.plain_text ?? "",
    lastName: LastName.rich_text.at(0)?.plain_text ?? "",
    title: Title.rich_text.at(0)?.plain_text ?? "",
    company: Company.rich_text.at(0)?.plain_text ?? "",
    twitter: Twitter.rich_text.at(0)?.plain_text ?? "",
    picture: Picture.files[0]
  } as IGuest;
};
