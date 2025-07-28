Hooks.once("init", () => {
  console.log("Force Next Dice | Initializing");

  game.forceNextDice = {
    mode: "off", // "success", "fail"
    multiDice: false
  };

  const originalEvaluate = Roll.prototype.evaluate;

  Roll.prototype.evaluate = function (options = {}) {
    const state = game.forceNextDice;
    const multiDice = state.multiDice;

    if (state.mode === "off") {
      return originalEvaluate.call(this, options);
    }

    if (this.dice[0].number > 1 && !multiDice) {
      return originalEvaluate.call(this, options);
    }

    if (state.mode === "success") {
      options.maximize = true;
    } else {
      options.minimize = true;
    }

    game.forceNextDice.mode = "off";
    ui.controls.initialize();

    return originalEvaluate.call(this, options);
  };
});

Hooks.on("getSceneControlButtons", controls => {
  if (!game.user.isGM) return;

  let gamemasterControls = controls.find(c => c.name === "gamemaster");
  
  // Create gamemaster category if it doesn't exist
  if (!gamemasterControls) {
    gamemasterControls = {
      name: "gamemaster",
      title: "Gamemaster Tools",
      layer: "controls",
      icon: "fas fa-crown",
      tools: []
    };
    controls.push(gamemasterControls);
  }

  gamemasterControls.tools.push({
    name: "toggle-force-dice",
    title: "FND: Success / Fail / Off",
    icon: "fas fa-dice-d20",
    toggle: true,
    active: game.forceNextDice.mode !== "off",
    onClick: toggled => {
      const nextMode = game.forceNextDice.mode === "off" ? "success"
                      : game.forceNextDice.mode === "success" ? "fail"
                      : "off";

      game.forceNextDice.mode = nextMode;

      ui.notifications.info({
        success: "Forcing: Critical SUCCESS",
        fail: "Forcing: Critical FAILURE",
        off: "Turned off"
      }[nextMode]);

      ui.controls.initialize();
    }
  });

  gamemasterControls.tools.push({
    name: "toggle-multi",
    title: "FND: Allow Multiple Dice",
    icon: "fas fa-dice",
    toggle: true,
    active: game.forceNextDice.multiDice,
    onClick: toggled => {
      game.forceNextDice.multiDice = !game.forceNextDice.multiDice;
      ui.notifications.info(`Allow multiple dice: ${game.forceNextDice.multiDice ? "ON" : "OFF"}`);
      ui.controls.initialize();
    }
  });
});