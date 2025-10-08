import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
 export const GET: APIRoute = async () =>{
    const posts = await getCollection("note");
    const indexData = posts.map(post=>({
        id: post.id,
        title: post.data.title,
        body: post.body,
    }));
    return new Response(JSON.stringify(indexData), {
        headers: {
            'Content-type': 'application/json'
        },
    });
 };