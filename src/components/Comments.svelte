<script lang='ts'>
    import {slide} from 'svelte/transition'
    import Comment from '$components/Comment.svelte'
    let {post} = $props(); 
    let message = $state('');
    let replying = $state(false);
    let showreplys =$state(false);
    let comments = $state(['','']);
    const handleReply = () => {
        replying = !replying;
    }
    const handleShowReplys = () => {
        showreplys = !showreplys
    }
    let textarea:HTMLTextAreaElement | undefined = $state();
    const resize = () => {
        if(!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
</script>
{#each comments as comment}
<Comment  comment={comment} post={post} />
{/each}
<form transition:slide class="mb-3">
    <label for="chat" class="sr-only">
        Your message
    </label>
    <div class="rounded-lg border-solid border-2 border-gray-400">
        <div class="flex flex-col items-center px-3 py-2 bg-white rounded-lg">
            <textarea bind:this={textarea} bind:value={message} oninput={resize} id="chat" rows="1" class="resize-none overflow-hidden block mx-4 p-4 w-full text-sm text-gray-900 outline-none" placeholder="Write your thoughts......" required></textarea>
            
    
            <div class="flex items-center justify-between w-full gap-2">
                <div>
                <div class="flex items-center gap-1">
                    <div class="flex items-center ps-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                          </svg> 
                    </div>
                    <input type="text" id="input-group-1" class="outline-none text-gray-900 text-sm block w-full ps-4 px-2.5 py-1 border-b-solid border-1" required>
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
                <button type="submit" class="inline-flex justify-center p-2 text-teal-500 rounded-full cursor-pointer hover:bg-teal-100 dark:text-teal-200 dark:hover:bg-gray-600">
                    <svg class="size-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                    <span class="sr-only">Send message</span>
                </button>
                </div>
            </div>
        </div>
    </div>
</form>
