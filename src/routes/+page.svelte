<script lang="ts">

    import { userSettings } from "$lib/state/userSettings";
	import { CurrentWorkStatus, getCurrentWorkStatus, getSecondsToday, SaveButtonState, type UserSettings } from "$lib/types";
	import { get } from "svelte/store";

    let user_settings = get(userSettings);
    let bucks_per_second = user_settings.hourlyWage / 3600;


    let secs_since_midnight = getSecondsToday();
    // check here. If after end, show "Congrats, today you earned XXX", Otherwise (before) maybe: Go to work you lazy

    let work_status = $state(getCurrentWorkStatus(user_settings));


    let seconds_worked_today = secs_since_midnight - (user_settings.workStartTime*60);
    let money_counter = $state(seconds_worked_today * bucks_per_second);

    setInterval(()=>{
        work_status = getCurrentWorkStatus(user_settings);
        // console.log("WS: ",work_status);
        money_counter += bucks_per_second;
    },1000);

</script>


<!-- <div class="w-screen h-screen bg-[url(/dollar_bill.svg)] bg-size-[auto_130px] bg-repeat bg-center"> -->
<div class="w-screen h-screen grid place-items-center">
    <div class="w-2/3  md:w-1/3 h-1/2">
        <h1 class="text-2xl italic font-bold mb-4">Ka-Ching</h1>
        <div class="flex flex-col items-center p-4 justify-center gap-2 border-2 border-amber-200 rounded-md">

            {#if work_status == CurrentWorkStatus.Before}
            <p class="font-bold text-md text-slate-700">Get yourself mentally ready to make big racks 🤑🤑</p>
            {:else if work_status == CurrentWorkStatus.Working}
            <p class="font-bold text-slate-700 text-md italic">Today you have earned</p>
            <p class="text-5xl text-green-600 font-extrabold font-[Domine]">{money_counter.toFixed(3)} $</p>
            {:else if work_status == CurrentWorkStatus.After}
            <p>Wuhu, you are done for today!!</p>
            <p>You made</p>
            <p class="text-5xl text-green-600 font-extrabold font-[Domine]">{((user_settings.workEndTime - user_settings.workStartTime)*60 * bucks_per_second).toFixed(2)}$</p>
            {/if}

        </div>

    </div>


</div>

<div class="absolute bottom-8 left-1/2">
    <a class="text-indigo-500 font-bold" href="/config">Settings</a>
</div>