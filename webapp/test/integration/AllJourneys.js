jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.qunit.qunit-coverage");

QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5"
], function(Opa5) {

	"use strict";
	Opa5.extendConfig({
		viewNamespace: "sap.ui.teched.appUnderTest.view."
	});

	sap.ui.require([], function() {
		QUnit.start();
	});
});