"use client";

import { get, post, put } from "@/lib/apiClient";
import { Album, Track } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditAlbumPage() {
    const router = useRouter();
    const params = useParams();
    const albumId = params?.albumId; // undefined in /new

    const defaultAlbum: Album = {
        id: 0,
        title: "",
        artist: "",
        description: "",
        year: 0,
        image: "",
        tracks: [] as Track[],
    };

    const [album, setAlbum] = useState(defaultAlbum);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load album when editing
    useEffect(() => {
        if (!albumId) return;
        (async () => {
            try {
                const res = await get<Album[]>(`/albums/?albumId=${albumId}`);
                setAlbum(res[0]);
            } catch (error) {
                console.error("Failed to load album:", error);
            }
        })();
    }, [albumId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (albumId) {
                alert("Updating existing album");
                await put<Album>(`/albums/`, album);
            } else {
                alert("Creating new album");
                await post<Album>("/albums", album);
            }
            router.push("/");
        } catch (error) {
            console.error("Failed to save album:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onChange =
        (key: string) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setAlbum((prev) => ({ ...prev, [key]: e.target.value }));

    return (
        <div className="container-fluid mt-5 px-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">
                                {albumId ? "Edit Album" : "Create Album"}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                {/* Title */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label fw-semibold">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        className="form-control"
                                        placeholder="Enter album title"
                                        value={album.title}
                                        onChange={onChange("title")}
                                        required
                                    />
                                </div>

                                {/* Artist */}
                                <div className="mb-3">
                                    <label htmlFor="artist" className="form-label fw-semibold">
                                        Artist
                                    </label>
                                    <input
                                        id="artist"
                                        className="form-control"
                                        placeholder="Enter artist name"
                                        value={album.artist}
                                        onChange={onChange("artist")}
                                        required
                                    />
                                </div>

                                {/* Year */}
                                <div className="mb-3">
                                    <label htmlFor="year" className="form-label fw-semibold">
                                        Year
                                    </label>
                                    <input
                                        id="year"
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter release year"
                                        value={album.year}
                                        onChange={onChange("year")}
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-semibold">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows={3}
                                        placeholder="Enter album description"
                                        value={album.description ?? ""}
                                        onChange={onChange("description")}
                                    />
                                </div>

                                {/* Image URL */}
                                <div className="mb-4">
                                    <label htmlFor="image" className="form-label fw-semibold">
                                        Image URL
                                    </label>
                                    <input
                                        id="image"
                                        className="form-control"
                                        placeholder="Enter cover image URL"
                                        value={album.image ?? ""}
                                        onChange={onChange("image")}
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => router.push("/")}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Saving..."
                                            : albumId
                                                ? "Update Album"
                                                : "Create Album"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
