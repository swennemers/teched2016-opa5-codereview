sap.ui.define([
	"sap/ui/test/opaQunit"
], function(opaTest) {
	"use strict";

	QUnit.module("List");

	opaTest("Should show 3 orders initially", function(Given, When, Then) {
		Given.iStartMyApp();

		Then.onTheMasterView.theListShouldHaveTheGivenNumberOfOrders(3);
	});

});