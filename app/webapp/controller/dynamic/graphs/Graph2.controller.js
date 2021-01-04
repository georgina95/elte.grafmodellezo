/* global moment:true */
sap.ui.define([
    "eltegrafmodellezo/app/controller/BaseController",
	"eltegrafmodellezo/app/lib/runtime",
	"eltegrafmodellezo/app/lib/graph_creator2"
], function (BaseController, runtimejs, graph) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.graphs.Graph2", {

        graphData: {
            nodes: [ ],
            links: [ ]
        },

    /** LIFECYCLE EVENT HANDLERS */
		onInit: function () {
			this.attachRouteMatched("dynamic_Graph2", this.onRouteMatched);

            this.graph_define = define;
		},

		onRouteMatched: function (oEvent) {
            this.setLayout("OneColumn");
            
            this.setShowNavButton(true);

            var that = this;
            
            var fSuccess = function () {
                that.runtime = new xt(that);
                that.graphcontainer = document.getElementById("graphcontainer2");
                that.graphcontainer.innerHTML = "";
                const main = that.runtime.module(that.graph_define, le.into(that.graphcontainer));
            };

            this.getGraph2Data(fSuccess);
		},

		onAfterRendering: function () {
            
        },
        
        getGraph2Data: function(fSuccess) {
            var sBaseURL = "https://110a7190trial-dev-eltegrafmodellezo-app.cfapps.eu10.hana.ondemand.com";

            // Get the edges
            var fSuccessReadNodes = function(oResponse) {
                this.graphData.nodes = oResponse.value;
                fSuccess();
            };


            // Get the nodes
            this.ajaxGETCall(sBaseURL + "/catalog/graf2_nodes", fSuccessReadNodes);
            
        },

        ajaxGETCall: function(sURL, fSuccess) {
            jQuery.ajax({
                type: "GET",
                url: sURL,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: jQuery.proxy(fSuccess, this),
                failure: function (response) {
                    alert(response.d);
                }
            });
        }

	});

});