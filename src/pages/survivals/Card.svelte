<script lang="ts">
    import { onMount } from "svelte";
    let {japanese, target}:{japanese:string,target:string} = $props();
    let isfocused: boolean = $state(false);
    onMount(()=>{
        document.addEventListener('scroll',()=>{
            
            isfocused=false;
        })
    })
</script>
<div class="mb-8 font-pixel">
    <div onclick={()=>{isfocused=!isfocused}} class="max-w-sm mx-auto relative border-2 border-gray-200 dark:border-gray-100 border-solid rounded-xl overflow-hidden cursor-pointer h-30">
        <div class="absolute inset-0 flex items-center justify-center p-10 border-l-solid border-r-solid border-20 border-gray-600 dark-border-gray-100 transition-transform duration-500 ease-in-out {isfocused? "translate-x-full": "translate-x-0"}">
            <div class="tracking-wider">{japanese}</div>
        </div>
        <div class="text-lg absolute inset-0 flex items-center justify-center px-8 transition-transform duration-500 ease-in-out border-l-solid border-r-solid border-20 text-teal-950 dark:text-white border-teal-800 dark:border-teal-100 {isfocused? "translate-x-0": "-translate-x-full"}">
            <p class="tracking-wider">{target}</p>
        </div>
    </div>
</div>