<script>
    import { marked } from 'marked';
    import { onMount } from 'svelte';

    let markdownContent;

    onMount(() => {
        let parsedContent = marked(markdownContent.innerHTML);
        console.log(parsedContent);
        markdownContent.innerHTML = parsedContent;
    });
</script>

<div bind:this={markdownContent} class="markdown-content">
    <slot></slot>
</div>