<script>
    import {store} from '$lib/store.ts';
</script>

{#if $store.toc}
<ul>
    {#each $store.toc as item}
    <li><a href="{item.anchor}">{item.name}</a></li>
    {/each}
</ul>
{/if}