// app/edit/[albumId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditAlbumPage() {
    const router = useRouter();
    const params = useParams();
    const albumId = params?.albumId; // undefined under /new

    const [album, setAlbum] = useState({
        title: "",
        artist: "",
        description: "",
        year: "",
        image: "",
        tracks: [],
    });

    // Load album only when editing
    useEffect(() => {
        if (!albumId) return; // creation mode
        (async () => {
            const res = await fetch(`/api/albums/${albumId}`);
            const data = await res.json();
            setAlbum(data);
        })();
    }, [albumId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = albumId ? "PUT" : "POST";
        const url = albumId ? `/api/albums/${albumId}` : `/api/albums`;
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(album),
        });
        router.push("/");
    };

    const onChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setAlbum((prev) => ({ ...prev, [key]: e.target.value }));

    return (
        <main style={{ padding: "1rem" }}>
            <h1>{albumId ? "Edit Album" : "Create Album"}</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Title" value={album.title} onChange={onChange("title")} />
                <input placeholder="Artist" value={album.artist} onChange={onChange("artist")} />
                <input placeholder="Year" value={album.year} onChange={onChange("year")} />
                <textarea placeholder="Description" value={album.description} onChange={onChange("description")} />
                <input placeholder="Image URL" value={album.image} onChange={onChange("image")} />
                <button type="submit">{albumId ? "Update" : "Save"}</button>
            </form>
        </main>
    );
}
