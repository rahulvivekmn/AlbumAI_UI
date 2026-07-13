import {
    motion,
    useMotionValue,
    useTransform,
    animate
} from "motion/react";
import { useEffect, useState } from "react";
import "./SwipeImage.css";

export interface GalleryImage {
    id: string | number;
    url: string;
}

interface SwipeGalleryProps {
    images: GalleryImage[];
    onSelect(image: GalleryImage): void;
    onReject(image: GalleryImage): void;
}

const SWIPE_THRESHOLD = 140;

export default function SwipeGallery({
    images,
    onSelect,
    onReject,
}: SwipeGalleryProps) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const current = images[currentIndex];
    const next = images[currentIndex + 1];

    const x = useMotionValue(0);

    const rotate = useTransform(
        x,
        [-250, 0, 250],
        [-18, 0, 18]
    );

    const rejectOpacity = useTransform(
        x,
        [-180, -80, 0],
        [1, .5, 0]
    );

    const selectOpacity = useTransform(
        x,
        [0, 80, 180],
        [0, .5, 1]
    );

    const nextScale = useTransform(
        x,
        [-250,0,250],
        [1,0.95,1]
    );

    const nextOpacity = useTransform(
        x,
        [-250,0,250],
        [1,.75,1]
    );

    useEffect(() => {

        for(let i=1;i<=5;i++){

            const image=images[currentIndex+i];

            if(!image) continue;

            const img=new Image();
            img.src=image.url;

        }

    },[currentIndex,images]);

    if(!current){

        return (
            <div className="flex h-screen items-center justify-center bg-black text-white">
                Album Finished 🎉
            </div>
        );

    }

    async function swipe(direction:"left"|"right"){

        if(animating) return;

        setAnimating(true);

        const target =
            direction==="right"
                ? window.innerWidth+200
                : -window.innerWidth-200;

        await animate(
            x,
            target,
            {
                duration:.22,
                ease:"easeOut"
            }
        );

        if(direction==="right")
            onSelect(current);
        else
            onReject(current);

        x.set(0);

        setCurrentIndex(i=>i+1);

        setAnimating(false);

    }

    return (

        <div className="relative h-screen w-full overflow-hidden bg-black select-none gallery">

            {next && (
                <div className="image-layer next">
                <motion.img
                    src={next.url}
                    draggable={false}
                    style={{
                        scale:nextScale,
                        opacity:nextOpacity
                    }}
                    className="absolute inset-0 h-full w-full object-contain next-image"
                />
                </div>

            )}
            <div className="image-layer current">
            <motion.img
                src={current.url}
                draggable={false}
                drag="x"
                dragMomentum={false}
                dragElastic={0.15}
                dragConstraints={{
                    left:0,
                    right:0
                }}
                style={{
                    x,
                    rotate,
                    touchAction:"pan-y"
                }}
                className="absolute inset-0 h-full w-full object-contain cursor-grab active:cursor-grabbing current-image"
                onDragEnd={(_,info)=>{

                    if(info.offset.x>SWIPE_THRESHOLD){

                        swipe("right");
                        return;

                    }

                    if(info.offset.x<-SWIPE_THRESHOLD){

                        swipe("left");
                        return;

                    }

                    animate(x,0,{
                        type:"spring",
                        stiffness:350,
                        damping:30
                    });

                }}
            />
            </div>
            <motion.div
                style={{opacity:rejectOpacity}}
                className="absolute left-8 top-16 rounded border-4 border-red-500 px-5 py-2 text-3xl font-bold text-red-500"
            >
                REJECT
            </motion.div>

            <motion.div
                style={{opacity:selectOpacity}}
                className="absolute right-8 top-16 rounded border-4 border-green-500 px-5 py-2 text-3xl font-bold text-green-500"
            >
                SELECT
            </motion.div>

        </div>

    );

}