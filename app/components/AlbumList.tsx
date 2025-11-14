"use client";

import React from "react";
import AlbumCard from "./AlbumCard";
import { Album } from "@/lib/types";

interface AlbumListProps {
    albumList: Album[];
    onClick: (album: Album, uri: string) => void;
}

export default function AlbumList({ albumList, onClick }: AlbumListProps) {
    console.log("AlbumList received albums:", albumList);

    return (
        <div className="container">
            {albumList.map((album) => (
                <AlbumCard
                    key={album.id}
                    album={album}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}
