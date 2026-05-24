'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const words = ['Hello', 'Bonjour', 'Ciao', 'Olà', 'やあ', 'Hallå', 'Guten tag', 'Hallo'];

export function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';
        setDimension({ width: window.innerWidth, height: window.innerHeight });

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            document.body.style.overflow = '';
            return;
        }

        if (index === words.length - 1) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 600);
            return () => clearTimeout(timer);
        }

        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 180);

        return () => clearTimeout(timeout);
    }, [index, isLoading]);

    if (dimension.width === 0) return null;

    const initialPath = `M0 0 Q${dimension.width / 2} 300 ${dimension.width} 0 L${dimension.width} 0 L0 0 Z`;
    const targetPath = `M0 0 Q${dimension.width / 2} 0 ${dimension.width} 0 L${dimension.width} 0 L0 0 Z`;

    const slideUp = {
        initial: { y: "0vh" },
        exit: { y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }
    }

    const curve = {
        initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
        exit: { d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } }
    }

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div 
                    variants={slideUp} 
                    initial="initial" 
                    exit="exit" 
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#141516] dark:bg-zinc-50"
                >
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} 
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute text-white dark:text-zinc-900 text-4xl sm:text-5xl font-medium tracking-tight flex items-center justify-center z-10"
                    >
                        {words[index]}
                    </motion.div>
                    <svg className="absolute top-[100%] left-0 w-full h-[300px]">
                        <motion.path 
                            variants={curve} 
                            initial="initial" 
                            exit="exit" 
                            className="fill-[#141516] dark:fill-zinc-50"
                        />
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
