import React from 'react';
import AlbumCard from './AlbumCard';
import { useRouter } from "next/navigation";
import { Album } from '@/lib/types';


const AlbumList = ({ albumList }: { albumList: Album[] }) => {

    console.log('props albumList', albumList);
    const router = useRouter();
    const albums = albumList.map((album) => {
        return (
            <AlbumCard key={album.id}
                album={album} />

        );
    });
    return <div className='container'>{albums}</div>;
}


export default AlbumList;
