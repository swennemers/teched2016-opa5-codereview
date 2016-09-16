sap.ui.define([], function() {
	"use strict";

	return {

		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue - value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		currencyValue: function(sValue) {
			if (!sValue) {
				return "";
			}

			return parseFloat(sValue).toFixed(2);
		},

		/**
		 * formatter that formats the status to a ValueState 
		 * A = "Open"; B = "In Process"; C = "Shipped"
		 * @param  {string} sStatus - the status string
		 * @return {sap.ui.core.ValueState} the value state
		 */
		formatStatus: function(sStatus) {
			if (!sStatus || sStatus === "") {
				return sap.ui.core.ValueState.None;
			}

			if (sStatus === "A") {
				return sap.ui.core.ValueState.Error;
			} else if (sStatus === "B") {
				return sap.ui.core.ValueState.Warning;
			} else if (sStatus === "C") {
				return sap.ui.core.ValueState.Success;
			}

			return sap.ui.core.ValueState.None;
		},

		/**
		 * formatter that formats the status to a ValueState 
		 * OP = "Open"; IP = "In Process"; SH = "Shipped"; CP="Completed" etc.
		 * @param  {string} sStatus - the status string
		 * @return {sap.ui.core.ValueState} the value state
		 */
		formatNewStatus: function(sStatus) {

			if (!sStatus || sStatus === "") {
				return sap.ui.core.ValueState.None;
			}

			if (sStatus === "OP") {
				return sap.ui.core.ValueState.Error;
			} else if (sStatus === "IP" || sStatus === "NS" || sStatus === "RJ" ||
				sStatus === "PR" || sStatus === "CB" || sStatus === "DB" || sStatus === "PB" || sStatus === "PD") {
				return sap.ui.core.ValueState.Warning;
			} else if (sStatus === "SH" || sStatus === "PS" || sStatus === "CP") {
				return sap.ui.core.ValueState.Success;
			}

			return sap.ui.core.ValueState.None;
		},

		/**
		 * formats the status text from the backend provided character
		 * to a status text 
		 * A = "Open"; B = "In Process"; C = "Shipped"
		 * @param  {string} sStatus - the status string
		 * @return {string} the status string
		 */
		formatStatusText: function(sStatus) {

			if (!sStatus) {
				return "";
			}

			return this.getResourceBundleText("STATUS_" + sStatus);
		},

		/**
		 * formats the status text from the backend provided character
		 * to a status text 
		 * OP = "Open"; IP = "In Process"; SH = "Shipped" ; CP = "Completed" etc. 
		 * @param  {string} sStatus - the status string
		 * @return {string} the status string
		 */
		formatNewStatusText: function(sStatus) {

			if (!sStatus) {
				return "";
			}

			return this.getResourceBundleText("STATUS_" + sStatus);
		},

		/**
		 * formats a string to a boolean ("X", "")
		 * @param  {string} sValue - the boolean string "X" or ""
		 * @return {boolean} the boolean value
		 */
		formatXtoBoolean: function(sValue) {
			if (sValue === "X") {
				return true;
			}
			return false;
		},

		/**
		 * Formats the Purchase Order, PO: 1234567890 or PO: n/a
		 * @param  {string} sPONumber - the Purchase Order Number
		 * @return {string} - the formated Purchase Order Number
		 */
		formatPO : function(sPONumber) {

			var sPOPrefix = this.getResourceBundleText("POPrefix");
			sPONumber = sPONumber || this.getResourceBundleText("POnotAvailable");

			var sText = sPOPrefix + ": " + sPONumber;

			return sText;
		}
	};
});