sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.objectDetail.DetailUsers", {
        onInit: function () {
            this.attachRouteMatched("dynamic_DetailUsers", this.onRouteMatched);
        },

        onRouteMatched: function (oEvent) {
			this.user = oEvent.getParameter("arguments").id;

			this.getView().bindElement({
				path: "/Users('" + this.user + "')",
                model: "CatalogModel",
                events: {
                    dataReceived: jQuery.proxy(this.onDataReceived, this)
                }
            });
            
            this.setLayout("TwoColumnsMidExpanded");
        },
        
        onDataReceived: function(oEvent) {
            
        }
    
	});

});