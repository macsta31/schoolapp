// @ts-nocheck
import { writable } from 'svelte/store'
import { supabase } from '$lib/supabaseClient';
// userId: 9f72b068-f63b-4679-842d-135041886f17

function createRemindersStore(initial){
    let uid = 1;

    const reminders = initial.map(({ id, created_at, description, dueDate, dueTime, done }) => {
        return {
            id, created_at, description, dueDate, dueTime, done
        };
    });

    const { subscribe, update } = writable(reminders)

    return {
        subscribe,
        update
    }
}

async function load(){
    const { data } = await supabase.from('Reminders').select()
    return {
        reminders: data ?? [],
    }
}

let initReminders = await load()


export const reminders = createRemindersStore(initReminders.reminders)