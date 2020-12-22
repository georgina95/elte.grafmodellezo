sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("eltegrafmodellezo.app.controller.BaseController", {
        
        navTo: function(sRoute, oParams, bReplace) {
			var oRouter = this.getRouter();
			oRouter.navTo(sRoute, oParams, bReplace);
		},
		
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
	});
});
