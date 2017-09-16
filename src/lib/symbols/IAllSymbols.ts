// Generic interface to make sure you have

export interface IAllSymbols<T> {

        '#': T; // Wall
        '.': T; // Floor

        N: T; // Treasure quest-result

        K: T; // Cobweb, same as carpet, everything above
        A: T;  // Skull , floor or carper below, blood seeps below
        é: T; // Carpet, like a floor nothing more, nothing below this
        '=': T;  // "(blood) seeps to floor or carpet",
        '²': T;

        '^': T;  // Door north ,top
        '>': T;  // Door east  ,top
        '<': T;  // Door west  ,top
        v: T;  // Door south   ,top
        X: T;  // Teleport, exclusive
        µ: T;  // Stairs change level , exclusive

        '"': T;  // Death-totum
        '(': T;  // Lava
        '!': T;  // Tourch
        U: T;  // Trader
        Q: T;  // Quest Regenerator

        O: T;  // Water
        $: T; // Acid Bath
        '£': T;

        z: T;  // Closet
        '&': T;  // Treasure chest
        H: T;  // Coffin
        '*': T;  // Table

        I: T;  // Red pentagram trap
        m: T;  // Half moon trap
        R: T;  // Pentagram
        C: T;  // Secret pressure plate

        w: T;  //  Spikes
        S: T;  //  Bear trap

        P: T;  // Twirl-stone, looks like dna helix#
        '{': T;  // Beer barrel
        Y: T;  // Cross tombstone
        V: T;  // Tombstone
        J: T;  // Vase
        B: T;  // Statue wizard

        T: T;  // Skeleton-enemy
        '%': T;  // Boss
        E: T;  // Goblin
        F: T;  // Bat
        G: T;  // Rat
        '@': T;  // Green wizard shaman throws fire

        u: T;  // Magic spellbook (earth-quake, defense, warrior shout)

        Z: T;  // Shield
        t: T;  // Mace
        x: T;  // Boots
        ç: T;  // Pants

        L: T;  // Stone
        M: T;  // Coin, gold

        s: T;  //   Bottle water
        p: T;  //   Bottle milk
        r: T;  //   Chicken-bone
        q: T;  //   Cheese
        i: T;  //   Elixer
        ';': T;  //   Fish
        '§': T;  //   Mana
        l: T; //   Magic-potion
        [index: string]: T;
    }
