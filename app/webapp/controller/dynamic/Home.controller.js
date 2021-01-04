sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.Home", {

		onInit: function () {
			this.attachRouteMatched("DynamicHome", this.onRouteMatched);
        },

        onRouteMatched: function(oEvent) {
            this.setLayout("OneColumn");
            this.setShowNavButton(false);

            this.isLogin();
        },
        
        onPressTile: function(oEvent) {
			
			var oSource = oEvent.getSource();
			var sTarget = oSource.data("targetRoute");
			
			this.navTo("dynamic_" + sTarget, {}, false);
        },

        onPressLogin: function(oEvent) {
            // the cookie should expire in 5 mins
            var oExpiryDate = new Date(new Date().getTime() + 5*60000);
            document.cookie = "isLogin=true" + ";expires=" + oExpiryDate.toUTCString();
        },

        isLogin: function() {
            var sCookie = document.cookie;
            if(sCookie) {
                var aCookieValues = sCookie.split(';');
                var sCookieValue = aCookieValues.find(o => (/isLogin=/).test(o));
                if(sCookieValue) {
                    sCookieValue = sCookieValue.split('=')[1];
                    var bCookie = sCookieValue === true || sCookieValue === 'true';
                    var oModel = this.getModel("Settings");
                        oModel.setProperty("/isLogin", bCookie);
                }
                else {
                    var oModel = this.getModel("Settings");
                        oModel.setProperty("/isLogin", false);
                }
            } 
            else {
                var oModel = this.getModel("Settings");
                    oModel.setProperty("/isLogin", false);
            }
        },
        

        /** FORMATTERS **/

        negate: function (bValue) {
            var bIsTrue =  bValue === true || bValue === 'true';
            return !bIsTrue;
        }
	});

});