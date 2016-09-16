sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/teched/appUnderTest/model/models",
	"sap/ui/teched/appUnderTest/controller/ListSelector",
	"sap/ui/teched/appUnderTest/controller/ErrorHandler",
	"sap/ui/teched/appUnderTest/localService/mockserver",
	"sap/ui/model/odata/v2/ODataModel"
], function(
	UIComponent,
	Device,
	models,
	ListSelector,
	ErrorHandler,
	mockserver,
	ODataModel) {

	"use strict";

	return UIComponent.extend("sap.ui.teched.appUnderTest.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the FLP and device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function() {

			// the model instantiation is triggered in the Component.init method
			// so that we can start up our mockserver
			
			// if the model is defined in the app-descriptor it will be created
			// automatically before the Component.init method
			
			// the mockserver is not started in the index.html file
			// because the launchpad only instanciates this Component.js file

			// LANGUAGE SETTINGS
			// set the language to EN, so that there is no mix between EN/DE 
			// when displaying currencies and dates until everything is translated
			var oConfig = sap.ui.getCore().getConfiguration();
			oConfig.setLanguage("EN");

			// app specific setup
			this._startMockServer();
			this._assignMainService();
			this._createODataModel();

			this.oListSelector = new ListSelector();
			this._oErrorHandler = new ErrorHandler(this);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// set the FLP model
			this.setModel(models.createFLPModel(), "FLP");

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		/**
		 * Create the ODataModel for the app
		 * @private
		 */
		_createODataModel: function () {

			if (this._oMainService.uri) {
				
				var oModel = new ODataModel(this._oMainService.uri, {
					"settings": {
						"metadataUrlParams": {
							"sap-documentation": "heading"
						}
					}
				});
				oModel.setDefaultBindingMode("TwoWay");
				this.setModel(oModel);
			}
		},
		
		/**
		 * Read the mainService configuration from the app descriptor
		 * @private
		 */
		_assignMainService: function () {
			
			var oAppEntry = this.getMetadata().getManifestEntry("sap.app");
			
			if (oAppEntry.dataSources.mainService) {
				this._oMainService = oAppEntry.dataSources.mainService;
			} else {
				this._oMainService = undefined;
			}
		},
		
		/**
		 * Start the MockServer
		 * @private
		 */
		_startMockServer: function () {

			mockserver.init(this._oMainService);
		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ListSelector and ErrorHandler are destroyed.
		 * @public
		 * @override
		 */
		destroy: function() {
			this.oListSelector.destroy();
			this._oErrorHandler.destroy();
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});

});