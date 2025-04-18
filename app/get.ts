import getCollection, { URL_COLLECTION } from '@/db';

export default async function get(alias: string): Promise<string | null> {
    if (!alias) {
        return null;
    }

    const entriesCollection = await getCollection(URL_COLLECTION);
    const doc = await entriesCollection.findOne({alias});

    if (!doc) {
        return null;
    }

    return doc.url;
}