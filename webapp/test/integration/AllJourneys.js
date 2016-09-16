jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.qunit.qunit-coverage");

QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"sap/ui/teched/appUnderTest/test/integration/pages/Common",
	"sap/ui/teched/appUnderTest/test/integration/pages/Master",
	"sap/ui/teched/appUnderTest/test/integration/pages/Detail"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "sap.ui.teched.appUnderTest.view."
	});

	sap.ui.require([
		"sap/ui/teched/appUnderTest/test/integration/SearchJourney"
	], function() {
		QUnit.start();
	});
});