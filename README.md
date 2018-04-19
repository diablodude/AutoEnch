# AutoEnch

This is a little script that can ench other bots on start of a game, similar to Scripts.BattleOrders.

# INSTALLATION

Add Auto.Ench.js to d2bs/kolbot/libs/bots/



Add following lines to d2bs/kolbot/libs/common/Config.js:

AutoEnch: {
    Mode: 0,
    Getters: [],
    Wait: false
    },



Add to your character config:

Scripts.AutoEnch = true;
    Config.AutoEnch.Mode = 1; // 0 = give ench, 1 = get ench
    Config.AutoEnch.Wait = true; // Idle until the player that received BO leaves.
    Config.AutoEnch.Getters = ['CharA','CharB']; // List of players to wait for before casting Ench (mode 0). All players must be in the same area as the EnchSorc.


