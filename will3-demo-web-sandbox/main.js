addEventListener("DOMContentLoaded", async (event) => {
	app.init();

	if (!localStorage.getItem("sample")) return;

	layout.init();

	$(".app").css("visibility", "hidden");
	await app.initInkController();
	$(".app").css("visibility", "");
});
