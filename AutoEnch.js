/**
*	@filename	AutoEnch.js
*	@author		kolton; ksk
*	@desc		give or receive Ench
*/

function AutoEnch() {
	this.giveENCH = function (list) {
		var i, unit,
			failTimer = 60,
			tick = getTickCount();

		for (i = 0; i < list.length; i += 1) {
			unit = getUnit(0, list[i]);

			if (unit) {
				while (!unit.getState(16) && copyUnit(unit).x) {
					if (getTickCount() - tick >= failTimer * 1000) {
						showConsole();
						print("ÿc1AutoEnch timeout fail.");
						quit();
					}

					Precast.doPrecast(true);
					delay(1000);
				}
			}
		}

		return true;
	};

	Town.doChores();

	try {
		Pather.useWaypoint(35, true); // catacombs
	} catch (wperror) {
		showConsole();
		print("ÿc1Failed to take waypoint.");
		quit();
	}

	Pather.moveTo(me.x + 6, me.y + 6);

	var i,
		tick = getTickCount(),
		failTimer = 60;

MainLoop:
	while (true) {
		switch (Config.AutoEnch.Mode) {
		case 0: // Give BO
			for (i = 0; i < Config.AutoEnch.Getters.length; i += 1) {
				while (!Misc.inMyParty(Config.AutoEnch.Getters[i]) || !getUnit(0, Config.AutoEnch.Getters[i])) {
					if (getTickCount() - tick >= failTimer * 1000) {
						showConsole();
						print("ÿc1AutoEnch timeout fail.");
						quit();
					}

					delay(500);
				}
			}

			if (this.giveENCH(Config.AutoEnch.Getters)) {
				break MainLoop;
			}

			break;
		case 1: // Get BO
			if (me.getState(16)) {
				delay(1000);

				break MainLoop;
			}

			if (getTickCount() - tick >= failTimer * 1000) {
				showConsole();
				print("ÿc1AutoEnch timeout fail.");
				quit();
			}

			break;
		}

		delay(500);
	}

	Pather.useWaypoint(1);

	if (Config.AutoEnch.Mode === 0 && Config.AutoEnch.Wait) {
		for (i = 0; i < Config.AutoEnch.Getters.length; i += 1) {
			while (Misc.inMyParty(Config.AutoEnch.Getters[i])) {
				delay(500);
			}
		}
	}

	return true;
}