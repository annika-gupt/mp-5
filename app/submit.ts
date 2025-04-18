'use server';
import getCollection, { URL_COLLECTION } from '@/db';
import get from './get';

export async function createAlias(formData: FormData) {
    // fetches user's inputted url and alias from form data and converts it into a string
    const url = formData.get('url')?.toString();
    const alias = formData.get('alias')?.toString();

    // error handing if url or alias are null/undefined
    if (!url || !alias) {
        return 'Missing input!';
    }
    try {
        new URL(url); // checks if url is a valid URL
    } catch {
        return 'Invalid URL'; // if not, throws an error
    }

    const existingURL = await get(alias);
    if (existingURL){
        return 'Alias already exists!';
    }

    const collection = await getCollection(URL_COLLECTION); // connects to database and grabs url collection in mongodb
    const res = await collection.insertOne({ alias, url }); // if alias does not exist, it will insert a new query in mongodb

    return res.acknowledged ? "" : "Something went wrong. Please try again.";
}