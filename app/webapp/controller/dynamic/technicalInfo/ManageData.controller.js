sap.ui.define([
    "eltegrafmodellezo/app/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, Fragment, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("eltegrafmodellezo.app.controller.dynamic.technicalInfo.ManageData", {

        onInit: function () {
            this.loadListFragment("tweets");
			this.attachRouteMatched("dynamic_ManageData", this.onRouteMatched);
        },

        onRouteMatched: function(oEvent) {
            this.setLayout("OneColumn");
            this.setShowNavButton(true);
            
        },

        /** CUSTOM EVENT HANDLERS */
        onObjectPress: function (oEvent) {
            
            var sObjectType = this.getModel("Settings").getProperty("/ManageData/currentType");
            var sPath = "Detail" + sObjectType[0].toUpperCase() + sObjectType.slice(1, sObjectType.length);

            var oPressedItem = oEvent.getParameter("listItem");
            var oBindingContext = oPressedItem.getBindingContext("CatalogModel");
            var oItem = oBindingContext.getObject();

            if (sObjectType === "tweets" || sObjectType === "users" || sObjectType === "places") {
                this.navTo("dynamic_" + sPath, {
                    id: oItem.id
                }, true);
            }
            else if (sObjectType === "hashtags") {
                this.navTo("dynamic_" + sPath, {
                    tweet_id: oItem.tweet_id,
                    text: encodeURI(oItem.text)
                }, true);
            }
            else if (sObjectType === "mentions") {
                this.navTo("dynamic_" + sPath, {
                    tweet_id: oItem.tweet_id,
                    mentioned_user_id: oItem.mentioned_user_id
                }, true);
            }
        },

        onObjectTypeSelectionChange: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("item");
            var sSelectedKey = oSelectedItem.getProperty("key");

            // Load the selected list into the content of the Dynamic Page
            this.loadListFragment(sSelectedKey);

            this.getModel("Settings").setProperty("/ManageData/currentType", sSelectedKey);
        },

        loadListFragment: function(sSelectedKey) {
            
            var oFragment = this[sSelectedKey + "Fragment"];
            if (!oFragment) {
                Fragment.load({
                    id: sSelectedKey + "Fragment",
                    name: "eltegrafmodellezo.app.fragment.objectLists." + sSelectedKey,
                    controller: this
                }).then(jQuery.proxy(this.onFragmentLoaded, this));
            } else {
                var oPage = this.getView().byId("masterPage");
                oPage.setContent(oFragment);
            }
        },

        onFragmentLoaded: function (oFragment) {
            var sIdentifier = oFragment.getId().split("--")[0];
            this[sIdentifier] = oFragment;

            var oPage = this.getView().byId("masterPage");
            oPage.setContent(oFragment);
            
        },


        //Value Help window building for PLACE_ID
        onValueHelpPlace: function (oEvent) {
            var oSource = oEvent.getSource();
            var sFragmentPath = "eltegrafmodellezo.app.fragment.valueHelp.ValueHelpPlaces";
            var sName = "_dialogPlaces"
            this.onValueHelpDialog(sFragmentPath, sName, oSource);
        },

        //Value Help window building for USER_ID
        onValueHelpUser: function (oEvent) {
            var oSource = oEvent.getSource();
            var sFragmentPath = "eltegrafmodellezo.app.fragment.valueHelp.ValueHelpUsers";
            var sName = "_dialogUsers"
            this.onValueHelpDialog(sFragmentPath, sName, oSource)
        },

        onValueHelpCountry: function (oEvent) {
            var oSource = oEvent.getSource();
            var sFragmentPath = "eltegrafmodellezo.app.fragment.valueHelp.ValueHelpCountries";
            var sName = "_dialogCountries"
            this.onValueHelpDialog(sFragmentPath, sName, oSource)
        },


        onValueHelpDialog: function (sFragmentPath, sName, oSource) {
            if (!this[sName]) {
                this[sName] = sap.ui.xmlfragment(sFragmentPath, this);
                this.getView().addDependent(this[sName]);
            }

            var sSourceId = oSource.getId();
            this[sName]
                .destroyCustomData()
                .addCustomData(new sap.ui.core.CustomData({
                    key: 'boundControlId',
                    value: sSourceId
                }));
            this[sName].open();
        },

        // Search in the value help dialog
        onSearchValueHelpPlaces: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter({
                filters: [
                    new Filter("full_name", FilterOperator.Contains, sValue),
                    new Filter("id", FilterOperator.Contains, sValue)
                ],
                and: false
            });
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },

        onSearchValueHelpUsers: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter({
                filters: [
                    new Filter("name", FilterOperator.Contains, sValue),
                    new Filter("id", FilterOperator.Contains, sValue)
                ],
                and: false
            });
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },

        onSearchValueHelpCountries: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter({
                filters: [
                    new Filter("country", FilterOperator.Contains, sValue),
                    new Filter("country_code", FilterOperator.Contains, sValue)
                ],
                and: false
            });
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },

        onConfirmValueHelpPlaces: function (oEvent) {
            var sKeyField = 'id';
            var sValueField = 'full_name';
            this.onConfirmValueHelp(oEvent, sKeyField, sValueField);
        },

        onConfirmValueHelpUsers: function (oEvent) {
            var sKeyField = 'id';
            var sValueField = 'name';
            this.onConfirmValueHelp(oEvent, sKeyField, sValueField);
        },

        onConfirmValueHelpCountries: function (oEvent) {
            var sKeyField = 'country_code';
            var sValueField = 'country';
            this.onConfirmValueHelp(oEvent, sKeyField, sValueField);
        },

        onConfirmValueHelp: function(oEvent, sKeyName, sValueName) {
            var oDialog = oEvent.getSource();
            var sBoundControlId = oDialog.data("boundControlId");
            var oBoundControl = this.getView().byId(sBoundControlId);

            var oSelectedItem = oEvent.getParameter("selectedItem");
            var oBinding = oSelectedItem.getBindingContext("CatalogModel");
            var oObject = oBinding.getObject();

            // Set the key in the background
            var oKeyBinding = oBoundControl.getBinding("selectedKey");
            var oKeyModel = oKeyBinding.getModel();
            var oKeyPath = oKeyBinding.getPath();
                oKeyModel.setProperty(oKeyPath, oObject[sKeyName]);
                
            // Set the display value
            var oValueBinding = oBoundControl.getBinding("value");
            var oValueModel = oValueBinding.getModel();
            var oValuePath = oValueBinding.getPath();
                oValueModel.setProperty(oValuePath, oObject[sValueName]);
            
        },

        onCancelValueHelp: function (oEvent) {

        },

        onClearInput: function (oEvent) {
            var oButton = oEvent.getSource();
            var sInputFieldId = oButton.getAriaDescribedBy()[0];
            var oInputField = this.getView().byId(sInputFieldId);

            var oKeyBinding = oInputField.getBinding("selectedKey");
            var oKeyModel = oKeyBinding.getModel();
            var oKeyPath = oKeyBinding.getPath();
                oKeyModel.setProperty(oKeyPath, '');
        },


        onFilter: function (oEvent) {
            var sObjectType = this.getView().getModel("Settings").getProperty("/ManageData/currentType");
            var aFilters = this.createFilters(sObjectType);

            var oList = this.getView().byId(sObjectType + "List") || 
                        sap.ui.getCore().byId(sObjectType + "Fragment--" + sObjectType + "List");
            var oItemsBinding = oList.getBinding("items");

            oItemsBinding.filter(aFilters, "Application");
        },

        createFilters: function (sObjectType) {
            var aFilters = [];

            var oModel = this.getModel("Settings");
            var aOptions = oModel.getProperty("/ManageData/filters/" + sObjectType);

            for (var sProperty in aOptions) {
                var oOption = aOptions[sProperty];
                if (oOption.key1) {
                    var oValues = this.getFilterValues(oOption);
                    aFilters.push( new Filter({
                        path: oOption.objectPath,
						operator: oOption.operator,
                        value1:  oValues.value1,
                        value2: oValues.value2
                    }));
                }
            }

            return new Filter({
                filters: aFilters,
                and: true
            });
        },

        getFilterValues: function(oOption) {
            var oRetObj = {
                value1: '',
                value2: ''
            };

            if (oOption.key1 instanceof Date) {
                oRetObj.value1 = this.formatDateValue(oOption.key1);

                if(oOption.key2 instanceof Date) {
                    oRetObj.value2 = this.formatDateValue(oOption.key2);
                }

            } else if (typeof oOption.key1 === "number") {
                if(typeof oOption.key2 === "number") {
                    oRetObj.value1 = Math.min( oOption.key1,  oOption.key2 );
                    oRetObj.value2 = Math.max( oOption.key1,  oOption.key2 );
                } else {
                    oRetObj.value1 = oOption.key1;
                }
            } else {
                oRetObj.value1 = oOption.key1;
                oRetObj.value2 = oOption.key2;
            }

            return oRetObj;
        },


        onPressDeleteHashtags: function(oEvent) {
            var oList = this["hashtagsFragment"];
            var aSelectedItems = oList.getSelectedItems();

            for (var i = 0; i < aSelectedItems.length; i++) {
		 		var oItem = aSelectedItems[i];
		 		var oBinding = oItem.getBindingContext("CatalogModel");
                 oBinding.delete().then(jQuery.proxy(this.onSuccessDeleteHashtags, this), 
                                        jQuery.proxy(this.onError, this));
		 	}
        },

        onPressDeleteMention: function(oEvent) {
            var oList = this["hashtagsFragment"];
            var aSelectedItems = oList.getSelectedItems();

            for (var i = 0; i < aSelectedItems.length; i++) {
		 		var oItem = aSelectedItems[i];
		 		var oBinding = oItem.getBindingContext("CatalogModel");
                 oBinding.delete().then(jQuery.proxy(this.onSuccessDeleteMention, this), 
                                        jQuery.proxy(this.onError, this));
		 	}
        },

        onSuccessDeleteMention: function() {

        },

        onSuccessDeleteHashtags: function() {

        },

        
        /** FORMATTERS */
        isSensitiveState: function (bSensitive) {
            var sStatus = (bSensitive === true) ? "Success" : "Warning";
            return sStatus;
        },

        formatDateValue: function (oDate) {
            var sISODate = oDate.toISOString();
            var sDate = sISODate.split('T')[0];
            return sDate;
        }
    });

});