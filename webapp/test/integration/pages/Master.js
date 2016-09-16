sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/BindingPath"
], function(Opa5, Press, EnterText, AggregationLengthEquals, BindingPath) {
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
				iPressOnTheOrderWithTheID: function(sId) {
					return this.waitFor({
						controlType: "sap.m.ObjectListItem",
						viewName: "Master",
						matchers: new BindingPath({
							path: "/SalesOrders('" + sId + "')"
						}),
						actions: new Press(),
						errorMessage: "No order with the id " + sId + " was found."
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