<script lang='ts'>
    import {slide} from 'svelte/transition'
    import Comment from '$components/Comment.svelte'
    import {createClient} from '@supabase/supabase-js';
    import {onMount} from 'svelte';
    interface Reply {
        content:string;
        nickname:string;
        created_at: string;
    }
    interface Comment {
        id?:string;
        post_id?: string;
        content:string;
        nickname:string;
        created_at:string;
        replys?: Reply[] | null;
        isReplying?:boolean;
        showReplies?: boolean;
    }
    
    const supabase = createClient(
        "https://esybdyywxoxfuocijbzw.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzeWJkeXl3eG94ZnVvY2lqYnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMDM2MDksImV4cCI6MjA3MTU3OTYwOX0.oeLezDNZYvxr4P3wPe8t8bMMLjUbNIrV8AJoi4zmk2E"
        );
    let {post} = $props(); 
    let message = $state('');
    let replying = $state(false);
    let showreplys =$state(false);
    let comments:Comment[] = $state([]);
    let isloading = $state(false);
    let isposting = $state(false);
    let replys = $state(['',''])

    const toggleReplies = (commentId: string) => {
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
        comments[commentIndex].showReplies = !comments[commentIndex].showReplies;
    }
};

const toggleReplying = (commentId: string) => {
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
        comments[commentIndex].isReplying = !comments[commentIndex].isReplying;
    }
};

    let textarea:HTMLTextAreaElement | undefined = $state();
    const resize = () => {
        if(!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }  
    const fetchComments = async () => {
    isloading = true;
    comments = []; // 最初に空にしておく（重要）

    const commentRes = await supabase.from("comments").select('*').order('created_at',{ascending:false});
    if (commentRes.error) {
        alert("コメント取得失敗");
        console.error(commentRes.error.message);
        isloading = false;
        return;
    }

    const commentData = commentRes.data as Comment[];

    for (const comment of commentData) {
        // 各コメントに状態を追加
        const replyRes = await supabase
            .from("replies")
            .select("content, nickname, created_at")
            .eq("post_id", comment.id);

        if (replyRes.error) {
            console.warn(`リプライ取得失敗 for comment ${comment.id}:`, replyRes.error.message);
            comments.push({
                ...comment,
                replys: null,
                isReplying: false,  // 初期状態
                showReplies: false   // 初期状態
            });
        } else {
            comments.push({
                ...comment,
                replys: replyRes.data,
                isReplying: false,   // 初期状態
                showReplies: false   // 初期状態
            });
        }
    }

    isloading = false;
};

    onMount(async () => {
        await fetchComments();
    })
    const postComment = async (e:Event) => {
        e.preventDefault();
        isposting = true;
        const form = e.target as HTMLFormElement | null;
        if(!form) {
            alert("送信失敗");
            isposting = false;
            return
        }
        const formData = new FormData(form);
        const post_id = String(formData.get("post_id") ?? '')
        const nickname = String(formData.get("nickname") ?? '')
        const content = String(formData.get("content") ?? ''); 
        const data = {
            post_id: post_id,
            content: content,
            nickname: nickname,
        }
        const res = await supabase.from("comments").insert(data);
        if(res.error) {
            alert(res.error.message);
            isposting= false;
            return
        } else {
            await fetchComments();
            isposting = false;
        }
    }
    const postReply = async (e:Event, comment:Comment) => {
        e.preventDefault()
        isloading = true;
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const content = String(formData.get("nickname"));
        const nickname = String(formData.get("nickname"));
        const comment_id = String(formData.get("comment_id"));

        const data = {
            nickname: nickname,
            content:content,
            post_id:comment_id
        }

        const res = await supabase.from("replies").insert(data);
        if(res.error) {
            alert(res.error.message);
            isloading = false;
            return
        };
        const response = await supabase.from("replies").select("nickname,content,created_at").eq("post_id", comment_id).order("created_at",{ascending:false});
        if(response.error) {
            alert(response.error.message)
            isloading = false;
            return
        } else {
            comment.replys = [...response.data]
            comment.isReplying = false;
            comment.showReplies = true
            isloading = false;
        }
    }
</script>
<hr class="w-full border-b-dotted border-4 border-gray-500/80 dark:border-gray-900 h-1" />
<form transition:slide class="mb-3" onsubmit={postComment}>
    <label for="chat" class="sr-only">
        Your message
    </label>
    <div class="rounded-lg border-solid border-2 border-gray-400">
        <div class="flex flex-col items-center px-3 py-2 bg-white rounded-lg">
            <textarea oninput={resize} id="chat" name="content" rows="1" class="resize-none overflow-hidden block mx-4 p-4 w-full text-sm text-gray-900 outline-none" placeholder="Write your thoughts......" required></textarea>
            
    
            <div class="flex items-center justify-between w-full gap-2">
                <div>
                <div class="flex items-center gap-1">
                    <div class="flex items-center ps-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                          </svg> 
                    </div>
                    <input type="text" id="input-group-1" name="nickname" class="outline-none text-gray-900 text-sm block w-full ps-4 px-2.5 py-1 border-b-solid border-1" required>
                </div>
                </div>
                <div class="flex items-center justify-end  py-2">
                <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path fill="none" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                    </svg>
                    <span class="sr-only">Upload image</span>
                </button>
                <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                    </svg>
                    <span class="sr-only">Add emoji</span>
                </button>
                {#if !isposting}
                <button type="submit" class="inline-flex justify-center p-2 text-teal-500 rounded-full cursor-pointer hover:bg-teal-100 dark:text-teal-200 dark:hover:bg-gray-600">
                    <svg class="size-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                    <span class="sr-only">Send message</span>
                </button>
                {:else}
                <div role="status">
                    <svg aria-hidden="true" class="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                {/if}
                </div>
            </div>
        </div>
    </div>
</form>
{#if isloading}
<div class="w-full flex justify-center items-center p-10">
    <div role="status">
        <svg aria-hidden="true" class="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>
{:else}
{#each comments as comment}
<div transition:slide class="px-4" >
    <div class="w-full pb-6 border-b border-gray-300 justify-start items-start gap-2.5 inline-flex">
        <img class="w-10 h-10 rounded-full object-cover p-1" src="/comment.png" alt="James Miller image" />
        <div class="w-full flex-col justify-start items-start gap-3.5 inline-flex">
            <div class="w-full justify-start items-start flex-col flex gap-1 mt-3">
                <div class="w-full justify-between items-start gap-1 inline-flex">
                    <h5 class="text-gray-900 text-sm font-semibold leading-snug">{comment.nickname}</h5>
                    <span class="text-right text-gray-500 text-xs font-normal leading-5">{comment.created_at}</span>
                </div>
                <h5 class="text-gray-800 text-sm font-normal leading-snug">{comment.content}</h5>
            </div>
            <div class="justify-start items-start gap-5 inline-flex">
                <button onclick={()=>toggleReplying(comment.id)} class="w-5 h-5 flex items-center justify-center group">
                    <svg class="text-gray-600 group-hover:text-gray-800 transition-all duration-700 ease-in-out" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M8.57084 0.140905C8.77176 -0.0157322 9.04438 -0.0441704 9.2733 0.067628C9.50221 0.179426 9.6474 0.411912 9.6474 0.666672V4.007C11.5347 4.11302 13.0359 4.67225 14.2134 5.55105C15.5204 6.52639 16.3797 7.85847 16.9418 9.28015C18.0571 12.1006 18.0478 15.3937 17.9706 17.3595C17.9563 17.7223 17.6544 18.007 17.2913 17.9999C16.9283 17.9927 16.6378 17.6964 16.6378 17.3333C16.6378 17.2088 16.599 16.9855 16.4876 16.6619C16.3796 16.3485 16.2165 15.978 16.0015 15.572C15.5714 14.7597 14.9518 13.8391 14.207 12.9928C13.4603 12.1445 12.6071 11.3927 11.716 10.8938C11.0208 10.5045 10.3252 10.2811 9.6474 10.2644V13.6296C9.6474 13.8844 9.50221 14.1169 9.2733 14.2287C9.04438 14.3405 8.77176 14.312 8.57084 14.1554L0.257105 7.67392C0.095068 7.5476 0.000331879 7.35361 0.000331879 7.14815C0.000331879 6.94269 0.095068 6.74871 0.257105 6.62239L8.57084 0.140905Z" fill="currentColor"/>
                    </svg>
                </button>
                <button onclick={()=>toggleReplies(comment.id)}  class="relative w-5 h-5 flex items-center justify-center group">
                    <div class="absolute inline-flex items-center justify-center size-4 text-[8px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {comment.replys ? comment.replys.length: 0}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
                    </svg>
                  
                </button>
            </div>
        </div>
    </div>
{#if comment.isReplying}
<form transition:slide class="ps-10" onsubmit={(e) => {postReply(e,comment)}}>
    <label for="chat" class="sr-only">
        Your message
    </label>
    <div class="rounded-lg border-solid border-2 border-gray-400">
        <div class="flex flex-col items-center px-3 py-2 bg-white rounded-lg">
            <textarea name="content"  oninput={resize} id="chat" rows="1" class="resize-none overflow-hidden block mx-4 p-4 w-full text-sm text-gray-900 outline-none" placeholder="Write your thoughts......" required></textarea>
            
    
            <div class="flex items-center justify-between w-full gap-2">
                <div>
                <div class="flex items-center gap-1">
                    <div class="flex items-center ps-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                          </svg> 
                    </div>
                    <input type="text" id="input-group-1" name="nickname" class="outline-none text-gray-900 text-sm block w-full ps-4 px-2.5 py-1 border-b-solid border-1" required>
                </div>
                </div>
                <div class="flex items-center justify-end  py-2">
                <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path fill="none" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                    </svg>
                    <span class="sr-only">Upload image</span>
                </button>
                <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                    </svg>
                    <span class="sr-only">Add emoji</span>
                </button>
                {#if !isposting}
                <button type="submit" class="inline-flex justify-center p-2 text-teal-500 rounded-full cursor-pointer hover:bg-teal-100 dark:text-teal-200 dark:hover:bg-gray-600">
                    <svg class="size-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                    <span class="sr-only">Send message</span>
                </button>
                {:else}
                <div role="status">
                    <svg aria-hidden="true" class="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                {/if}
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" name="comment_id" value={comment.id} />
</form>
{/if}
{#if comment.showReplies}
<div transition:slide>
{#if comment.replys}
{#each comment.replys as reply}
<div transition:slide class="ps-14 mt-5">
    <div class="w-full justify-start items-start gap-2.5 inline-flex">
        <img class="size-9 rounded-full object-cover p-1" src="/reply.png" alt="James Miller image" />
        <div class="w-full flex-col justify-start items-start gap-3.5 inline-flex mt-2">
            <div class="w-full justify-start items-start flex-col flex gap-1">
                <div class="w-full justify-between items-start gap-1 inline-flex">
                    <h5 class="text-gray-900 text-sm font-semibold leading-snug">{reply.nickname}</h5>
                    <span class="text-right text-gray-500 text-xs font-normal leading-5">{reply.created_at}</span>
                </div>
                <h5 class="text-gray-800 text-xs font-normal leading-snug">{reply.content}</h5>
            </div>
            
        </div>
    </div>

</div>
{/each}
{/if}
</div>
{/if}
</div>

{/each}
{/if}