<script>
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import TableOfContent from '$lib/components/TableOfContent.svelte';

    const menu = [
        { url: '/', name: 'home'},
        { url: '/blog', name: 'blog'},
        { url: '/projects', name: 'projects'},
        { url: '/about', name: 'about'},
    ];
</script>

<svelte:head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>phvdv ~ Pierre-Henri Van de Velde</title>


    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="Pierre-Henri Van de Velde, software engineer, software architect, java developer, scrum master, java" />
    <meta name="keywords" content="software engineer, software architect, java developer, scrum master, java, fullstack developer, kendo" />
    <meta name="author" content="Pierre-Henri Van de Velde" />
    <meta name="publisher" content="Pierre-Henri Van de Velde" />
    <meta name="Identifier-URL" content="https://phury.github.io" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="robots" content="index,follow" />
    <!--
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    -->
    <link href="{base}/css/styles.css" rel="stylesheet" type="text/css" />
</svelte:head>

<header id="home"></header>
<aside>
    <nav>
        <ul>
            {#each menu as item}
            <li class:active={$page.url.pathname === item.url}><a href="{ base + item.url }">{item.name}</a></li>
            {/each}
        </ul>
        <TableOfContent />
    </nav>
</aside>

<slot></slot>

<footer>
    <p>
        <span>Code & design by <a href="http://phury.github.io" target="_blank">me</a></span> |
        <span>Coded in <a href="">Svelte</a></span> |
        <span>Hosted on <a href="">Github</a></span>
    </p>
</footer>
