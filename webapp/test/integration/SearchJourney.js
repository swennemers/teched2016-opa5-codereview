sap.ui.define([
	"sap/ui/test/opaQunit"
], function(opaTest) {
	"use strict";

	QUnit.module("List");

	opaTest("Should show 3 orders initially", function(Given, When, Then) {
		Given.iStartMyApp();

		Then.onTheMasterView.theListShouldHaveTheGivenNumberOfOrders(3);
		Then.onTheDetailView.iSeeTheTitle("Sales Order 5001656");
	});

	opaTest("Can find a single order", function(Given, When, Then) {
		When.onTheMasterView.iEnterSeachTerm("58")
			.and.iTriggerTheSearch();

		Then.onTheMasterView.theListShouldHaveTheGivenNumberOfOrders(1);
	});

	opaTest("Can navigate to an single order", function(Given, When, Then) {
		When.onTheMasterView.iPressOnTheOrderWithTheID("5001658");

		Then.onTheDetailView.iSeeTheTitle("Sales Order 5001658");
	});
});