<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    export let reminder:any;

    async function handleDone(value: boolean) {
        reminder.done = !reminder.done
        const { data, error } = await supabase
            .from('Reminders')
            .update({ done: !value }) // update this line
            .eq('id', reminder.id)
            .select()

        // console.log(data, error);
    }

    async function handleDelete(id: number){
        const { data, error } = await supabase
            .from('Reminders')
            .delete()
            .eq('id', id)
    }



</script>

<div>
    <h3>{reminder.description}</h3>
    <p>{reminder.dueDate || ''}</p>
    <p>{reminder.dueTime || ''}</p>
    <p>{reminder.id}</p>
    <p>{reminder.done}</p>
    <button on:click={() => handleDone(reminder.done)}>{reminder.done ? "Mark Not Done" : "Mark Done"}</button>
    <button on:click={() => handleDelete(reminder.id)}>Delete</button>



    
</div>

<style>
    div{
        max-width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        background-color: var(--primary);
        border-radius: 1rem;
        color: white;
        gap: 1rem;
    }
    div > * {
        color: white;
    }
    button{
        padding: 0.5rem 1rem;
        background-color: var(--accent);
        color: white;
        border: none;
        border-radius: 1rem;
        transition: all 0.5s ease-in-out
    }
    button:hover{
        transform: translateY(-3px);
        cursor:pointer;
    }

</style>