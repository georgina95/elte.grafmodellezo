sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.objectDetail.DetailHashtags", {
        onInit: function () {
            this.attachRouteMatched("dynamic_DetailHashtags", this.onRouteMatched);
        },


        onRouteMatched: function (oEvent) {
            this.text = oEvent.getParameter("arguments").text;
            this.tweet_id = oEvent.getParameter("arguments").tweet_id;

			this.getView().bindElement({
                path: "/Hashtags(text='" + this.text + "',tweet_id='" + this.tweet_id + "')",
                model: "CatalogModel",
                events: {
                    dataReceived: jQuery.proxy(this.onDataReceived, this)
                }
            });
            
            this.setLayout("TwoColumnsMidExpanded");

            this.fillRelatableTable(this.text);
        },
        
        onDataReceived: function(oEvent) {
        },

        fillRelatableTable: function(sText) {
            
            var oTable = this.getView().byId("relatableItems");
            oTable.bindAggregation("items", {
                path: "CatalogModel>/Hashtags",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: '{CatalogModel>tweet/created_at}'}),
                        new sap.m.Text({ text: '{CatalogModel>tweet/sensitive}'}),
                        new sap.m.Text({ text: '{CatalogModel>tweet/user/name}'}),
                        new sap.m.Text({ text: '{CatalogModel>tweet/text}'})
                    ]
                }),
                templateShareable: false,
                filters: [ new sap.ui.model.Filter({ path: "text", operator: 'EQ', value1: encodeURI(sText) }) ],
                events: {
                    dataReceived: jQuery.proxy(this.onFinishTableFilling, this)
                }
            });
        },

        onFinishTableFilling: function(oEvent) {
            
        }
    
	});

});