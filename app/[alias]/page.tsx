import getCollection, { URL_COLLECTION } from '@/db';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: Promise<{ alias: string }>;}) {
    const collection = await getCollection(URL_COLLECTION); // connects to database and grabs url collection in mongodb
    const record = await collection.findOne({ alias: (await params).alias }); // searches documents for alias

    if (record?.url) { // checks whether record exists and has url property
        redirect(record.url); // if alias is found, it redirects user to matching URL using redirect()
    }
    return <p>Alias not found</p> // prints error message if alias is not found
}