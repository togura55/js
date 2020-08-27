let layout = {
	init: function() {
		dropDown.init();

		$("nav .Tool").addClass("Button");

		$("nav .Tool").on("click", function() {
			if (this.classList.contains("Selected")) return;

			$("nav .Tool.Selected").removeClass("Selected");
			$(this).addClass("Selected");

			WILL.setTool(this.id);
		});

		$("nav .ColorBox input[type=color]").on("change", function() {
			layout.selectColor(this);
		});
	},

	selectTool(id) {
		$(`nav .Tool#${id}`).trigger("click")
	},

	selectColor: function(input) {
		let color = this.extractColor(input);

		$(".ColorBox .Color").css("background-color", input.value);
		WILL.setColor(color);
	},

	extractColor(node, opacity) {
		let rgba = [];

		if (node.tagName == "INPUT") {
			let value = node.value.substring(1);

			rgba.push(parseInt(value.substring(0, 2), 16));
			rgba.push(parseInt(value.substring(2, 4), 16));
			rgba.push(parseInt(value.substring(4), 16));
			rgba.push(opacity || 1);
		}
		else {
			rgba = eval(node.getStyle("background-color").replace(/rgba?/, "new Array"));
			if (!rgba[3]) rgba[3] = node.getMathStyle("opacity");
		}

		return Color.from(rgba);
	},

	showTab(node) {
		let tabContent = node.parentNode.nextElementSibling;

		tabContent.className = node.value;
		tabContent.style.height = (document.querySelector(".Dialog").offsetHeight - node.parentNode.offsetHeight) +  "px";
	},

	buildDialogContent(model) {
		return `
			<div class="tabs">
				<div class="tabs-line">
					<input type="radio" id="KnowledgeGraph" value="knowledge-graph" name="TabsLine" onclick="layout.showTab(this)">
					<label for="KnowledgeGraph">Knowledge Graph</label>

					<input type="radio" id="TextSegmentationView" value="text-segmentation-view" name="TabsLine" onclick="layout.showTab(this)">
					<label for="TextSegmentationView">Text Segmentation View</label>

					<input type="radio" id="SemanticsView" value="semantics-view" name="TabsLine" onclick="layout.showTab(this)">
					<label for="SemanticsView">Semantics View</label>
				</div>
				<div>
					<div class="tab-content knowledge-graph">
						${this.buildKnowledgeGraphContent(model.knowledgeGraph)}
					</div>
					<div class="tab-content text-segmentation-view">
						${this.buildViewContent(model.views["will://views/3.0/HWR"])}
					</div>
					<div class="tab-content semantics-view">
						${this.buildViewContent(model.views["will://views/3.0/NER"])}
					</div>
				</div>
			</div>
		`
	},

	buildKnowledgeGraphContent(knowledgeGraph) {
		let buildRow = statement => `
			<tr>
				<td>${statement.subject}</td>
				<td>${statement.predicate}</td>
				<td>${statement.object}</td>
			</tr>
		`;

		return `
			<table>
				<thead>
					<tr>
						<th>subject</th>
						<th>predicate</th>
						<th>object</th>
					</tr>
				</thead>
				<tbody>
					${knowledgeGraph.statements.map(statement => buildRow(statement)).join("")}
				</tbody>
			</table>
		`;
	},

	buildViewContent(view) {
		return `
			<div class="View">
				${view.tree.children.map(child => this.buildChildContent(child)).join("")}
			</div>
		`
	},

	buildChildContent(node) {
		if (node.children) {
			let bounds = node.bounds ? node.bounds.ceil() : null;
			let rect = bounds ? `rect(${bounds.x}, ${bounds.y}, ${bounds.width}, ${bounds.height})` : "";

			return `
				<div class="Group">
					<table>
					<tr>
						<td>Group (${node.id})</td>
						<td>${rect}</td>
					</tr>
					</table>
					<div class="Parent">
						${node.children.map(child => this.buildChildContent(child)).join("")}
					</div>
				</div>
			`;
		}
		else {
			return `
				<div>Stroke (${node.id})</div>
			`
		}
	}
};
