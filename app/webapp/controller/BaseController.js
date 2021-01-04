sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/ValueState",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/Text"
], function (Controller, ValueState, Dialog, DialogType, Button, ButtonType, Text) {
    "use strict";

    return Controller.extend("eltegrafmodellezo.app.controller.BaseController", {

        setLayout: function (sLayout) {
            var oComponent = this.getOwnerComponent();
            var oModel = oComponent.getModel("Settings");

            oModel.setProperty("/layout", sLayout);
        },

        setShowNavButton: function(bShow) {
            var oModel = this.getModel("Settings");
            oModel.setProperty("/showNavButton", bShow);
        },

        attachRouteMatched: function (sRoute, fCallback) {
            var oRouter = this.getRouter();
            var oRoute = oRouter.getRoute(sRoute);

            oRoute.attachPatternMatched(fCallback, this);
        },

        navTo: function (sRoute, oParams, bReplace) {
            var oRouter = this.getRouter();
            oRouter.navTo(sRoute, oParams, bReplace);
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        getModel: function (sName) {
            var oModel = this.getView().getModel(sName);
            if (!oModel) {
                var oComponent = this.getOwnerComponent();
                oModel = oComponent.getModel(sName);
            }

            return oModel;
        },

        onCloseDetailPage: function () {
            this.navTo("dynamic_ManageData", {}, false);
        },

        onNavBack: function(oEvent) {
			var oHistory = window.history;
			var iLength = oHistory.length;
			if(iLength > 1) {
				oHistory.go(-1);
			}
        },
        
        onOperationStarted: function() {
            var oComponent = this.getOwnerComponent();
            oComponent._onOperationStarted();
        },

        onOperationEnded: function() {
            var oComponent = this.getOwnerComponent();
            oComponent._onOperationEnded();
        },

        onError: function(oError) {
            var sErrorType = oError.error.code;
            var sErrorMessage = (sErrorType === "403") ? "errorForbidden" : (sErrorType === "401") ? "errorLoggedOut" : "errorUnknown";
            var sTranslatedMessage = this.getTranslation(sErrorMessage);

            this.openErrorDialog(sTranslatedMessage);
        },

        openErrorDialog: function(sMessage) {
            if (!this.oErrorMessageDialog) {
				this.oErrorMessageDialog = new Dialog({
					type: DialogType.Message,
					title: "Error",
					state: ValueState.Error,
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "OK",
						press: function () {
							this.oErrorMessageDialog.close();
						}.bind(this)
					})
				});
			}
			
			this.oErrorMessageDialog.destroyContent();
			this.oErrorMessageDialog.addContent(new Text({ text: sMessage }));
			this.oErrorMessageDialog.open();
        },


        /**	FORMATTERS	**/
        getTranslation: function (sText) {
            var oModel = this.getView().getModel("i18n");
            var sTranslation = oModel.getProperty(sText);

            return (sTranslation) ? sTranslation : sText;
        },

        getShortString: function (sString) {
            if (sString) {
                var sShort = sString.slice(0, 80);
                sShort += (sString.length > 80) ? "..." : "";
                return sShort;
            } else {
                return "";
            }
        }
    });
});
