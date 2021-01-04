sap.ui.define([
	"eltegrafmodellezo/app/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.References", {

		onInit: function () {
			this.attachRouteMatched("dynamic_References", this.onRouteMatched);
        },
        
        onRouteMatched: function(oEvent) {
            this.setLayout("OneColumn");
            this.setShowNavButton(true);
            
        },

        onCollapseAll: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},

		onCollapseSelection: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapse(oTreeTable.getSelectedIndices());
		},

		onExpandFirstLevel: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expandToLevel(1);
		},

		onExpandSelection: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expand(oTreeTable.getSelectedIndices());
		},



/** FORMATTERS **/
        isNotNull: function(oObj) {
            return (oObj) ? true : false;
        }
    
	});

});