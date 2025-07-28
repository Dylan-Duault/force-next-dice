# Force Next Dice

A Foundry VTT module that allows Game Masters to force the next dice roll to be a critical success or failure, with support for single or multiple dice rolls.

## Why Use This Module?

As a Game Master, there are many situations where you might want to control dice outcomes for storytelling purposes:

- **Dramatic Moments**: Ensure a critical hit lands during a climactic boss fight, or guarantee a dramatic failure at the perfect narrative moment
- **Cinematic Encounters**: Create memorable moments by ensuring key NPCs succeed or fail at dramatically appropriate times
- **Session Recovery**: Salvage a session when multiple bad rolls threaten to stall progress or create frustration

## Features

- **Force Critical Success/Failure**: Toggle between forcing critical success, critical failure, or normal dice rolls
- **Multiple Dice Support**: Choose whether to affect single dice rolls or all dice in a roll
- **GM-Only Controls**: All controls are restricted to Game Masters only
- **Gamemaster Tools Integration**: Adds controls to the dedicated Gamemaster Tools section in scene controls
- **Auto-Reset**: Automatically returns to normal mode after forcing a roll (prevents accidental repeated forcing)

## Installation

### Manual Installation
1. Download the module files
2. Extract to your Foundry `Data/modules/force-next-dice/` directory
3. Restart Foundry VTT
4. Enable the module in your world's module settings

### From Manifest URL
Use this manifest URL in Foundry's module installer:
```
https://raw.githubusercontent.com/dylan-duault/force-next-dice/main/module.json
```

## Usage

Once installed and enabled, Game Masters will see two new buttons in the **Gamemaster Tools** section of the scene controls:

### Force Next Dice (🎲)
- **Off**: Normal dice rolling behavior
- **Success**: Forces the next dice roll to maximum values (critical success)
- **Failure**: Forces the next dice roll to minimum values (critical failure)

Click the button to cycle through: Off → Success → Failure → Off

### Allow Multiple Dice (🎲)
- **Off**: Only affects single dice rolls (rolls with multiple dice are unaffected)
- **On**: Affects all dice rolls, including those with multiple dice

## How It Works

The module intercepts the `Roll.prototype.evaluate` function and modifies the evaluation options:
- **Success Mode**: Sets `options.maximize = true`
- **Failure Mode**: Sets `options.minimize = true`
- **Multi-Dice Check**: Respects the multiple dice setting to determine which rolls to affect

After forcing a roll, the module automatically resets to "Off" mode to prevent accidental repeated forcing.

## Compatibility

- **Foundry VTT**: Version 12+ (Verified up to v12)
- **Game Systems**: Universal - works with any game system that uses Foundry's standard dice rolling

## Technical Details

The module creates or adds to the "gamemaster" control category. If no gamemaster category exists, it creates one with a crown icon. This ensures compatibility with other modules that may also use gamemaster tools.

## Author

Dylan Duault

## License

This module is provided as-is for use with Foundry Virtual Tabletop.

## Support

For issues, feature requests, or contributions, please visit the [GitHub repository](https://github.com/dylan-duault/force-next-dice).
