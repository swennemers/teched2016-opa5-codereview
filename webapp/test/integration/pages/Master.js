sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/AggregationLengthEquals"
], function(Opa5, Press, EnterText, AggregationLengthEquals) {
	"use strict";

	Opa5.createPageObjects({
		onTheMasterView: {
			actions: {
				iTriggerTheSearch: function() {
					return this.waitFor({
						id: "searchField",
						viewName: "Master",
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id searchField"
					});
				},
				iEnterSeachTerm: function(sTerm) {
					return this.waitFor({
						id: "searchField",
						viewName: "Master",
						actions: new EnterText({
							text: sTerm
						}),
						errorMessage: "Was not able to find the control with the id searchField"
					});
				},
				iPressList_list: function() {
					return this.waitFor({
						id: "list",
						viewName: "Master",
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id list"
					});
				}
			},
			assertions: {
				theListShouldHaveTheGivenNumberOfOrders: function(iNumberOfOrders) {
					return this.waitFor({
						id: "list",
						viewName: "Master",
						matchers: new AggregationLengthEquals({
							name: "items",
							length: iNumberOfOrders
						}),
						success: function() {
							Opa5.assert.ok(true, "The list has " + iNumberOfOrders + " orders.");
						},
						errorMessage: "List does not have all orders."
					});
				}
			}
		}
	});
});