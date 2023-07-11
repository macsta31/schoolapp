<script lang="ts">
    import '../global.css'
</script>

<main>
    <header style="primary">
        <div>
            <h1>Title</h1>
        </div>
    </header>
    <section>
        <slot />
    </section>

    <footer>
        <div>
            footer
        </div>
    </footer>

</main>

<style>
    main{
        height: 100%;
    }
    header{
        background-color: var(--primary);
        padding: 1rem 0rem;

    }
    div{
        margin: 0 4rem;
    }
    section{
        display: flex;
        justify-content: center;

    }
    footer{
        position: absolute;
        bottom: 0;
        left:0;
        width: 100%;
        display: grid;
        place-content: center;
        padding: 1rem;
    }
</style>