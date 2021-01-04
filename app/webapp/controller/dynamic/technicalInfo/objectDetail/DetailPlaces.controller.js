sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.objectDetail.DetailPlaces", {

        onInit: function () {
            this.attachRouteMatched("dynamic_DetailPlaces", this.onRouteMatched);
        },

        onRouteMatched: function (oEvent) {
			this.place = oEvent.getParameter("arguments").id;

			this.getView().bindElement({
				path: "/Places('" + this.place + "')",
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