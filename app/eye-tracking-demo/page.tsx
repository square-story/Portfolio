import React from 'react';
import { EyeTrackingCharacter } from '@/components/eye-tracking-character';

export default function EyeTrackingDemo() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white p-8 gap-8">
            <h1 className="text-2xl font-bold">Eye Tracking Demo</h1>
            <p className="text-zinc-400">Move your mouse around to see the character follow you.</p>

            <div className="p-12 border border-zinc-700 bg-black rounded-2xl flex flex-col items-center gap-8">
                <EyeTrackingCharacter size={256} />
            </div>

            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 opacity-40"></div>
        </div>
    );
}
