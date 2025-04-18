import React from 'react';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const mono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
});

export default function RootLayout(
    {children}: Readonly<{children: React.ReactNode;}>
)
{
    return (
        <html lang="en" className={mono.className}>
        <body>
        {children}
        </body>
        </html>
    );
}