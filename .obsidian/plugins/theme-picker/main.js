/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class ThemePickerPluginModal extends obsidian.FuzzySuggestModal {
    constructor(app) {
        super(app);
        this.DEFAULT_THEME_KEY = "";
        this.DEFAULT_THEME_TEXT = "None";
        this.previewing = false;
        //@ts-ignore
        this.bgEl.setAttribute("style", "background-color: transparent");
        this.modalEl.classList.add("theme-picker-modal");
        //@ts-ignore
        const originalArrowUpEvent = this.scope.keys.find((key) => key.key === "ArrowUp");
        //@ts-ignore
        const originalArrowDownEvent = this.scope.keys.find((key) => key.key === "ArrowDown");
        const newFunction = function (originalFunc, modal) {
            function newCallback(e) {
                originalFunc(e, null);
                //@ts-ignore
                modal.setTheme(modal.chooser.values[modal.chooser.selectedItem].item);
                modal.previewing = true;
            }
            return newCallback;
        };
        originalArrowUpEvent.func = newFunction(originalArrowUpEvent.func, this);
        originalArrowDownEvent.func = newFunction(originalArrowDownEvent.func, this);
    }
    onOpen() {
        super.onOpen();
        //@ts-ignore
        this.initialTheme = this.getItems().find(theme => theme === app.customCss.theme);
        //@ts-ignore
        this.chooser.setSelectedItem(this.getItems().findIndex(theme => theme === app.customCss.theme));
        //@ts-ignore
        this.chooser.suggestions[this.chooser.selectedItem].scrollIntoViewIfNeeded();
    }
    onClose() {
        super.onClose();
        if (this.previewing) {
            this.setTheme(this.initialTheme);
        }
    }
    getItems() {
        //@ts-ignore
        return [this.DEFAULT_THEME_KEY, ...Object.keys(this.app.customCss.themes), ...this.app.customCss.oldThemes];
    }
    getItemText(item) {
        if (item === this.DEFAULT_THEME_KEY) {
            return this.DEFAULT_THEME_TEXT;
        }
        else {
            return item;
        }
    }
    onChooseItem(item, evt) {
        this.previewing = false;
        this.setTheme(item);
    }
    setTheme(themeName) {
        //@ts-ignore
        this.app.customCss.setTheme(themeName);
    }
}

class ThemePicker extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.DARK_MODE_THEME_KEY = "obsidian";
        this.LIGHT_MODE_THEME_KEY = "moonstone";
        this.moonIconSvg = `<path fill="none" d="M0 0h24v24H0z"/><path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/>`;
        this.sunIconSvg = `<path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>`;
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.colorSchemeIcon = this.initializeColorSchemeIcon();
            const themePickerStatusBarItem = this.addStatusBarItem();
            const changeThemeButton = themePickerStatusBarItem.createDiv({
                cls: "status-bar-item mod-clickable",
                text: "Change Theme"
            });
            changeThemeButton.addEventListener("click", () => {
                new ThemePickerPluginModal(this.app).open();
            });
            const changeColorSchemeButton = themePickerStatusBarItem.createDiv({
                cls: "status-bar-item mod-clickable theme-picker-color-scheme-icon",
            });
            changeColorSchemeButton.addEventListener("click", () => this.toggleColorScheme());
            changeColorSchemeButton.appendChild(this.colorSchemeIcon);
            this.addCommand({
                id: 'open-theme-picker',
                name: 'Open Theme Picker',
                callback: () => new ThemePickerPluginModal(this.app).open()
            });
            this.registerEvent(this.app.workspace.on("css-change", () => {
                this.colorSchemeIcon.innerHTML = this.getColorSchemeIcon();
            }));
        });
    }
    initializeColorSchemeIcon() {
        const colorSchemeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        colorSchemeIcon.setAttribute("viewBox", "0 0 22 22");
        colorSchemeIcon.setAttribute("width", "14");
        colorSchemeIcon.setAttribute("height", "14");
        colorSchemeIcon.innerHTML = this.getColorSchemeIcon();
        return colorSchemeIcon;
    }
    getColorSchemeIcon() {
        return this.isDarkMode() ? this.sunIconSvg : this.moonIconSvg;
    }
    toggleColorScheme() {
        let colorSchemeKey;
        if (this.isDarkMode()) {
            colorSchemeKey = this.LIGHT_MODE_THEME_KEY;
            this.colorSchemeIcon.innerHTML = this.moonIconSvg;
        }
        else {
            colorSchemeKey = this.DARK_MODE_THEME_KEY;
            this.colorSchemeIcon.innerHTML = this.sunIconSvg;
        }
        //@ts-ignore
        this.app.changeTheme(colorSchemeKey);
    }
    isDarkMode() {
        //@ts-ignore
        return this.app.vault.getConfig("theme") === this.DARK_MODE_THEME_KEY;
    }
}

module.exports = ThemePicker;


/* nosourcemap */