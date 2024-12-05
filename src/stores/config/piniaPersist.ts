

const piniaPersistConfig = (key: string,paths?: string[])=>{
    const persist = {
        key,
        storage: localStorage,
        paths

    };
    return persist;
}

export default piniaPersistConfig;