sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.Main", {

		onInit: function () {
			
        },
        
        onPress: function(oEvent) {
            this.navTo("Second", {}, false);
        }
	});

});