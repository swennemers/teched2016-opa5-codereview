sap.ui.define([
		'sap/ui/test/Opa5'
	],
	function(Opa5) {
		"use strict";

		return Opa5.extend("sap.ui.teched.appUnderTest.test.integration.pages.Common", {

			iStartMyApp: function(oOptions) {
				oOptions = oOptions || {};
				oOptions.componentConfig = {
					name: "sap.ui.teched.appUnderTest"
				};
				this.iStartMyUIComponent(oOptions);
			}
		});
	}
);