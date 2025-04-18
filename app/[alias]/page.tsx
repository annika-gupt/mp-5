import { redirect } from 'next/navigation';
import get from '../get';

export default async function RedirectPage({ params }: { params: Promise<{ alias: string }>;}) {
    const { alias } = await params;
    console.log("alias: ", alias);

    const url = await get(alias);

    if (url) { // checks whether record exists and has url property
        redirect(url); // if alias is found, it redirects user to matching URL using redirect()
    }
    redirect("/");
}