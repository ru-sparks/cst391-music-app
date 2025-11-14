// A component to display individual album info, not included in Next.js routing
// app\components\AlbumCard.tsx  
// Define the shape of props expected by the AlbumCard component.
// This interface acts as a contract, ensuring that any use of AlbumCard

import { Album } from "@/lib/types";

// must provide exactly these props with the correct types.
interface AlbumCardProps {
    // The `album` prop must be an object of type Album.
    // This type is likely defined elsewhere in your codebase and describes
    // the structure of an album (e.g., title, artist, cover image, etc.).
    album: Album;

    // The `onClick` prop is a function that takes two arguments:
    // - an Album object
    // - a string representing a URI (e.g., "/show" or "/edit")
    // and returns nothing (void).
    // This ensures that any click handler passed to AlbumCard
    // adheres to this exact signature, preventing runtime errors.
    onClick: (album: Album, uri: string) => void;
}

// Export a functional React component named AlbumCard.
// The props are destructured directly in the parameter list,
// and their shape is validated against the AlbumCardProps interface.
export default function AlbumCard({ album, onClick }: AlbumCardProps) {

    const handleButtonClick = (uri: string) => {
        console.log("ID clicked is " + album.id);
        onClick(album, uri);
    };

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img
                src={album.image ?? ""}
                className="card-img-top"
                alt={album.title}
                style={{
                    height: "18rem",          // constrain the image height

                    objectFit: "cover",       // crop edges if necessary (maintains aspect ratio)
                    width: "18rem"            // ensures it spans the full card width
                }}
            />
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
