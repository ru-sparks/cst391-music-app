"use client";

import React from "react";
import SearchForm from "./SearchForm";
import AlbumList from "./AlbumList";
import { Album } from "@/lib/types";

interface SearchAlbumProps {
    updateSingleAlbum: (album: Album, uri: string) => void;
    updateSearchResults: (data: Record<string, string>) => void;
    albumList: Album[];
}

export default function SearchAlbum({
    updateSingleAlbum,
    updateSearchResults,
    albumList,
}: SearchAlbumProps) {
    console.log("SearchAlbum props:", { updateSingleAlbum, albumList });

    return (
        <div className="container">
            <SearchForm onSubmit={updateSearchResults} />
            <AlbumList albumList={albumList} onClick={updateSingleAlbum} />
        </div>
    );
}
