sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

	return UIComponent.extend("eltegrafmodellezo.app.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
            this.getRouter().initialize();
            
            // create a model to handle the layout settings
            // also create js dates
            var oModel = new sap.ui.model.json.JSONModel();
                oModel.attachRequestCompleted(this._initDateOptions);
				oModel.loadData("projectSettings.json");
            this.setModel(oModel, "Settings");

            // init busy indicatior
            this._initBusyIndicator();
			
        },

        _initDateOptions: function(oEvent) {
            var oModel = oEvent.getSource();
            var oOldDate = new Date('2012-04-23T18:25:43.511Z');
            var oNowDate = new Date();

            oModel.setProperty("/ManageData/filters/tweets/created_at/key1", oOldDate);
            oModel.setProperty("/ManageData/filters/users/created_at/key1", oOldDate);
            oModel.setProperty("/ManageData/filters/hashtags/created_at/key1", oOldDate);
            oModel.setProperty("/ManageData/filters/mentions/created_at/key1", oOldDate);

            oModel.setProperty("/ManageData/filters/tweets/created_at/key2", oNowDate);
            oModel.setProperty("/ManageData/filters/users/created_at/key2", oNowDate);
            oModel.setProperty("/ManageData/filters/hashtags/created_at/key2", oNowDate);
            oModel.setProperty("/ManageData/filters/mentions/created_at/key2", oNowDate);
        },
        
        /** We will count the running jobs and handle the busy indicator here
		 * The visible part will be rendered in the FlexibleColumnLayout
		 **/
		_initBusyIndicator: function() {
			this._iBusyOperations = 0;
		},
		
		
		/** operation started
		 * Handle the busy indicator
		 **/
		_onOperationStarted: function () {
			this._iBusyOperations += 1;
			var bBusy = (this._iBusyOperations > 0) ? true : false;

			this.oContainer.setBusy(bBusy);
		},

		/** operation ended
		 * Handle the busy indicator
		 **/
		_onOperationEnded: function () {
			this._iBusyOperations -= 1;
			var bBusy = (this._iBusyOperations > 0) ? true : false;

			this.oContainer.setBusy(bBusy);
        }
        
	});
});