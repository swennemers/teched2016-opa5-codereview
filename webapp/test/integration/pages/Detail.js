sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/Properties"
], function(Opa5, EnterText, Properties) {
	"use strict";

	Opa5.createPageObjects({
		onTheDetailView: {
			assertions: {
				iSeeTheTitle: function(sTitle) {
					return this.waitFor({
						id: "objectHeader",
						viewName: "Detail",
						matchers: new Properties({
							title: sTitle
						}),
						success: function() {
							Opa5.assert.ok(true, "I can see the title " + sTitle);
						},
						errorMessage: "Was not able to find the control with the id objectHeader"
					});
				}
			}
		}
	});
});