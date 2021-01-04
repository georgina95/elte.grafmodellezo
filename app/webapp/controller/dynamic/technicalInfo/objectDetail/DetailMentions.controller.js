sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.objectDetail.DetailMentions", {
        onInit: function () {
            this.attachRouteMatched("dynamic_DetailMentions", this.onRouteMatched);
        },

        onRouteMatched: function (oEvent) {
            this.mentioned_user_id = oEvent.getParameter("arguments").mentioned_user_id;
            this.tweet_id = oEvent.getParameter("arguments").tweet_id;

			this.getView().bindElement({
                path: "/Mentions(mentioned_user_id='" + this.mentioned_user_id + "'" +
                                        ",tweet_id='" + this.tweet_id + "')",
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