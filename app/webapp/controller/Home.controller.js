sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.Home", {

		onInit: function () {
			
        },
        
        onPressTile: function(oEvent) {
			var oSource = oEvent.getSource();
			var sTarget = oSource.data("targetRoute");
			
			this.navTo(sTarget, {}, false);
		}
	});

});