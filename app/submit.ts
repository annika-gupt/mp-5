'use server';
import getCollection, { URL_COLLECTION } from '@/db';

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
    const collection = await getCollection(URL_COLLECTION); // connects to database and grabs url collection in mongodb
    const exists = await collection.findOne({ alias }); // checks if alias already exists

    if (exists) {
        return 'Alias already exists!'; // if so, it will throw an error
    }
    await collection.insertOne({ alias, url }); // if alias does not exist, it will insert a new query in mongodb
}