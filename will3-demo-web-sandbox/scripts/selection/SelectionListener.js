let SelectionListener = {
	timeout: 50,
	repository: [],
	contextMenuActive: false,

	activeSurface: undefined,

	add(selection) {
		this.repository.push(selection);
		this.attachCanvasContextMenu(selection);
	},

	remove(selection) {
		this.repository.remove(selection);
	},

	attachCanvasContextMenu(selection) {
		if (!selection.canvasSelector) return;

		$.contextMenu({
			selector: `.${selection.canvasSelector}`,
			build: ($trigger, e) => {
				let pos = {x: e.offsetX, y: e.offsetY};

				let activeSurface = this.activeSurface;
				let zIndex;

				if (activeSurface)
					zIndex = activeSurface.style.zIndex;

				return {
					hideOnSecondTrigger: true,
					callback: (key, options) => selection[key](pos),
					events: {
						show() {
							if (activeSurface)
								activeSurface.style.zIndex = "";
						},
						hide() {
							if (activeSurface)
								activeSurface.style.zIndex = zIndex;
						}
					},
					items: {
						paste: {name: "Paste", icon: "paste", disabled: !selection.clipboard},
						sep: "---------",
						import: {
							name: "Import",
							callback: () => {
								let input = selection.frame.querySelector(selection.importSelector);

								input.onchange = async (e) => {
									let data = await selection.read(e.target);
									selection.import(pos, new Uint8Array(data));
								}

								input.click();
							}
						}
					}
				};
			}
		});
	},

	close(e) {
		setTimeout(() => {
			if (this.contextMenuActive) return;

			this.repository.forEach(selection => {
				if (selection.active && !selection.frame.contains(e.target))
					selection.close();
			});
		}, this.timeout);
	}
};

document.addEventListener("pointerdown", SelectionListener.close.bind(SelectionListener));
