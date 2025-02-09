"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EpisodeType } from "@/lib/types";
import { useAnimeEpisode } from "@/states/useAnimeEpisode";
import { useAnimeEpisodeChange } from "@/states/useAnimeEpisodeChange";
import EpisodeSelect from "./anime-episode-select";

interface AnimeEpisodesProps {
  animeEpisodes: EpisodeType[];
  id: string;
  isWatchList: boolean;
}

const AnimeEpisodes: React.FC<AnimeEpisodesProps> = ({
  animeEpisodes,
  id,
  isWatchList,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const episodeParams = searchParams.get("ep") as string;

  const [setEpisode, selectedEpisode] = useAnimeEpisode((state) => [
    state.setEpisode,
    state.episode,
  ]);

  const [startIndex, endIndex] = useAnimeEpisodeChange((state) => [
    state.startIndex,
    state.endIndex,
  ]);

  const animeEpisodesList = animeEpisodes.slice(startIndex - 1, endIndex);

  const updateMutation = useMutation({
    mutationFn: (data: {
      episode: number;
      episodeId: string;
      listId: string;
    }) => {
      const { episode, episodeId, listId } = data;
      return axios.put(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/watchlist/${listId}`,
        { episode, episodeId }
      );
    },
  });

  const handleEpisodeClick = (episode: string, epNumber: number) => {
    setEpisode(episode);

    if (isWatchList) {
      updateMutation.mutate({
        episode: epNumber,
        episodeId: episode,
        listId: id,
      });
    }

    router.push(`?ep=${episode}`);

    // queryClient.invalidateQueries({
    //   queryKey: ["streamingLinks", selectedEpisode],
    // });
  };

  useEffect(() => {
    if (episodeParams) {
      setEpisode(episodeParams);
    } else {
      setEpisode(animeEpisodes[0]?.id);
    }

    if (episodeParams && isWatchList) {
      const parts = episodeParams.split("-");
      const episodeNumber = parseInt(parts[parts.length - 1]);
      updateMutation.mutate({
        episode: episodeNumber,
        episodeId: episodeParams,
        listId: id,
      });
    }
  }, [episodeParams]);

  if (animeEpisodes.length === 0) {
    return <div className="mt-10 w-full">No episodes found.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="mb-1">Episodes:</h1>
        <EpisodeSelect totalEpisodes={animeEpisodes.length} />
      </div>
      <div className="flex flex-wrap">
        {animeEpisodesList.map((episode: EpisodeType) => (
          <Button
            key={episode.id}
            className="mr-2 mt-2"
            variant={`${
              selectedEpisode === episode.id ? "orange" : "secondary"
            }`}
            onClick={() => handleEpisodeClick(episode.id, episode.number)}
          >
            {episode.number}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AnimeEpisodes;
