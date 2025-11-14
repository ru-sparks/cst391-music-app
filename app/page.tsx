"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./components/NavBar";
import SearchAlbum from "./components/SearchAlbum";
import { Album } from "@/lib/types";
import { get } from "@/lib/apiClient";

export default function Page() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [albumList, setAlbumList] = useState<Album[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const router = useRouter();

  // Fetch all albums from your API
  const loadAlbums = async () => {
    try {
      setLoadError(null);
      const albums = await get<Album[]>("/albums");
      setAlbumList(albums);
    } catch (error) {
      setLoadError(`Failed to load albums: ${error}`);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  // Handle user search submission
  const updateSearchResults = (data: Record<string, string>) => {
    console.log("phrase is " + data.searchTerm);
    setSearchPhrase(data.searchTerm || "");
  };

  // Handle clicking on a single album (navigate to /show/:id)
  const updateSingleAlbum = (album: Album, uri: string) => {
    console.log(`Update Single Album = ${album} uri = ${uri}`);
    router.push(`${uri}${album.id}`);
  };

  // Filter albums by description or show all
  const renderedList = albumList.filter((album) =>
    (album.description ?? "")
      .toLowerCase()
      .includes(searchPhrase.toLowerCase())
  );

  // Reuse callback for refreshing after edit
  const onEditAlbum = () => {
    loadAlbums();
    router.push("/");
  };

  return (
    <main>
      <NavBar />
      <SearchAlbum
        updateSearchResults={updateSearchResults}
        albumList={renderedList}
        updateSingleAlbum={updateSingleAlbum}
      />
      {loadError && <p style={{ color: "red" }}>{loadError}</p>}
    </main>
  );
}
