sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.objectDetail.DetailTweets", {
        onInit: function () {
            this.attachRouteMatched("dynamic_DetailTweets", this.onRouteMatched);
        },

        onRouteMatched: function (oEvent) {
			this.tweet = oEvent.getParameter("arguments").id;

			this.getView().bindElement({
				path: "/Tweets('" + this.tweet + "')",
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