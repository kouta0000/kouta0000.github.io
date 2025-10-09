<script lang="ts">
    import { onMount } from 'svelte';
    import { Index } from 'flexsearch';
    import {fade, slide} from 'svelte/transition'
    import { getRelativeLocaleUrl } from 'astro:i18n';
    // restoreFocus の import は本番で存在しない場合があるため、使っていないなら一旦コメントアウト推奨
    // import { restoreFocus } from 'astro/virtual-modules/transitions-swap-functions.js';
  
    interface Doc {
      id: string | number;
      title: string;
      body?: string;
    }
  
    let query = $state('');
    let query2 = $state('');
    let index: Index | null = $state(null);
    let documents: Doc[] = $state([]);
    let results: Doc[] = $state([]);
    let show = $state(false);
    
    onMount(async () => {
    // SSR保険
    if (import.meta.env.SSR) return;

    // ブラウザAPIはここから
   

    try {
        const baseRaw = import.meta.env.BASE_URL || '/';
// strip trailing slashes, then add exactly one
const base = baseRaw.replace(/\/+$/, '') + '/';
const url = `${base}search-index.json`;
      const res = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' });
      if (!res.ok) {
        console.error('Failed to fetch search-index.json', res.status);
        return;
      }
      documents = await res.json();

      index = new Index({ tokenize: 'forward', cache: true, worker: false });

      for (const doc of documents) {
        const id = String(doc.id);
        const text = `${doc.title ?? ''} ${doc.body ?? ''}`;
        index.add(id, text);
      }
    } catch (e) {
      console.error('Search init error:', e);
    }

    
  });
    const handleQuery = (input:string) => {
      if (!index || !input) {
        results = [];
        return;
      }
      const ids = index.search(input);
      // FlexSearch は id の配列を返す。文字列に正規化して比較
      results = ids
        .map((id: string | number) => {
          const sid = String(id);
          return documents.find((d) => String(d.id) === sid);
        })
        .filter((d): d is Doc => Boolean(d))
        .slice(0, 5);
    };
  </script>
 
  <button onclick={()=> {show=!show}} class="sm:hidden">
    {#if !show}
    <svg in:fade xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
    
  {:else}
  <svg in:fade xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
{/if}  
  </button>
  {#if show}
  <div out:fade={{duration:100}} class="w-xs absolute top-[150%] right-0 group mb-6 sm:hidden">
    <label for="default-search" class="mb-2 text-xs font-medium text-gray-900 sr-only dark:text-white">
      Search
    </label>
    <div class="relative">
      <input
        type="search"
        id="default-search"
        bind:value={query}
        oninput={()=>handleQuery(query)}
        onfocusout={() => { setTimeout(()=>{results = []; query = '';show=false},300)}}
        class="shadow-md rounded-full block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        required
      />
    </div>
    {#if results.length > 0}
    <div transition:slide class="shadow-lg rounded-b-xl w-full absolute top-[100%] inset-x-0 transition-all duration-500 flex flex-col items-center devided bg-white dark:bg-gray-800">
      
        {#each results as item}
        <div transition:slide class="p-2 relative">
            <a href={getRelativeLocaleUrl('ja', `/note/${item.id.split("/").slice(1).join("/")}`)} class="link absolute inset-0"></a>
          <p class="w-full text-sm text-gray-800 px-8 mb-2">
            {item.title}
          </p>
          <p class="w-full text-xs text-gray-500 px-8 line-clamp-2">{item.body ?? ''}</p>
        </div>
        <hr class="h-0.5 w-9/10 bg-gray-200" />
      {/each}
      
    </div>
    {/if}
  </div>
  {/if}

  <aside out:fade={{duration:100}} class="hidden sm:block group mt-2 relative">
    <label for="default-search" class="mb-2 text-xs font-medium text-gray-900 sr-only dark:text-white">
      Search
    </label>
    <div class="relative">
      <input
        type="search"
        id="default-search"
        bind:value={query2}
        oninput={()=>handleQuery(query2)}
        onfocusout={() => { setTimeout(()=>{results = []; query = '';show=false},300)}}
        class="rounded-full block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100/80 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        required
      />
    </div>
    {#if results.length > 0}
    <div transition:slide class="shadow-lg rounded-b-xl w-[150%] absolute top-[100%] inset-x-0 transition-all duration-500 flex flex-col items-center devided bg-white dark:bg-gray-800">
      
        {#each results as item}
        <div transition:slide class="p-2 relative">
            <a href={getRelativeLocaleUrl('ja', `/note/${item.id.split("/").slice(1).join("/")}`)} class="link absolute inset-0"></a>
          <p class="w-full text-sm text-gray-800 px-8 mb-2">
            {item.title}
          </p>
          <p class="w-full text-xs text-gray-500 px-8 line-clamp-2">{item.body ?? ''}</p>
        </div>
        <hr class="h-0.5 w-9/10 bg-gray-200" />
      {/each}
      
    </div>
    {/if}
  </aside>