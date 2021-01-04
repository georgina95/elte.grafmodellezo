sap.ui.define([
    "eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("eltegrafmodellezo.app.controller.Main", {

        onInit: function () {

        },

        onNavBack: function (oEvent) {
            var oHistory = window.history;
            var iLength = oHistory.length;
            if (iLength > 1) {
                oHistory.go(-1);
            }
        },

        onPressElte: function () {
            var oWindow = document.defaultView;
            var win = oWindow.open("https://www.inf.elte.hu/", "_blank");
        }
    });

});