sap.ui.define([
	"elte_grafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("elte_grafmodellezo.app.controller.Main", {

		onInit: function () {
			
        },
        
        onPress: function(oEvent) {
            this.navTo("Second", {}, false);
        },

        navTo: function(sRoute, oParams, bReplace) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(sRoute, oParams, bReplace);
		}
	});

});