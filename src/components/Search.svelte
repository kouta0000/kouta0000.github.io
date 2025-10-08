<script lang="ts">
    import { onMount } from 'svelte';
    import { Index } from 'flexsearch';
    import { getRelativeLocaleUrl } from "astro:i18n";
    
  
    interface Doc {
      id: string | number;
      title: string;
      body?: string;
    }
  
    let query = '';
    let index: Index | null = null;
    let documents: Doc[] = [];
    let results: Doc[] = [];
  
    onMount(async () => {
      try {
        const base = import.meta.env.BASE_URL ?? '/';
        const res = await fetch(`${base}/search-index.json`, {
          headers: { 'accept': 'application/json' },
          cache: 'no-store' // CDN/キャッシュの揺れ対策
        });
        if (!res.ok) {
          console.error('Failed to fetch search-index.json', res.status);
          return;
        }
        documents = await res.json();
  
        // クライアントで Index を生成（Worker オフでCSP回避）
        index = new Index({ tokenize: 'forward', cache: true, worker: false });
  
        // 安全に追加（型/undefined対策）
        for (const doc of documents) {
          const id = String(doc.id);
          const text = `${doc.title} ${doc.body ?? ''}`;
          index.add(id, text);
        }
      } catch (e) {
        console.error('Search init error:', e);
      }
    });
  
    const handleQuery = () => {
      if (!index || !query) {
        results = [];
        return;
      }
      const ids = index.search(query);
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
  
  <div class="sticky w-full max-w-md mx-auto relative group">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
      Search
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        bind:value={query}
        on:input={handleQuery}
        on:focusout={() => { setTimeout(()=>{results = []; query = ''; },300)}}
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        required
      />
    </div>
  
    <div class="shadow-lg rounded-b-xl w-full absolute top-[100%] inset-x-0 transition-all duration-500 flex flex-col items-center devided bg-white dark:bg-gray-800">
      {#each results as item}
        <div class="p-2 relative">
            <a href={getRelativeLocaleUrl('ja', `/note/${item.id.split("/").slice(1).join("/")}`)} class="absolute inset-0 hover:bg-gray-500/10"></a>
          <p class="w-full text-sm text-gray-600 px-8 mb-2">
            {item.title}
          </p>
          <p class="w-full text-xs text-gray-500 px-10 line-clamp-1">{item.body ?? ''}</p>
        </div>
        <hr class="h-0.5 w-9/10 bg-gray-200" />
      {/each}
    </div>
  </div>
  