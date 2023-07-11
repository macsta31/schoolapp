<script>

    import { reminders } from "../reminderStore";
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { readable, get } from 'svelte/store'
    import Reminder from "../components/Reminder.svelte";

    /**
   * @type {string}
   */
    let task;

    /**
     * @type {boolean}
     */
    let hasTime = true

    /**
     * @type {boolean}
     */
    let hasDate = true

    /**
     * @type {any}
     */
    let time

    /**
     * @type {Date}
     */
    let date

    async function handleSubmit(){
        const { data, error } = await supabase
            .from('Reminders')
            .insert([
                { 
                    userId: '9f72b068-f63b-4679-842d-135041886f17', description: task,
                    dueDate: date,
                    dueTime: time,
                    done: false
                },
            ])
            .select()

            console.log(data, error)

    }

    // if (payload.eventType === 'UPDATE'){
                    
    //             }

    onMount(() => {
        supabase
            .channel('any')
            .on('postgres_changes', { event: '*', schema: '*', table: 'Reminders' }, payload => {
                if (payload.eventType === 'UPDATE') {
                    reminders.update(
                        (old) => {
                            const new_reminders = old.map((/** @type {any} */ reminder) => {
                                if (reminder.id === payload.new.id){
                                    return payload.new
                                }
                                else{
                                    return reminder
                                }
                            })
                            return new_reminders
                        }
                    )
                }
                else {
                    reminders.update((old) => [...old, payload.new])
                }
            })
            .subscribe()
    })


    console.log($reminders)
</script>

<main>
    <section id="taskCreator">
        <h3>What's on the agenda for today?</h3>
        <form action="" on:submit|preventDefault={() => handleSubmit()}>
            <label for="task">
                Task:
                <input type="text" bind:value={task} >
            </label>
            {#if hasDate}
                <label for="date">
                    Due Date:
                    <input type="date" bind:value={date} >
                </label>
            {/if}
            {#if hasTime}
                <label for="time">
                    Time:
                    <input type="time" bind:value={time}>
                </label>
            {/if}
            <button type="submit">Submit</button>
        </form>
        <form action="">
            <label for="hasDate">
                Include Date?
                <input type="checkbox" name="hasDate" bind:checked={hasDate}>
            </label>
            <label for="hasTime">
                Include Time?
                <input type="checkbox" name="hasTime" bind:checked={hasTime}>
            </label>
        </form>
    </section>
    <section id="reminders">
        {#each $reminders as reminder}
            <Reminder reminder={reminder} />
        {/each}
    </section>
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
    }

    #reminders{
        flex: 1 auto;
        align-self: flex-start;
        display: flex;
        flex-wrap: wrap;
        grid-template-columns: repeat(4, 1fr);
        gap:2rem;
    }

    #taskCreator{
        padding: 2rem;
        background-color: var(--secondary);
        margin: 2rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: all 1s ease;
    }

    input{
        border: none;
        background-color: transparent;
        border-bottom: 1px solid var(--text);
        padding: 0.5rem 0rem;
        font-size: 1rem;
    }

    input:focus{
        outline: none;
        height: min-content;
    }

    button{
        background-color: var(--accent);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        transition: all 1s ease;
    }

    button:hover{
        cursor:pointer;
        scale: 1.05;
        transform: translateY(-2px);
        box-shadow: 3px 3px 10px var(--accent);
    }

    button:active{
        scale: 1;
        transform: translateY(0);
        box-shadow: none;
    }

    form{
        display: flex;
        justify-content: space-evenly;
        gap: 1rem;
    }
</style>
