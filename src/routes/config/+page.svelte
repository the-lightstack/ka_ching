<script lang="ts">
    import { userSettings } from "$lib/state/userSettings";
	import { SaveButtonState, type UserSettings } from "$lib/types";
	import { get } from "svelte/store";


    let us = get(userSettings);
    console.log(us)

    let start_time:number = $state(get(userSettings).workStartTime);
    let end_time:number = $state(get(userSettings).workEndTime);
    let hourly_wage:number = $state(get(userSettings).hourlyWage);

    let save_button_state = $state(SaveButtonState.Normal);

    // maybe do live updating here ...
    const time_pad = (num:number) => String(num).padStart(2, '0')

    const upateSettings = () =>{
        let newSettings:UserSettings = {
			workStartTime: start_time,
			workEndTime: end_time,
			hourlyWage: hourly_wage
		};

        userSettings.set(newSettings);
    }

</script>

<div class="p-12 ">
    <h1 class="text-xl pb-2 text-slate-800 font-bold">Settings</h1>
    <hr>
    <div class="flex flex-col gap-2.5 p-4 pl-0">


    <div class="flex flex-row gap-3 ">
        <label for="work_start_input" class="text-zinc-800 min-w-32">Work Start Time</label>
        <input bind:value={()=>{
            let hours = Math.floor(start_time/60);
            let minutes = start_time % 60;
            return `${time_pad(hours)}:${time_pad(minutes)}`;
        }, (new_v:string) => {
            console.log({new_v});
            let parts = new_v.split(":");
            start_time = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }}
        type="time" id="work_start_input" >
    </div>
    <div class="flex flex-row gap-3">
        <label for="work_end_input" class="text-zinc-800 min-w-32">Work End Time</label>
        <input bind:value={()=>{
            let hours = Math.floor(end_time/60);
            let minutes = end_time % 60;
            return `${time_pad(hours)}:${time_pad(minutes)}`;
        }, (new_v:string) => {
            console.log({new_v});
            let parts = new_v.split(":");
            end_time = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }} type="time" id="work_end_input">
    </div>
    <div class="flex flex-row gap-3">
        <label for="wage_input" class="text-zinc-800 min-w-32">Hourly Wage</label>
        <input type="number" step="0.2" id="wage_input" bind:value={hourly_wage}>
    </div>
    <div class="transition-all">
        {#if save_button_state == SaveButtonState.Normal}
            <button class="p-2 min-w-20 rounded-md cursor-pointer hover:bg-blue-400 bg-blue-600 text-white font-bold" onclick={()=>{
                upateSettings();
                save_button_state = SaveButtonState.Success;
                setTimeout(()=>{
                    save_button_state = SaveButtonState.Normal;
                },1000);
             }}>Save</button>
        {:else if save_button_state == SaveButtonState.Success}
            <button class="p-2 min-w-20 rounded-md cursor-pointer hover:bg-green-500 bg-green-600 text-white font-bold" onclick={upateSettings}>Save ✓</button>
        {/if}
    </div>
</div>
</div>

<div class="absolute bottom-8 left-1/2">
    <a class="text-indigo-500 hover:text-indigo-400 font-bold" href="/">Home</a>
</div>