'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    if (!email) return [];

    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('MongoDB connection not found');

        // Better Auth stores users in the "user" collection
        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

        if (!user) return [];

        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];

        const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
        return items.map((i) => String(i.symbol));
    } catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}

// Server actions to mutate the watchlist for the currently authenticated user
export async function addToWatchlist(symbol: string, company: string) {
    const sym = (symbol || '').toUpperCase().trim();
    const comp = (company || '').trim();
    if (!sym || !comp) throw new Error('Invalid symbol/company');

    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id as string | undefined;
    if (!userId) throw new Error('Not authenticated');

    await connectToDatabase();

    await Watchlist.updateOne(
        { userId, symbol: sym },
        { $set: { company: comp }, $setOnInsert: { addedAt: new Date() } },
        { upsert: true }
    );

    return { ok: true } as const;
}

export async function removeFromWatchlist(symbol: string) {
    const sym = (symbol || '').toUpperCase().trim();
    if (!sym) throw new Error('Invalid symbol');

    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id as string | undefined;
    if (!userId) throw new Error('Not authenticated');

    await connectToDatabase();
    await Watchlist.deleteOne({ userId, symbol: sym });
    return { ok: true } as const;
}

export async function getWatchlistItemsByEmail(email: string) {
    if (!email) return [] as { symbol: string; company: string; addedAt: Date }[];
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('MongoDB connection not found');
        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
        if (!user) return [];
        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];
        const items = await Watchlist.find({ userId }, { symbol: 1, company: 1, addedAt: 1 }).lean();
        return items.map(i => ({ symbol: String(i.symbol), company: String(i.company), addedAt: new Date(i.addedAt) }));
    } catch (err) {
        console.error('getWatchlistItemsByEmail error:', err);
        return [];
    }
}