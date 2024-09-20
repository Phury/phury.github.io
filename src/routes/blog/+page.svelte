<script>
    import Markdown from "$lib/components/Markdown.svelte";

    const MAX_FEED = 10;

    async function blogFeed$() {
        const resp = fetch('/data/feeds.json');
        return (await resp).json();
    }

    function format(date) {
        let userLocale = navigator.language || navigator.userLanguage;
        return new Date(date).toLocaleDateString(userLocale);
    }
</script>


<article class="blog">
    <section class="intro" id="intro">
    {#await blogFeed$()}
        <p>loading json feed ...</p>
    {:then feed}
        <Markdown>
I maintain different blogs to share my passions:

* one for insights on [software architecture and development](http://phulkor.tumblr.com/)<i>🡕</i>,
* another dedicated to my journey in [kendo](https://banana-waza.tumblr.com/)<i>🡕</i>,
* and a third where I explore my love for [Magic: The Gathering](https://manascrwd.tumblr.com/)<i>🡕</i>,

Each reflects a unique aspect of who I am.

Latest posts:
        </Markdown>
        <div class="feed">
            {#each feed as that, i}
                {#if i<MAX_FEED}
                <div class="card">
                    <a href="{that.link}" target="_blank" rel="noopener">
                        {that.title}
                    </a>
                    <p class="date">{format(that.date)}</p>
                    <p class="classification">
                    {#if that.link.includes("phulkor")}
                        dev
                    {:else if that.link.includes("banana")}
                        kendo
                    {:else if that.link.includes("mana")}
                        mtg
                    {:else}
                        unclassified
                    {/if}
                    </p>
                </div>
                {/if}
            {/each}
        </div>
    {/await}
    </section>
</article>


