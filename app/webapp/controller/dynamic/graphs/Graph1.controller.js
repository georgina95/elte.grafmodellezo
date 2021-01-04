/* global moment:true */
sap.ui.define([
    "eltegrafmodellezo/app/controller/BaseController",
    "eltegrafmodellezo/app/lib/runtime",
    "eltegrafmodellezo/app/lib/graph_creator"
], function (BaseController, runtimejs, graph) {
    "use strict";

    return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.graphs.Graph1", {

        /** LIFECYCLE EVENT HANDLERS */
        onInit: function () {
            this.attachRouteMatched("dynamic_Graph1", this.onRouteMatched);

            this.graph_define = define;
        },

        onRouteMatched: function (oEvent) {
            this.setLayout("OneColumn");
            this.initGraphDataHolder();

            this.setShowNavButton(true);

            this.getGraph1Data();
        },

        initGraphDataHolder: function () {
            this.graphData = {
                nodes: [],
                links: []
            };
        },

        getGraph1Data: function () {
            // Get the nodes
            this.ajaxGETCall("graf1_nodes", this.fSuccessReadNodes);
        },

        ajaxGETCall: function (sURL, fSuccess) {
            var sBaseURL = "https://110a7190trial-dev-eltegrafmodellezo-app.cfapps.eu10.hana.ondemand.com/catalog/";

            jQuery.ajax({
                type: "GET",
                url: sBaseURL + sURL,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: jQuery.proxy(fSuccess, this),
                failure: function (response) {
                    alert(response.d);
                }
            });
        },

        fSuccessReadNodes: function (oResponse) {
            this.graphData.nodes = this.graphData.nodes.concat(oResponse.value);
            if (oResponse.value.length === 1000) {
                var sNextUrl = oResponse["@odata.nextLink"];
                this.ajaxGETCall(sNextUrl, this.fSuccessReadNodes);
            } else {
                this.ajaxGETCall("graf1_edges", this.fSuccessReadEdges);
            }
        },

        fSuccessReadEdges: function (oResponse) {
            this.graphData.links = this.graphData.links.concat(oResponse.value);

            if (oResponse.value.length === 1000) {
                var sNextUrl = oResponse["@odata.nextLink"];
                this.ajaxGETCall(sNextUrl, this.fSuccessReadEdges);
            } else {
                this.onSuccessDataRead();
            }
        },

        onSuccessDataRead: function() {
                this.runtime = new xt(this);
                this.graphcontainer = document.getElementById("graphcontainer");
                this.graphcontainer.innerHTML = "";
                const main = this.runtime.module(this.graph_define, le.into(this.graphcontainer));
        }

    });

});