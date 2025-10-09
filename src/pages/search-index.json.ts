import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
 export const GET: APIRoute = async () =>{
    const notes = await getCollection("note");
    const jottings = await getCollection("jotting");
    const data = [...notes, ...jottings];
    const indexData = data.map(post=>({
        id: post.id,
        title: post.data.title,
        body: post.body,
    }));
    return new Response(JSON.stringify(indexData));
 };