<script>
    import { onDestroy } from 'svelte'
    import {store} from '$lib/store.ts';

    function buildSubmenu(jsonResume) {
        return [
            { anchor: '#profile', name: 'profile' },
            { anchor: '#workExperience', name: 'experience' },
            { anchor: '#education', name: 'education' },
            { anchor: '#other', name: 'other' }
        ];
    }

    async function resume$() {
        const resp = fetch('/data/resume.json');
        const jsonResume = (await resp).json();
        $store.toc = buildSubmenu(jsonResume);
        return jsonResume;
    }

    onDestroy(() => $store.toc = null);
</script>


<article class="resume">
{#await resume$()}
    <p>loading resume ...</p>
{:then resume}
    <!--
    <abstract>
        <h1>{resume.objectives.en}</h1>
    </abstract>
    -->
    <section>
        🌍{resume.personalInfo.location}
    </section>

    <section id="profile">
        {resume.about.en}
    </section>
    <section>
        <h1 id="workExperience">
            Current position
        </h1>
        <div class="container">
            {#each resume.workExperience as that, i}
                {#if i === 0 || i === 1}
                <h4>
                    {that.role} @{that.company}, {that.location.city}
                    {#if that.location.country !== resume.personalInfo.country}
                    <span>
                        {resume.personalInfo.country}
                        ({that.location.country})
                    </span>
                    {/if}
                </h4>
                <p class="meta date">{that.period.from} — {that.period.to}</p>
                <p>
                    {that.overview.en}
                </p>
                {/if}
            {/each}
        </div>
    </section>
    <section>
        <h1 id="education">
            Education
        </h1>
        <div class="container">
            {#each resume.education as that, i}
            {#if i === 0}
            <h4>
                {that.degree}, {that.institution}, {that.location.city}
            </h4>
            <p class="meta date">{that.period.from} — {that.period.to}</p>
            {/if}
            {/each}
        </div>
    </section>
    <div class="extra">
        <span id="other"></span>
        <section>
            <h1 id="skills">Skills</h1>
            <ul>
                {#each resume.skills as that}<li>{that}</li>{/each}
            </ul>
        </section>
        <section>
            <h1 id="languages">Languages</h1>
            <ul>
                {#each resume.languages as that}
                    <li>{that.language}: {that.level}</li>
                {/each}
            </ul>
        </section>
        <section>
            <h1 id="interests">Hobbies</h1>
            {#each resume.interests as that}
                <li>{that}</li>
            {/each}
        </section>
        <section>
            <h1 id="social">Social</h1>
            <ul>
                {#each resume.personalInfo.social as that}
                    <li><a href="{that.link}">{that.name}</a></li>
                {/each}
            </ul>
        </section>
    </div>
{/await}
</article>
