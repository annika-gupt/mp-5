import getCollection, { URL_COLLECTION } from '@/db';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params; // ✅ await the promise

    const collection = await getCollection(URL_COLLECTION);
    const record = await collection.findOne({ alias });

    if (record?.url) {
        redirect(record.url);
    }

    return <p>Alias not found</p>;
}