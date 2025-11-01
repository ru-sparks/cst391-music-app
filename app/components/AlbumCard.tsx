"use client";

import { useRouter } from "next/navigation";
import type { Album } from "@/lib/types";

export default function AlbumCard({ album }: { album: Album }) {
    const router = useRouter();

    const handleButtonClick = (uri: string) => {
        console.log("ID clicked is " + album.id);
        router.push(`${uri}${album.id}`);
    };

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={album.image ?? ""} className="card-img-top" alt={album.title} />

            <div className="card-body">
                <h5 className="card-title">{album.title}</h5>
                <p className="card-text">{album.description}</p>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                        onClick={() => handleButtonClick("/show/")}
                        className="btn btn-secondary"
                    >
                        View
                    </button>
                    <button
                        onClick={() => handleButtonClick("/edit/")}
                        className="btn btn-primary"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
