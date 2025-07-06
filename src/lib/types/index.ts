

// maybe add currency here
export type UserSettings = {
    workStartTime: number, // since 0:00 in *minutes*
    workEndTime: number,
    hourlyWage: number,
}


export enum SaveButtonState{
    Normal,
    Success
}

export enum CurrentWorkStatus{
    Before,
    Working,
    After
}

export function getCurrentWorkStatus(us:UserSettings):CurrentWorkStatus{
    const secs_since_midnight = getSecondsToday();
    // console.info("SSM: ",secs_since_midnight)
    // console.info("WET: ", us.workEndTime)

    if (secs_since_midnight < us.workStartTime*60){
        return CurrentWorkStatus.Before;
    }else if(secs_since_midnight >= us.workStartTime*60 && secs_since_midnight <= us.workEndTime * 60){
        return CurrentWorkStatus.Working;
    }else{
        return CurrentWorkStatus.After;
    }
}

export function getSecondsToday():number{
    const n = new Date(Date.now());
    return n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds();
}