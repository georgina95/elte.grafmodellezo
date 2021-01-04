sap.ui.define([
    "eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.ProjectDetails", {

        onInit: function () {
            this.attachRouteMatched("dynamic_ProjectDetails", this.onRouteMatched);

            
        },

        onRouteMatched: function(oEvent) {
            this.setLayout("OneColumn");
            this.setShowNavButton(true);
            
        },

        onAfterRenderingHTML: function(oEvent) {

        }




    });

});