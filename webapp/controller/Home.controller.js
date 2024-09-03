sap.ui.define([
    "./BaseController",
    //"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
],
    function (Controller, JSONModel, Device, Filter, FilterOperator, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("com.app.parkinglotodatasys.controller.Home", {
            onInit: function () {

                //AllSlots Data Visuals...
                this._setParkingLotModel();

                //Supervisor Details...
                var oSupervisorData = {
                    name: "Ramesh P",
                    position: "Parking Lot Allocator",
                    contact: "rameshp9000@gmail.com.com",
                    phone: "+91 9000727831"
                };

                //Create a JSON model and set the data
                var oSupervisorModel = new JSONModel(oSupervisorData);
                this.getView().setModel(oSupervisorModel, "supervisor");

            },

            //Notification Badge Count...
            onAfterRendering: function () {
                this._updateNotificationCount();
                this.onSlotcountAllSlotsTAble();
                this.onSlotcountAllocatedSlotsTable();
                this.onSlotcountReservationsTable();
                this.onSlotcountReservedSlotsTable();
                this.onSlotcountHistoryTable();

                //Perticular Status Slots count...
                this.onSlotcountAvailableSlots();
                this.onSlotcountOccupiedSlots();
                this.onSlotcountReservedSlots();
            },
            //Only Available slots Count...
            onSlotcountAvailableSlots: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Fetch all slots data
                oModel.read("/ZEWM_T_ALLSLOTSSet", {
                    success: function (oData) {
                        // Filter available slots locally
                        var availableSlots = oData.results.filter(slot => slot.Status === 'Available');
                        var sCount = availableSlots.length;
                        var sTitle = "Available: " + sCount;
                        that.getView().byId("TitleAvailable").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching all slots data:", oError);
                    }
                });
            },
            //only Occupied Slots Count...
            onSlotcountOccupiedSlots: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Fetch all slots data
                oModel.read("/ZEWM_T_ALLSLOTSSet", {
                    success: function (oData) {
                        // Filter available slots locally
                        var occupiedSlots = oData.results.filter(slot => slot.Status === 'Occupied');
                        var sCount = occupiedSlots.length;
                        var sTitle = "Occupied: " + sCount;
                        that.getView().byId("TitleOccupied").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching all slots data:", oError);
                    }
                });
            },
            //only Reserved Slots Count...
            onSlotcountReservedSlots: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Fetch all slots data
                oModel.read("/ZEWM_T_ALLSLOTSSet", {
                    success: function (oData) {
                        // Filter available slots locally
                        var reservedslots = oData.results.filter(slot => slot.Status === 'Reserved');
                        var sCount = reservedslots.length;
                        var sTitle = "Reserved: " + sCount;
                        that.getView().byId("TitleReserved").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching all slots data:", oError);
                    }
                });
            },

            //Count for the AllSlots table...
            onSlotcountAllSlotsTAble: function () {
                var oModel = this.getView().getModel();
                var that = this;

                oModel.read("/ZEWM_T_ALLSLOTSSet/$count", {
                    success: function (oData) {
                        var sCount = oData.results ? oData.results.length : oData;
                        var sTitle = "All SLOTS: " + sCount + "";
                        that.getView().byId("Title1455").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching parking area count:", oError);
                    }
                });
            },
            //Records count in Allocated Slots...
            onSlotcountAllocatedSlotsTable: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Read the number of records from ZEWM_PARKINGAREASet
                oModel.read("/ZEWM_T_ALDSLOTSSet/$count", {
                    success: function (oData) {
                        var sCount = oData.results ? oData.results.length : oData;
                        var sTitle = "ASSIGNED SLOTS: " + sCount + "";
                        that.getView().byId("TitleAllocated").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching parking area count:", oError);
                    }
                });
            },
            //Records count in Reservations Table...
            onSlotcountReservationsTable: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Read the number of records from ZEWM_PARKINGAREASet
                oModel.read("/ZEWM_T_RESERVSSet/$count", {
                    success: function (oData) {
                        var sCount = oData.results ? oData.results.length : oData;
                        var sTitle = "RESERVATIONS: " + sCount + "";
                        that.getView().byId("Title1455896").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching parking area count:", oError);
                    }
                });
            },
            //Records count in Reserved Slots Table...
            onSlotcountReservedSlotsTable: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Read the number of records from ZEWM_PARKINGAREASet
                oModel.read("/ZEWM_T_RSDSLOTSSet/$count", {
                    success: function (oData) {
                        var sCount = oData.results ? oData.results.length : oData;
                        var sTitle = "RESERVED SLOTS FOR VENDOR: " + sCount + "";
                        that.getView().byId("Title1489045").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching parking area count:", oError);
                    }
                });
            },
            //Records count in History Table...
            onSlotcountHistoryTable: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Read the number of records from ZEWM_PARKINGAREASet
                oModel.read("/ZEWM_T_HISTORYSet/$count", {
                    success: function (oData) {
                        var sCount = oData.results ? oData.results.length : oData;
                        var sTitle = "TOTAL HISTORY: " + sCount + "";
                        that.getView().byId("Title145589676").setText(sTitle);
                    },
                    error: function (oError) {
                        console.error("Error fetching parking area count:", oError);
                    }
                });
            },

            //For Left side Pannel...
            onItemSelect: function (oEvent) {
                var oItem = oEvent.getParameter("item");
                this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },

            onSideNavButtonPress: function () {
                var oToolPage = this.byId("toolPage");
                var bSideExpanded = oToolPage.getSideExpanded();
                this._setToggleButtonTooltip(bSideExpanded);
                oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
            },

            //Tooltp msgs for menu btn when cursor moveing on the Menu Btn... 
            _setToggleButtonTooltip: function (bLarge) {
                var oToggleButton = this.byId('sideNavigationToggleButton');
                if (bLarge) {
                    oToggleButton.setTooltip('Large Size Navigation');
                } else {
                    oToggleButton.setTooltip('Small Size Navigation');
                }
            },

            onEdit: function () {
                var oTable = this.byId("AllocatedSlotsTable");
                var oSelectedItem = oTable.getSelectedItem();

                if (!oSelectedItem) {
                    sap.m.MessageToast.show("Please select a slot to edit.");
                    return;
                }
                var aCells = oSelectedItem.getCells();
                var oContext = oSelectedItem.getBindingContext();
                var oData = oContext.getObject();
                var sServiceType = oData.ServiceType; // Get the service type of the selected item

                // Filter the ComboBox items based on the service type
                var oVBox = aCells[0]; // Assuming the ComboBox is in the first cell (Slot Number column)
                var oComboBox = oVBox.getItems()[1];
                this._filterAvailableSlotsByServiceType(oComboBox, sServiceType);

                // Make the ComboBox visible for editing
                aCells.forEach(function (oCell) {
                    var aItems = oCell.getItems ? oCell.getItems() : [];
                    aItems.forEach(function (oItem) {
                        if (oItem instanceof sap.m.Text) {
                            oItem.setVisible(false); // Hide text items
                        } else if (oItem instanceof sap.m.Input || oItem instanceof sap.m.ComboBox) {
                            oItem.setVisible(true); // Show input or combo box
                        }
                    });
                });

                this.byId("editButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                this.byId("cancelButton").setVisible(true);
            },
            _filterAvailableSlotsByServiceType: function (oComboBox, sServiceType) {
                var oModel = this.getView().getModel();
                var aFilters = [
                    new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, "Available"),
                    new sap.ui.model.Filter("Servicetype", sap.ui.model.FilterOperator.EQ, sServiceType)
                ];

                oComboBox.bindAggregation("items", {
                    path: "/ZEWM_T_ALLSLOTSSet",
                    template: new sap.ui.core.Item({
                        key: "{Slotno}",
                        text: "{Slotno}"
                    }),
                    filters: aFilters
                });
            },

            //After Editing data juct click on Save Btn...
            onSave: async function () {
                debugger
                const oView = this.getView();
                const oModel = oView.getModel();
                const oTable = this.byId("AllocatedSlotsTable");
                const oSelectedItem = oTable.getSelectedItem();

                if (!oSelectedItem) {
                    sap.m.MessageToast.show("Please select a slot to save.");
                    return;
                }

                const aCells = oSelectedItem.getCells();
                const oVBox = aCells[0];
                const oComboBox = oVBox.getItems()[1];
                const sNewSlotNumber = oComboBox.getSelectedKey();

                const oContext = oSelectedItem.getBindingContext();
                const oData = oContext.getObject();
                const sOldSlotNumber = oData.Slotnumber;

                // Skip slot number validation if the slot number has not been changed
                if (sNewSlotNumber && sNewSlotNumber !== sOldSlotNumber) {
                    if (!sNewSlotNumber) {
                        sap.m.MessageToast.show("Please select a new slot number.");
                        return;
                    }
                }

                // Validate other fields
                const sVehicleNumber = aCells[2].getItems()[1].getValue();
                const sDriverNumber = aCells[3].getItems()[1].getValue();
                const sDriverName = aCells[4].getItems()[1].getValue();

                // Mobile number validation
                if (!/^\d{10}$/.test(sDriverNumber)) {
                    aCells[3].getItems()[1].setValueState(sap.ui.core.ValueState.Error);
                    aCells[3].getItems()[1].setValueStateText("Mobile Numbers should contain at least '10 Digits!'");
                    sap.m.MessageToast.show("Please enter a valid 10-digit mobile number.");
                    return;
                } else {
                    aCells[3].getItems()[1].setValueState(sap.ui.core.ValueState.None);
                }

                // Vehicle number validation
                if (!/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(sVehicleNumber)) {
                    aCells[2].getItems()[1].setValueState(sap.ui.core.ValueState.Error);
                    aCells[2].getItems()[1].setValueStateText("Vehicle Numbers follows this pattern 'AA00AA0000'.");
                    sap.m.MessageToast.show("Please enter a valid vehicle number (e.g., AA00AA0000).");
                    return;
                } else {
                    aCells[2].getItems()[1].setValueState(sap.ui.core.ValueState.None);
                }

                // Name should contain at least 4 letters
                if (sDriverName.length < 4) {
                    aCells[4].getItems()[1].setValueState(sap.ui.core.ValueState.Error);
                    aCells[4].getItems()[1].setValueStateText("Names should contain at least '4 Letters'.");
                    sap.m.MessageToast.show("Please enter a valid name, at least contains '4 Letters'.");
                    return;
                } else {
                    aCells[4].getItems()[1].setValueState(sap.ui.core.ValueState.None);
                }

                var FinalDate = new Date(); // Getting the Present date..
                var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                var formattedDate = FinalDate.toLocaleString('en-US', options);

                // Payload for AllocatedSlots update, preserving the old slot number if it hasn't changed
                const oAllocatedSlotUpdate = {
                    AssignedslotId: oData.AssignedslotId,
                    Slotnumber: sNewSlotNumber || sOldSlotNumber, // Use old slot number if no new slot is selected
                    Vehicletype: oData.Vehicletype,
                    Vehiclenumber: sVehicleNumber,
                    Drivernumber: sDriverNumber,
                    Drivername: sDriverName,
                    ServiceType: oData.ServiceType,
                    Intime: formattedDate
                };

                try {
                    // Update the AllocatedSlots table
                    const sPath = oContext.getPath();
                    await new Promise((resolve, reject) => {
                        oModel.update(sPath, oAllocatedSlotUpdate, {
                            success: resolve,
                            error: reject
                        });
                    });

                    if (sNewSlotNumber && sNewSlotNumber !== sOldSlotNumber) {
                        // If slot number is changed, update the AllSlots table
                        // Fetch data for both old and new slots from AllSlots table
                        const sAllSlotsFilter = `?$filter=Slotno eq '${sOldSlotNumber}' or Slotno eq '${sNewSlotNumber}'`;
                        const oAllSlotsData = await new Promise((resolve, reject) => {
                            oModel.read(`/ZEWM_T_ALLSLOTSSet${sAllSlotsFilter}`, {
                                success: resolve,
                                error: reject
                            });
                        });

                        // Find the relevant slots by their slot numbers
                        const oOldSlotData = oAllSlotsData.results.find(slot => slot.Slotno === sOldSlotNumber);
                        const oNewSlotData = oAllSlotsData.results.find(slot => slot.Slotno === sNewSlotNumber);

                        // Update old slot status to 'Available'
                        const sOldSlotUpdatePath = `/ZEWM_T_ALLSLOTSSet('${oOldSlotData.Id}')`;
                        const oOldSlotUpdate = {
                            Id: oOldSlotData.Id,
                            Slotno: oOldSlotData.Slotno,
                            Status: 'Available',
                            Servicetype: oOldSlotData.Servicetype,
                        };
                        await new Promise((resolve, reject) => {
                            oModel.update(sOldSlotUpdatePath, oOldSlotUpdate, {
                                success: resolve,
                                error: reject
                            });
                        });

                        // Update new slot status to 'Occupied'
                        const sNewSlotUpdatePath = `/ZEWM_T_ALLSLOTSSet('${oNewSlotData.Id}')`;
                        const oNewSlotUpdate = {
                            Id: oNewSlotData.Id,
                            Slotno: oNewSlotData.Slotno,
                            Status: 'Occupied',
                            Servicetype: oNewSlotData.Servicetype,
                        };
                        await new Promise((resolve, reject) => {
                            oModel.update(sNewSlotUpdatePath, oNewSlotUpdate, {
                                success: resolve,
                                error: reject
                            });
                        });
                    }
                    // // Send SMS to driver
                    const driverPhoneFull = "+91" + sDriverNumber;

                    // Twilio API credentials
                    const accountSid = 'AC9418cec2d41b4131132454d424d9f90c';
                    const authToken = '574590d23b9133a189d20f34e94c360d';
                    const fromNumber = '+16187243098';

                    const messageBody = `Hello ${sDriverName}, \n\nYour details have been updated successfully. Here are your updated details:\nVehicle Number:${sVehicleNumber} \nNew Slot Number:${sNewSlotNumber || sOldSlotNumber} \n\nThank you.\nBest regards,\nArtihcus Pvt Ltd.`;

                    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

                    const payload = {
                        To: driverPhoneFull,
                        From: fromNumber,
                        Body: messageBody
                    };

                    console.log("Sending SMS...");

                    $.ajax({
                        url: url,
                        type: 'POST',
                        headers: { 'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken) },
                        data: payload,
                        success: function (data) {
                            MessageToast.show('SMS sent successfully to the Driver..!');
                            // console.log("SMS sent successfully:", data);
                        },
                        error: function (xhr, status, error) {
                            sap.m.MessageToast.show('Failed to send SMS(Number is Valid ?): ' + error);
                            console.error("SMS sending error:", error);
                        }
                    });

                    sap.m.MessageBox.success("Slot details updated successfully!");

                    // Hide input fields and show text again
                    aCells.forEach(function (oCell) {
                        const aItems = oCell.getItems ? oCell.getItems() : [];
                        aItems.forEach(function (oItem) {
                            if (oItem instanceof sap.m.Text) {
                                oItem.setVisible(true);
                            } else if (oItem instanceof sap.m.Input || oItem instanceof sap.m.ComboBox || oItem instanceof sap.m.DatePicker) {
                                oItem.setVisible(false);
                            }
                        });
                    });

                    // Refresh the AllocatedSlots and AllSlots tables
                    this.byId("AllocatedSlotsTable").getBinding("items").refresh();
                    this.byId("allSlotsTable").getBinding("items").refresh();
                    this.onSlotcountAvailableSlots();
                    this.onSlotcountOccupiedSlots();

                    // Refresh the dropdowns
                    await this.refreshSlotNumberComboBox();
                    await this._refreshParkingLotSelectAllSlots();

                    this.byId("editButton").setVisible(true);
                    this.byId("saveButton").setVisible(false);
                    this.byId("cancelButton").setVisible(false);

                } catch (oError) {
                    sap.m.MessageToast.show("Error updating slot details.");
                    console.error(oError);
                }
            },
            refreshSlotNumberComboBox: function () {
                return new Promise((resolve, reject) => {
                    var oTable = this.byId("AllocatedSlotsTable");
                    var aItems = oTable.getItems();
                    aItems.forEach(function (oItem) {
                        var oComboBox = oItem.getCells()[0].getItems()[1]; // Adjust the index based on the actual position
                        if (oComboBox && oComboBox.getBinding("items")) {
                            oComboBox.getBinding("items").refresh(); // Refresh the ComboBox items binding
                        }
                    });
                    resolve();
                });
            },
            _refreshParkingLotSelectAllSlots: function () {
                return new Promise((resolve, reject) => {
                    var oSelect = this.byId("idparkingLotSelect");
                    var oModel = this.getOwnerComponent().getModel();
                    oSelect.setModel(oModel);
                    oSelect.bindAggregation("items", {
                        path: "/ZEWM_T_ALLSLOTSSet",
                        template: new sap.ui.core.Item({
                            key: "{Slotno}",
                            text: "{Slotno}"
                        }),
                        filters: [new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, "Available")]
                    });
                    resolve();
                });
            },

            //For cancel the Edit details...
            onCancel: function () {
                var oTable = this.byId("AllocatedSlotsTable");
                // Loop through each item in the table to reset the fields
                oTable.getItems().forEach(function (oItem) {
                    // Reset the visibility of each editable field in the row
                    oItem.getCells().forEach(function (oCell) {
                        if (oCell instanceof sap.m.VBox) {
                            var aInnerControls = oCell.getItems();

                            aInnerControls.forEach(function (oInnerControl) {
                                if (oInnerControl instanceof sap.m.Input || oInnerControl instanceof sap.m.ComboBox) {
                                    // Set visible=false for input/combo box fields
                                    oInnerControl.setVisible(false);
                                } else if (oInnerControl instanceof sap.m.Text) {
                                    // Set visible=true for text fields
                                    oInnerControl.setVisible(true);
                                }
                            });
                        }
                    });
                });

                // Hide Save and Cancel buttons
                this.byId("saveButton").setVisible(false);
                this.byId("cancelButton").setVisible(false);

                // Show Edit button
                this.byId("editButton").setVisible(true);
                MessageToast.show("Edit Operation cancelled!")
            },

            //Add a new Slot to Parking Space...
            onAddNewSlotPress: async function () {
                if (!this.onAddNewSlotDialog) {
                    this.onAddNewSlotDialog = await this.loadFragment("AddNewSlot")
                }
                this.onAddNewSlotDialog.open()
            },
            onNewSlotAddingPress: async function () {
                debugger
                var oView = this.getView();
                var sSlotNumber = oView.byId("idTitleInput").getValue();
                var sServiceType = oView.byId("idComboboxAddslot").getSelectedKey();
                var oThis = this;

                // Validate required fields
                if (!sSlotNumber || !sServiceType) {
                    MessageBox.error("All fields are required.");
                    return;
                }
                // Validate slot number format
                if (!/^PSLOT\d{3}$/.test(sSlotNumber)) {
                    oView.byId("idTitleInput").setValueState("Error").setValueStateText("Slot number format should be 'PSLOT<3Digits(0-9)>'.");
                    return;
                } else {
                    oView.byId("idTitleInput").setValueState("None");
                }
                var oModel = this.getView().getModel();
                oModel.setUseBatch(false);

                //If Slot Number is Existed then raise an error...
                const allSlotsData = await new Promise((resolve, reject) => {
                    oModel.read("/ZEWM_T_ALLSLOTSSet", {
                        success: function (oData) {
                            resolve(oData.results);
                        },
                        error: function (oError) {
                            reject(oError);
                        }
                    });
                });
                // Check if the slot number already exists
                const bSlotNumberExists = allSlotsData.some(slot => slot.Slotno === sSlotNumber);
                if (bSlotNumberExists) {
                    MessageBox.error("Slot Number already exists!");
                    return;  // Stop further execution
                }

                // }
                // Generate UUID for the new slot
                var sUUID = this.generateUUID();
                // Create new slot with UUID
                var oPayload = {
                    Id: sUUID, // The UUID field
                    Slotno: sSlotNumber,
                    Servicetype: sServiceType,
                    Status: "Available"
                };

                try {
                    debugger
                    await this.createData(oModel, oPayload, "/ZEWM_T_ALLSLOTSSet");
                    MessageBox.success("New slot added successfully.");
                    // Clear the input fields after successful creation
                    oView.byId("idTitleInput").setValue("");
                    oView.byId("idComboboxAddslot").setSelectedKey("");
                } catch (error) {
                    console.error("Error: ", error);
                    MessageBox.error("Some technical issue occurred.");
                }
                this.onAddNewSlotDialog.close();
                this.onSlotcountAllSlotsTAble();
                this.onSlotcountAvailableSlots();
                this.onSlotcountOccupiedSlots();
                this.onSlotcountReservedSlots();
                // Refresh the AllSlots table
                this.getView().byId("allSlotsTable").getBinding("items").refresh();
            },
            // Helper method to generate UUID
            generateUUID: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },

            //Closing for Add a New Slot Dialog..
            onCloseaddslotDialog: function () {
                this.onAddNewSlotDialog.close();
            },

            //Search anything from AllocatedSlots Table...(this way also works fine)
            onLiveSearchAllocatedPress: async function (oEvent) {
                var sQuery = oEvent.getParameter("newValue").trim();
                var oList = this.byId("AllocatedSlotsTable"); // Assuming this is your Allocated Slots table ID
                var oBinding = oList.getBinding("items");

                // Check if the binding is available
                if (!oBinding) {
                    console.error("Binding not found on the list");
                    return;
                }

                try {
                    var oModel = this.getView().getModel(); // Assuming the model is bound to the view
                    var sPath = "/ZEWM_T_ALDSLOTSSet"; // Your EntitySet path

                    // Fetch the data from the OData service
                    var aAllData = await new Promise((resolve, reject) => {
                        oModel.read(sPath, {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                console.error("Failed to fetch all data:", oError);
                                reject(oError);
                            }
                        });
                    });

                    // If there's a search query, filter the data based on the query
                    var aFilteredItems;
                    if (sQuery) {
                        aFilteredItems = aAllData.filter(function (oItem) {
                            return (oItem.Slotnumber && oItem.Slotnumber.includes(sQuery)) ||
                                (oItem.Vehicletype && oItem.Vehicletype.includes(sQuery)) ||
                                (oItem.Vehiclenumber && oItem.Vehiclenumber.includes(sQuery)) ||
                                (oItem.Drivernumber && oItem.Drivernumber.includes(sQuery)) ||
                                (oItem.Drivername && oItem.Drivername.includes(sQuery)) ||
                                (oItem.ServiceType && oItem.ServiceType.includes(sQuery));
                        });
                    } else {
                        aFilteredItems = aAllData; // No search query, use all data
                    }

                    // Create a new JSON model with the filtered data
                    var oFilteredModel = new sap.ui.model.json.JSONModel(aFilteredItems);

                    // Bind the filtered model to the table
                    oList.setModel(oFilteredModel);
                    oList.bindItems({
                        path: "/",
                        template: oList.getBindingInfo("items").template
                    });
                } catch (error) {
                    console.error("Error fetching or filtering data:", error);
                }
            },

            //Search anything from History Table...
            onLiveSearchAnythingPress: async function (oEvent) {
                var sQuery = oEvent.getParameter("newValue").trim();
                var oList = this.byId("idHistoryTable"); // Assuming this is your History table ID

                //First getting data from OData...
                try {
                    var oModel = this.getView().getModel(); // Assuming the model is bound to the view
                    var sPath = "/ZEWM_T_HISTORYSet"; // Your EntitySet path

                    // Fetch the data from the OData service
                    var aAllData = await new Promise((resolve, reject) => {
                        oModel.read(sPath, {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                console.error("Failed to fetch all data:", oError);
                                reject(oError);
                            }
                        });
                    });

                    // If there's a search query, filter the data based on the query
                    var aFilteredData;
                    if (sQuery) {
                        aFilteredData = aAllData.filter(function (oItem) {
                            return (oItem.Slotnumber && oItem.Slotnumber.includes(sQuery)) ||
                                (oItem.Vehicletype && oItem.Vehicletype.includes(sQuery)) ||
                                (oItem.Vehiclenumber && oItem.Vehiclenumber.includes(sQuery)) ||
                                (oItem.Drivernumber && oItem.Drivernumber.includes(sQuery)) ||
                                (oItem.Drivername && oItem.Drivername.includes(sQuery)) ||
                                (oItem.Servicetype && oItem.Servicetype.includes(sQuery)) ||
                                (oItem.Intime && oItem.Intime.includes(sQuery)) ||
                                (oItem.Outtime && oItem.Outtime.includes(sQuery));
                        });
                    } else {
                        aFilteredData = aAllData; // No search query, use all data
                    }

                    // Create a new JSON model with the filtered data
                    var oFilteredModel = new sap.ui.model.json.JSONModel(aFilteredData);

                    // Bind the filtered model to the table
                    oList.setModel(oFilteredModel);
                    oList.bindItems({
                        path: "/",
                        template: oList.getBindingInfo("items").template
                    });

                } catch (error) {
                    console.error("Error fetching or filtering data:", error);
                }
            },

            //Search thing in Reservations Table...
            onLiveSearchReservationsPress: async function (oEvent) {
                var sQuery = oEvent.getParameter("newValue").trim();
                var oList = this.byId("idReservationsTable"); // Assuming this is your Reservations table ID
                var oBinding = oList.getBinding("items");

                // Check if the binding is available
                if (!oBinding) {
                    console.error("Binding not found on the list");
                    return;
                }

                try {
                    var oModel = this.getView().getModel(); // Assuming the model is bound to the view
                    var sPath = "/ZEWM_T_RESERVSSet"; // Your EntitySet path

                    // Fetch the data from the OData service
                    var aAllData = await new Promise((resolve, reject) => {
                        oModel.read(sPath, {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                console.error("Failed to fetch all data:", oError);
                                reject(oError);
                            }
                        });
                    });

                    // If there's a search query, filter the data based on the query
                    var aFilteredItems;
                    if (sQuery) {
                        aFilteredItems = aAllData.filter(function (oItem) {
                            return (oItem.Vendorname && oItem.Vendorname.includes(sQuery)) ||
                                (oItem.Vendornumber && oItem.Vendornumber.includes(sQuery)) ||
                                (oItem.Drivername && oItem.Drivername.includes(sQuery)) ||
                                (oItem.Drivernumber && oItem.Drivernumber.includes(sQuery)) ||
                                (oItem.Vehicletype && oItem.Vehicletype.includes(sQuery)) ||
                                (oItem.Vehiclenumber && oItem.Vehiclenumber.includes(sQuery)) ||
                                (oItem.Servicetype && oItem.Servicetype.includes(sQuery)) ||
                                (oItem.Intime && oItem.Intime.includes(sQuery));
                        });
                    } else {
                        aFilteredItems = aAllData; // No search query, use all data
                    }

                    // Create a new JSON model with the filtered data
                    var oFilteredModel = new sap.ui.model.json.JSONModel(aFilteredItems);

                    // Bind the filtered model to the table
                    oList.setModel(oFilteredModel);
                    oList.bindItems({
                        path: "/",
                        template: oList.getBindingInfo("items").template
                    });

                } catch (error) {
                    console.error("Error fetching or filtering data:", error);
                }
            },

            //Serach anything from Reserved Slots table... 
            onLiveSearchReservedSlotsPress: async function (oEvent) {
                var sQuery = oEvent.getParameter("newValue").trim();
                var oList = this.byId("idReservedslotsTable"); // Assuming this is your table ID

                try {
                    var oModel = this.getView().getModel(); // Assuming the model is bound to the view
                    var sPath = "/ZEWM_T_RSDSLOTSSet"; // Your EntitySet path

                    // Fetch the data from the OData service
                    var aAllData = await new Promise((resolve, reject) => {
                        oModel.read(sPath, {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                console.error("Failed to fetch all data:", oError);
                                reject(oError);
                            }
                        });
                    });

                    // If there's a search query, filter the data based on the query
                    var aFilteredData;
                    if (sQuery) {
                        aFilteredData = aAllData.filter(function (oItem) {
                            return (oItem.Vendorname && oItem.Vendorname.includes(sQuery)) ||
                                (oItem.Vendornumber && oItem.Vendornumber.includes(sQuery)) ||
                                (oItem.Drivername && oItem.Drivername.includes(sQuery)) ||
                                (oItem.Drivernumber && oItem.Drivernumber.includes(sQuery)) ||
                                (oItem.Slotnumber && oItem.Slotnumber.includes(sQuery)) ||
                                (oItem.Servicetype && oItem.Servicetype.includes(sQuery)) ||
                                (oItem.Vehicletype && oItem.Vehicletype.includes(sQuery)) ||
                                (oItem.Vehiclenumber && oItem.Vehiclenumber.includes(sQuery));
                        });
                    } else {
                        aFilteredData = aAllData; // No search query, use all data
                    }

                    // Create a new JSON model with the filtered data
                    var oFilteredModel = new sap.ui.model.json.JSONModel(aFilteredData);

                    // Bind the filtered model to the table
                    oList.setModel(oFilteredModel);
                    oList.bindItems({
                        path: "/",
                        template: oList.getBindingInfo("items").template
                    });

                } catch (error) {
                    console.error("Error fetching or filtering data:", error);
                }
            },

            //Assign a slot to vehicle...(1st window)
            onAssignSlotPress: async function () {
                debugger;
                var sSlotID = this.getView().byId("idparkingLotSelect").getSelectedKey();
                var sSlotNumber = this.getView().byId("idparkingLotSelect")._getSelectedItemText();
                var sVehicleNumber = this.getView().byId("idvehicleNumber").getValue();
                var sVehicleType = this.getView().byId("idvehicleType").getValue();
                var sDriverNumber = this.getView().byId("iddriverNumber").getValue();
                var sDriverName = this.getView().byId("iddriverName").getValue();
                var sServiceType = this.getView().byId("idTypeOfDelivery").getSelectedKey();
                var oThis = this;

                var valid = true;
                if (!sSlotNumber) {
                    this.getView().byId("idparkingLotSelect").setValueState(sap.ui.core.ValueState.Error);
                    this.getView().byId("idparkingLotSelect").setValueStateText("Select Slot from 'Dropdown'");
                    valid = false;
                } else {
                    this.getView().byId("idparkingLotSelect").setValueState(sap.ui.core.ValueState.None);
                }

                if (!sVehicleNumber.match(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)) {
                    this.getView().byId("idvehicleNumber").setValueState(sap.ui.core.ValueState.Error);
                    this.getView().byId("idvehicleNumber").setValueStateText("Vehicle Numbers follows this pattern 'AP09AB1234'");
                    valid = false;
                } else {
                    this.getView().byId("idvehicleNumber").setValueState(sap.ui.core.ValueState.None);
                }

                if (!sVehicleType) {
                    this.getView().byId("idvehicleType").setValueState(sap.ui.core.ValueState.Error);
                    valid = false;
                } else {
                    this.getView().byId("idvehicleType").setValueState(sap.ui.core.ValueState.None);
                }

                if (!sDriverNumber.match(/^\d{10}$/)) {
                    this.getView().byId("iddriverNumber").setValueState(sap.ui.core.ValueState.Error);
                    this.getView().byId("iddriverNumber").setValueStateText("Mobile Numbers should contain at least '10 Digits!'");
                    valid = false;
                } else {
                    this.getView().byId("iddriverNumber").setValueState(sap.ui.core.ValueState.None);
                }

                if (sDriverName.length < 4) {
                    this.getView().byId("iddriverName").setValueState(sap.ui.core.ValueState.Error);
                    this.getView().byId("iddriverName").setValueStateText("Names contains at least '4Letters!'");
                    valid = false;
                } else {
                    this.getView().byId("iddriverName").setValueState(sap.ui.core.ValueState.None);
                }

                if (!sServiceType) {
                    this.getView().byId("idTypeOfDelivery").setValueState(sap.ui.core.ValueState.Error);
                    this.getView().byId("idTypeOfDelivery").setValueStateText("Select Service Type in 'Dropdown'");
                    valid = false;
                } else {
                    this.getView().byId("idTypeOfDelivery").setValueState(sap.ui.core.ValueState.None);
                }

                if (!valid) {
                    MessageBox.error("Please fill all fields correctly.");
                    return;
                }

                var oModel = this.getView().getModel();
                oModel.setUseBatch(false);
                var sUUID = this.generateUUID();

                var FinalDate = new Date(); // Getting the Present date..
                // Format the date and time
                var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                var formattedDate = FinalDate.toLocaleString('en-US', options);

                try {
                    // Check if the selected slot matches the selected service type
                    // const slotData = await new Promise((resolve, reject) => {
                    //     oModel.read(`/ZEWM_T_ALDSLOTSSet(${sSlotNumber})`, {
                    //         success: function (oData) {
                    //             resolve(oData);
                    //         },
                    //         error: function (oError) {
                    //             reject(oError);
                    //         }
                    //     });
                    // });

                    // if (slotData.Servicetype !== sServiceType) {
                    //     MessageBox.error(`The selected slot is for ${slotData.Servicetype} service. Please select a slot for ${sServiceType} service.`);
                    //     return;
                    // }

                    // Check if vehicle number or driver number already exist in Allocated Slots
                    const allocatedSlotsData = await new Promise((resolve, reject) => {
                        oModel.read("/ZEWM_T_ALDSLOTSSet", {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                reject(oError);
                            }
                        });
                    });

                    //Check the vehicle number if alreay Existed...
                    const bVehicleNumberExists = allocatedSlotsData.some(slot => slot.Vehiclenumber === sVehicleNumber);

                    if (bVehicleNumberExists) {
                        MessageBox.error("Vehicle Number already exists.");
                        this.getView().byId("idvehicleNumber").setValueState(sap.ui.core.ValueState.Error);
                        this.getView().byId("idvehicleNumber").setValueStateText("Vehicle Number should be unique.");
                        return;
                    }

                    // If no duplicates are found, proceed with the assignment
                    const assignmentModel = new sap.ui.model.json.JSONModel({
                        AssignedslotId: sUUID,
                        Vehicletype: sVehicleType,
                        Vehiclenumber: sVehicleNumber,
                        Drivernumber: sDriverNumber,
                        Drivername: sDriverName,
                        ServiceType: sServiceType,
                        Intime: formattedDate,
                        Slotnumber: sSlotNumber // Ensure the association is correctly set
                    });

                    this.getView().setModel(assignmentModel, "assignmentModel");
                    const oPayload = this.getView().getModel("assignmentModel").getProperty("/");
                    //console.log("Payload: ", oPayload);

                    // Create the assignment in AllocatedSlots
                    await this.createData(oModel, oPayload, "/ZEWM_T_ALDSLOTSSet");

                    //Update slot status in AllSLots table..
                    var sPath = this.byId("idparkingLotSelect").getSelectedItem().getBindingContext().getPath();
                    const updatedParkingLot = {
                        Id: sSlotID,
                        Slotno: sSlotNumber,
                        Status: "Occupied", // Assuming false represents empty parking
                        Servicetype: sServiceType
                    };
                    oModel.update(sPath, updatedParkingLot, {
                        success: function () {
                        }.bind(this),
                        error: function (oError) {
                            sap.m.MessageBox.error("Failed to update: " + oError.message);
                        }.bind(this)
                    });

                    // Send SMS to driver using the details from the payload
                    const driverPhoneFull = "+91" + sDriverNumber;
                    const accountSid = 'AC9418cec2d41b4131132454d424d9f90c';
                    const authToken = '574590d23b9133a189d20f34e94c360d';
                    const fromNumber = '+16187243098';
                    const messageBody = `Hello ${sDriverName}, \n\nPlease park your Vehicle at the following slot:\nVehicle Number:${sVehicleNumber} \nSlot Number:${sSlotNumber} \n\nThank you for choosing us.\nBest regards,\nArtihcus Pvt Ltd.`;
                    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

                    const smsPayload = {
                        To: driverPhoneFull,
                        From: fromNumber,
                        Body: messageBody
                    };

                    $.ajax({
                        url: url,
                        type: 'POST',
                        headers: { 'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken) },
                        data: smsPayload,
                        success: function (data) {
                            MessageToast.show('SMS sent successfully to the Driver..!');
                        },
                        error: function (xhr, status, error) {
                            sap.m.MessageToast.show('Failed to send SMS(Number is valid?): ' + error);
                        }
                    });

                    // // After Assigning the Announcement will be raised...
                    function makeAnnouncement(message, lang = 'en-US') {
                        // Check if the browser supports the Web Speech API
                        if ('speechSynthesis' in window) {
                            // Create a new instance of SpeechSynthesisUtterance
                            var utterance = new SpeechSynthesisUtterance(message);

                            // Set properties (optional)
                            utterance.pitch = 1; // Range between 0 (lowest) and 2 (highest)
                            utterance.rate = 0.77;  // Range between 0.1 (lowest) and 10 (highest)
                            utterance.volume = 1; // Range between 0 (lowest) and 1 (highest)
                            utterance.lang = lang; // Set the language

                            // Speak the utterance
                            window.speechSynthesis.speak(utterance);
                        } else {
                            console.log('Sorry, your browser does not support the Web Speech API.');
                        }
                    }
                    // Example usage Voice
                    makeAnnouncement(`कृपया ध्यान दें। वाहन नंबर ${sVehicleNumber} को स्लॉट नंबर ${sSlotNumber} द्वारा आवंटित किया गया है।`, 'hi-IN');
                    makeAnnouncement(`దయచేసి వినండి. వాహనం నంబర్ ${sVehicleNumber} కు స్లాట్ నంబర్ ${sSlotNumber} కేటాయించబడింది.`, 'te-IN');

                    //Generate the QR Code for the Assigned slot Details..
                    this.printAssignmentDetails();
                    this.onSlotcountAllocatedSlotsTable();
                    this.onSlotcountAvailableSlots();
                    this.onSlotcountOccupiedSlots();

                    // Refresh the tables
                    this.getView().byId("AllocatedSlotsTable").getBinding("items").refresh();
                    this.getView().byId("idparkingLotSelect").getBinding("items").refresh();
                    MessageBox.success("Slot Assigned successfully");
                    this.getView().byId("idparkingLotSelect").setSelectedKey("");
                    this.getView().byId("idvehicleNumber").setValue("");
                    this.getView().byId("idvehicleType").setValue("");
                    this.getView().byId("iddriverNumber").setValue("");
                    this.getView().byId("iddriverName").setValue("");
                    this.getView().byId("idTypeOfDelivery").setSelectedKey("");
                } catch (error) {
                    console.error("Error assigning slot: ", error);
                    MessageBox.error("Failed to assign slot: " + error.message);
                }
            },

            //Clearing the You Enterd Deatils..
            onClearSlotDetailsPress: function () {
                debugger
                // Clear form fields
                this.getView().byId("idparkingLotSelect").setSelectedKey("");
                this.getView().byId("idvehicleNumber").setValue("");
                this.getView().byId("idvehicleType").setValue("");
                this.getView().byId("iddriverNumber").setValue("");
                this.getView().byId("iddriverName").setValue("");
                this.getView().byId("idTypeOfDelivery").setSelectedKey("");
                var oComboBox = this.getView().byId("idparkingLotSelect");
                var oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, "Available");
                // Bind the items to the ComboBox, applying the filter
                oComboBox.bindItems({
                    path: "/ZEWM_T_ALLSLOTSSet",
                    template: new sap.ui.core.Item({
                        key: "{Id}",
                        text: "{Slotno}"
                    }),
                    filters: [oFilter] // Apply the filter for available slots
                });

                // Optionally, you can force a refresh of the model to ensure you're getting the latest data
                var oModel = this.getView().getModel();
                oModel.refresh(true);
            },

            //Data Visualization from Supervisor page, which is fetches the data from All slots Table...
            onGeographicBtnPress: async function () {
                if (!this.onDatavisualizationDialog) {
                    this.onDatavisualizationDialog = await this.loadFragment("DataVisualization")
                }
                this.onDatavisualizationDialog.open();
            },
            //Having one calling method in Init Function...(for this only)
            _setParkingLotModel: function () {
                var oModel = this.getOwnerComponent().getModel();
                var that = this;

                oModel.read("/ZEWM_T_ALLSLOTSSet", {
                    success: function (oData) {
                        var aItems = oData.results;
                        var availableCount = aItems.filter(item => item.Status === "Available").length;
                        var occupiedCount = aItems.filter(item => item.Status === "Occupied").length;
                        var reservedCount = aItems.filter(item => item.Status === "Reserved").length;

                        var aChartData = {
                            Items: [
                                {
                                    Status: "Available",
                                    Count: availableCount
                                },
                                {
                                    Status: "Occupied",
                                    Count: occupiedCount
                                },
                                {
                                    Status: "Reserved",
                                    Count: reservedCount
                                }
                            ]
                        };
                        var oParkingLotModel = new sap.ui.model.json.JSONModel();
                        oParkingLotModel.setData(aChartData);
                        that.getView().setModel(oParkingLotModel, "ParkingLotModel");
                    },
                    error: function (oError) {
                        console.error(oError);
                    }
                });
            },

            //for closing Pie Chart for Data visualization...
            onClosePiechartDialog: function () {
                if (this.onDatavisualizationDialog) {
                    this.onDatavisualizationDialog.close();
                }
            },

            //Un Assign the slot after the vehical leavs the Parking Space...
            onUnAssignPress: async function (oEvent) {
                debugger;
                const oItem = oEvent.getSource().getParent();
                const oContext = oItem.getBindingContext();
                const sPath = oContext.getPath(); // Path to the selected AllocatedSlots entry
                const oModel = this.getView().getModel();
                const oAllocatedData = oContext.getObject(); // Get the selected slot data
                const sUUID = this.generateUUID(); // Generate a unique ID for history entry

                var FinalDate = new Date(); // Getting the Present date..
                // Format the date and time
                var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                var formattedDate = FinalDate.toLocaleString('en-US', options);
                const oThis = this;

                MessageBox.confirm(
                    `Confirm Un-Assignment for this Slot '${oAllocatedData.Slotnumber}'?`,
                    {
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        onClose: async function (sAction) {
                            if (sAction === MessageBox.Action.YES) {
                                try {
                                    // Step 1: Add entry to History table
                                    const oHistoryPayload = {
                                        Id: sUUID,
                                        Slotnumber: oAllocatedData.Slotnumber,
                                        Servicetype: oAllocatedData.ServiceType,
                                        Vehicletype: oAllocatedData.Vehicletype,
                                        Vehiclenumber: oAllocatedData.Vehiclenumber,
                                        Drivername: oAllocatedData.Drivername,
                                        Drivernumber: oAllocatedData.Drivernumber,
                                        Intime: oAllocatedData.Intime,
                                        Outtime: formattedDate, // Set the current time as Outtime
                                    };
                                    await new Promise((resolve, reject) => {
                                        oModel.create("/ZEWM_T_HISTORYSet", oHistoryPayload, {
                                            success: resolve,
                                            error: reject
                                        });
                                    });

                                    // Step 2: Update the slot status in AllSlots to 'Available'
                                    const sAllSlotsPath = `/ZEWM_T_ALLSLOTSSet?$filter=Slotno eq '${oAllocatedData.Slotnumber}'`;
                                    const allSlotsData = await new Promise((resolve, reject) => {
                                        oModel.read(sAllSlotsPath, {
                                            success: (oData) => resolve(oData.results),
                                            error: reject
                                        });
                                    });
                                    // Find the specific slot data based on the Slotno
                                    const slotData = allSlotsData.find(slot => slot.Slotno === oAllocatedData.Slotnumber);
                                    // Extract SlotId or other necessary identifiers
                                    const sSlotNumberPath = `/ZEWM_T_ALLSLOTSSet('${slotData.Id}')`;

                                    // Prepare the updated slot object
                                    const updatedSlot = {
                                        Id: slotData.Id,
                                        Slotno: slotData.Slotno,
                                        Status: "Available",
                                        Servicetype: slotData.Servicetype // Keep existing ServiceType
                                    };

                                    await new Promise((resolve, reject) => {
                                        oModel.update(sSlotNumberPath, updatedSlot, {
                                            success: resolve,
                                            error: reject
                                        });
                                    });
                                    sap.m.MessageToast.show("Slot status updated to Available.");

                                    // Step 3: Remove the entry from AllocatedSlots
                                    await new Promise((resolve, reject) => {
                                        oModel.remove(sPath, {
                                            success: resolve,
                                            error: reject
                                        });
                                    });
                                    MessageBox.success("Slot unassigned successfully. Please check the history.");
                                    oThis.onSlotcountHistoryTable();
                                    oThis.onSlotcountAllocatedSlotsTable();
                                    oThis.onSlotcountAvailableSlots();
                                    oThis.onSlotcountOccupiedSlots();

                                    // Step 4: Refresh the relevant tables
                                    oThis.getView().byId("AllocatedSlotsTable").getBinding("items").refresh();
                                    oThis.getView().byId("idHistoryTable").getBinding("items").refresh();
                                    oThis.getView().byId("allSlotsTable").getBinding("items").refresh();
                                    oThis.getView().byId("idparkingLotSelect").getBinding("items").refresh();

                                } catch (error) {
                                    MessageBox.error("Failed to unassign slot or add to history.");
                                    console.error("Error: ", error);
                                }
                            }
                        }
                    }
                );
            },




            //=============================================================>For Vendor View operations...!!
            //For Rejection on Request for a slot...
            onRejectConfirmSlotPress: function () {
                debugger
                var oSelectedItem = this.getView().byId("idReservationsTable").getSelectedItem();
                if (!oSelectedItem) {
                    MessageToast.show("Please select a reservation to reject.");
                    return;
                }
                var oVendorNumber = oSelectedItem.getBindingContext().getObject().Vendornumber;
                var oVendorName = oSelectedItem.getBindingContext().getObject().Vendorname;
                var sPath = oSelectedItem.getBindingContext().getPath();
                var oModel = this.getView().getModel();
                var oThis = this;

                MessageBox.warning(
                    "Are you sure you want to Reject this RESERVATION..?",
                    {
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        onClose: async function (sAction) {
                            debugger
                            if (sAction === MessageBox.Action.YES) {
                                try {
                                    // Remove the entry from Reservations
                                    await new Promise((resolve, reject) => {
                                        oModel.remove(sPath, {
                                            success: function () {
                                                MessageBox.success("Reservation rejected successfully.");
                                                oThis.getView().byId("idReservationsTable").getBinding("items").refresh();
                                                oThis.onSlotcountReservationsTable();
                                                oThis._updateNotificationCount();
                                                resolve();
                                            },
                                            error: function (oError) {
                                                MessageBox.error("Failed to reject reservation: " + oError.message);
                                                reject(oError);
                                            }
                                        });
                                    });

                                    // Retrieve vendor number and other details from the selected item
                                    var vendorPhoneFull = "+91" + oVendorNumber;
                                    var messageBody = `Your request for a slot was rejected.\n\nDear Vendor '${oVendorName}'.\n\nWe regret to inform you that there are no available slots in the parking space at the moment. We apologize for any inconvenience this may cause. Please try again after some time.\n\nThank you for choosing us.\n\nBest regards,\nArtihcus Global Pvt Ltd.`;

                                    // Send SMS to vendor
                                    const accountSid = 'AC9418cec2d41b4131132454d424d9f90c';
                                    const authToken = '574590d23b9133a189d20f34e94c360d';
                                    const fromNumber = '+16187243098';
                                    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

                                    const payload = {
                                        To: vendorPhoneFull,
                                        From: fromNumber,
                                        Body: messageBody
                                    };

                                    await $.ajax({
                                        url: url,
                                        type: 'POST',
                                        headers: { 'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken) },
                                        data: payload,
                                        success: function () {
                                            sap.m.MessageToast.show('SMS sent successfully to the vendor.');
                                        },
                                        error: function (xhr, status, error) {
                                            sap.m.MessageToast.show('Failed to send SMS. Please check the mobile number and try again.');
                                            console.error('Error sending SMS:', error);
                                        }
                                    });
                                } catch (error) {
                                    MessageBox.error("An error occurred: " + error.message);
                                    console.error("Error: ", error);
                                }
                            }
                        }
                    }
                );
            },

            //Vendor reservation request for slot..."ONCONFIRM" Btn from Reservations..
            onConfirmRequestSlotPress: async function () {
                var oSelected = this.byId("idReservationsTable").getSelectedItem();
                if (oSelected) {
                    var oSelectedObject = oSelected.getBindingContext().getObject();
                    var oServiceType = oSelectedObject.Servicetype;

                    // Create and set a JSON model to store the selected item details
                    const oConfirmRequestModel = new sap.ui.model.json.JSONModel({
                        Id: oSelectedObject.Id,
                        Vendorname: oSelectedObject.Vendorname,
                        Vendornumber: oSelectedObject.Vendornumber,
                        Drivername: oSelectedObject.Drivername,
                        Drivernumber: oSelectedObject.Drivernumber,
                        Vehicletype: oSelectedObject.Vehicletype,
                        Vehiclenumber: oSelectedObject.Vehiclenumber,
                        Servicetype: oServiceType
                    });
                    this.getView().setModel(oConfirmRequestModel, "oConfirmRequestModel");

                    // Load the dialog fragment if not already loaded
                    if (!this.onRequestConfirmSlotDialog) {
                        this.onRequestConfirmSlotDialog = await this.loadFragment("ReserveSlotforVendor");
                    }

                    var oModel = this.getView().getModel();
                    var oThis = this;
                    // Fetch all slots data
                    oModel.read("/ZEWM_T_ALLSLOTSSet", {
                        success: function (oData) {
                            // Filter available slots based on Service Type
                            var aFilteredSlots = oData.results.filter(function (slot) {
                                return slot.Status === "Available" && slot.Servicetype === oServiceType;
                            });

                            // Get the ComboBox control
                            var oComboBox = oThis.byId("idselectSlotReserve");
                            // Clear existing items from ComboBox
                            oComboBox.removeAllItems();
                            // Add filtered slots to the ComboBox
                            aFilteredSlots.forEach(function (slot) {
                                oComboBox.addItem(new sap.ui.core.ListItem({
                                    key: slot.Id,
                                    text: slot.Slotno
                                }));
                            });
                            // Open the dialog
                            oThis.onRequestConfirmSlotDialog.open();
                        },
                        error: function (oError) {
                            sap.m.MessageBox.error("Failed to load slot data.");
                        }
                    });
                } else {
                    // Show a message if no vendor is selected
                    sap.m.MessageToast.show("Please Select a Vendor to Confirm A Slot Reservation..!");
                }
            },

            //After recieving a request from vendor then the Admin will Accept that request and reserve a slot for him...
            onReserveSlotBtnPress: async function () {
                debugger
                try {
                    const oView = this.getView();
                    const oConfirmRequestModel = oView.getModel("oConfirmRequestModel").getData();
                    const sSlotID = oView.byId("idselectSlotReserve").getSelectedKey();
                    const oSelectedSlotText = oView.byId("idselectSlotReserve")._getSelectedItemText();
                    const oModel = oView.getModel();
                    var sUUID = this.generateUUID();
                    const oThis = this;

                    if (!sSlotID) {
                        sap.m.MessageToast.show("Please select a slot to reserve.");
                        return;
                    }

                    // Fetch the slot data from AllSlots entity based on Slotno
                    const sAllSlotsPath = `/ZEWM_T_ALLSLOTSSet?$filter=Slotno eq '${oSelectedSlotText}'`;
                    const allSlotsData = await new Promise((resolve, reject) => {
                        oModel.read(sAllSlotsPath, {
                            success: (oData) => resolve(oData.results),
                            error: reject
                        });
                    });

                    // Find the specific slot data based on the Slotno
                    const slotData = allSlotsData.find(slot => slot.Slotno === oSelectedSlotText);
                    if (!slotData) {
                        sap.m.MessageToast.show("Selected slot not found in AllSlots.");
                        return;
                    }

                    const sSlotNumberPath = `/ZEWM_T_ALLSLOTSSet('${slotData.Id}')`;

                    // Prepare the updated slot object
                    const updatedSlot = {
                        Id: slotData.Id,
                        Slotno: slotData.Slotno,
                        Status: "Reserved",
                        Servicetype: slotData.Servicetype // Keep existing ServiceType
                    };

                    // Update the status of the selected slot to 'Reserved'
                    await new Promise((resolve, reject) => {
                        oModel.update(sSlotNumberPath, updatedSlot, {
                            success: resolve,
                            error: reject
                        });
                    });

                    sap.m.MessageToast.show("Slot status updated to Reserved.");

                    // Create a new entry in the Reserved Slots table
                    const oReservedSlotEntry = {
                        Vendorname: oConfirmRequestModel.Vendorname,
                        Vendornumber: oConfirmRequestModel.Vendornumber,
                        Drivername: oConfirmRequestModel.Drivername,
                        Drivernumber: oConfirmRequestModel.Drivernumber,
                        Vehicletype: oConfirmRequestModel.Vehicletype,
                        Vehiclenumber: oConfirmRequestModel.Vehiclenumber,
                        Servicetype: oConfirmRequestModel.Servicetype,
                        Id: sUUID, // Link the reserved slot ID
                        Slotnumber: slotData.Slotno
                    };

                    await new Promise((resolve, reject) => {
                        oModel.create("/ZEWM_T_RSDSLOTSSet", oReservedSlotEntry, {
                            success: () => {
                                sap.m.MessageBox.success("Slot reserved successfully!");
                                oView.byId("idReservedslotsTable").getBinding("items").refresh();
                                oThis.getView().byId("idparkingLotSelect").getBinding("items").refresh();
                                oThis.getView().byId("allSlotsTable").getBinding("items").refresh();
                                resolve();
                            },
                            error: (oError) => {
                                sap.m.MessageBox.error(oError.message);
                                reject(oError);
                            }
                        });
                    });

                    // Send SMS to vendor with the reservation details
                    const vendorPhoneFull = "+91" + oConfirmRequestModel.Vendornumber;
                    const messageBody = `Hello, Your request for a slot was accepted.\n\nDear Vendor: ${oConfirmRequestModel.Vendorname}.\nThank you for your request. We're pleased to inform you that we have successfully reserved a slot for you. Here are the details of your reserved slot:\nDriver Name: ${oConfirmRequestModel.Drivername},\nDriver Number: ${oConfirmRequestModel.Drivernumber},\nVehicle Number: ${oConfirmRequestModel.Vehiclenumber},\nSlot Number: ${slotData.Slotno},\nService Type: ${oConfirmRequestModel.Servicetype}.\nPlease send your truck to our warehouse.\n\nThank you for choosing us.\n\nBest regards,\nArtihcus Global Pvt Ltd.`;

                    const accountSid = 'AC9418cec2d41b4131132454d424d9f90c';
                    const authToken = '574590d23b9133a189d20f34e94c360d';
                    const fromNumber = '+16187243098';
                    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

                    const payload = {
                        To: vendorPhoneFull,
                        From: fromNumber,
                        Body: messageBody
                    };

                    await $.ajax({
                        url: url,
                        type: 'POST',
                        headers: { 'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken) },
                        data: payload,
                        success: function (data) {
                            sap.m.MessageBox.success('SMS sent successfully to the vendor, please cross-check once.');
                        },
                        error: function (xhr, status, error) {
                            sap.m.MessageToast.show('Failed to send SMS. Please check the number.');
                        }
                    });

                    // Remove the confirmed or rejected request from the Reservations table
                    const oSelectedItem = this.byId("idReservationsTable").getSelectedItem();
                    if (oSelectedItem) {
                        const sPath = oSelectedItem.getBindingContext().getPath();

                        await new Promise((resolve, reject) => {
                            oModel.remove(sPath, {
                                success: () => {
                                    sap.m.MessageToast.show("Request removed successfully.");
                                    oThis.getView().byId("idReservationsTable").getBinding("items").refresh();
                                    oThis.onSlotcountReservationsTable();
                                    oThis.onSlotcountReservedSlotsTable();
                                    oThis.onSlotcountOccupiedSlots();
                                    oThis.onSlotcountReservedSlots();
                                    resolve();
                                },
                                error: (oError) => {
                                    sap.m.MessageBox.error(oError.message);
                                    reject(oError);
                                }
                            });
                        });
                    } else {
                        sap.m.MessageToast.show("No selected request to remove.");
                    }

                    // Show success message and close the dialog if needed
                    //sap.m.MessageToast.show("Slot reserved successfully!");
                    if (this.onRequestConfirmSlotDialog) {
                        this.onRequestConfirmSlotDialog.close();
                    }
                } catch (error) {
                    sap.m.MessageBox.error("Failed to reserve slot: " + error.message);
                    console.error("Error: ", error);
                }
            },

            //After confirming Slot, now Supervisor will assign that reserved slot to vendor...Here You can change the details like name, Number, etc... 
            //From Reserved Slots Table...
            onAssignConfirmReserveSlot: async function () {
                debugger
                var oSelected = this.byId("idReservedslotsTable").getSelectedItem();

                if (oSelected) {
                    var oID = oSelected.getBindingContext().getObject().Id
                    var oReservedSlot = oSelected.getBindingContext().getObject().Slotnumber
                    var oDriverName = oSelected.getBindingContext().getObject().Drivername
                    var oDriverNumber = oSelected.getBindingContext().getObject().Drivernumber
                    var oVehicleType = oSelected.getBindingContext().getObject().Vehicletype
                    var oVehicleNumebr = oSelected.getBindingContext().getObject().Vehiclenumber
                    var oServiceType = oSelected.getBindingContext().getObject().Servicetype

                    const oConfirmReservedSlotModel = new JSONModel({
                        Slotnumber: oReservedSlot,
                        Drivername: oDriverName,
                        Drivernumber: oDriverNumber,
                        Vehicletype: oVehicleType,
                        Vehiclenumber: oVehicleNumebr,
                        Servicetype: oServiceType
                    });
                    this.getView().setModel(oConfirmReservedSlotModel, "oConfirmReservedSlotModel");
                    if (!this.onAssignReserveSlotConfirmDialog) {
                        this.onAssignReserveSlotConfirmDialog = await this.loadFragment("ReservedSlotAssignment")
                    }
                    this.onAssignReserveSlotConfirmDialog.open();
                } else {
                    MessageToast.show("Please Select a Reserved slot to confirm for the Assignment..!")
                }
            },

            /** After Getting the Reserved Slot Data, Before assign the slot pls check the details, here u can change(here slot can't changed.!).
            press on the Assign buttin the slot will trigger at Allocated slots and slot status will be Changed... */
            //"ASSIGN Btn" from Reserved Slots(in Pop-up)
            onReserveSlotConfirmAssignBtnPress: async function () {
                debugger;
                try {
                    const oView = this.getView();
                    const oSelectedItem = oView.byId("idReservedslotsTable").getSelectedItem();
                    if (!oSelectedItem) {
                        sap.m.MessageToast.show("Please select a reserved slot to confirm assignment.");
                        return;
                    }

                    const oSelectedData = oSelectedItem.getBindingContext().getObject();

                    const oDriverName = this.byId("idDriverNameInput").getValue();
                    const oDriverNumber = this.byId("idMobileNumberInput").getValue();
                    const oVehicleType = this.byId("idVehTypeInput").getValue();
                    const oVehicleNumber = this.byId("idVehNumberInput").getValue();
                    const oServiceType = this.byId("idServiceTypeForVendor").getValue();
                    const oSlotNumber = this.byId("idReservedSlotInput").getValue();

                    const oThis = this;
                    const oModel = oView.getModel();
                    var sUUID = this.generateUUID();
                    var FinalDate = new Date();

                    // Format the date and time
                    var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                    var formattedDate = FinalDate.toLocaleString('en-US', options);

                    // Validation: Check if all fields are filled
                    if (!oDriverName || !oDriverNumber || !oVehicleType || !oVehicleNumber || !oServiceType || !oSlotNumber) {
                        sap.m.MessageBox.error("All fields are required.");
                        return;
                    }

                    // Validation: Check if driver name contains at least 4 letters
                    if (oDriverName.length < 4) {
                        this.byId("idDriverNameInput").setValueState("Error");
                        this.byId("idDriverNameInput").setValueStateText("Driver name should contain at least 4 letters.");
                        return;
                    } else {
                        this.byId("idDriverNameInput").setValueState("None");
                    }

                    // Validation: Check if mobile number follows the format and uniqueness
                    const mobileNumberPattern = /^[0-9]{10}$/;
                    if (!mobileNumberPattern.test(oDriverNumber)) {
                        this.byId("idMobileNumberInput").setValueState("Error");
                        this.byId("idMobileNumberInput").setValueStateText("Mobile Number should contain 10 digits.");
                        return;
                    }

                    // Validation: Check if vehicle number follows the format
                    const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
                    if (!vehicleNumberPattern.test(oVehicleNumber)) {
                        this.byId("idVehNumberInput").setValueState("Error");
                        this.byId("idVehNumberInput").setValueStateText("Vehicle Number should be in the format 'AP00AA0000'.");
                        return;
                    }

                    // Check if Vehicle number already exists in Allocated Slots
                    const allocatedSlotsData = await new Promise((resolve, reject) => {
                        oModel.read("/ZEWM_T_ALDSLOTSSet", {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                reject(oError);
                            }
                        });
                    });

                    const bDriverNumberExists = allocatedSlotsData.some(slot => slot.Drivernumber === oDriverNumber);
                    if (bDriverNumberExists) {
                        sap.m.MessageBox.error("Driver Number already existed.");
                        this.byId("idMobileNumberInput").setValueState("Error");
                        this.byId("idMobileNumberInput").setValueStateText("Mobile Number should be unique.");
                        return;
                    }

                    const bVehicleNumberExists = allocatedSlotsData.some(slot => slot.Vehiclenumber === oVehicleNumber);
                    if (bVehicleNumberExists) {
                        sap.m.MessageBox.error("Vehicle Number already existed.");
                        this.byId("idVehNumberInput").setValueState("Error");
                        this.byId("idVehNumberInput").setValueStateText("Vehicle Number should be in the format 'AP00AA0000'.");
                        return;
                    }

                    // New entry JSON to Allocated Slots
                    const oNewAllocatedSlot = {
                        AssignedslotId: sUUID,
                        Vehicletype: oVehicleType,
                        Vehiclenumber: oVehicleNumber,
                        Drivernumber: oDriverNumber,
                        Drivername: oDriverName,
                        ServiceType: oServiceType,
                        Intime: formattedDate,
                        Slotnumber: oSlotNumber
                    };

                    // Create a new entry in AllocatedSlots
                    await new Promise((resolve, reject) => {
                        debugger
                        oModel.create("/ZEWM_T_ALDSLOTSSet", oNewAllocatedSlot, {
                            success: () => {
                                sap.m.MessageBox.success("Slot Assigned successfully!");
                                oThis.getView().byId("AllocatedSlotsTable").getBinding("items").refresh();
                                resolve();
                            },
                            error: (oError) => {
                                sap.m.MessageBox.error("Failed to assign slot: " + oError.message);
                                reject(oError);
                            }
                        });
                    });

                    // Update the slot status in AllSlots to "Occupied"
                    const sAllSlotsPath = `/ZEWM_T_ALLSLOTSSet?$filter=Slotno eq '${oSelectedData.Slotnumber}'`;
                    const allSlotsData = await new Promise((resolve, reject) => {
                        oModel.read(sAllSlotsPath, {
                            success: (oData) => resolve(oData.results),
                            error: reject
                        });
                    });
                    // Find the specific slot data based on the Slotno
                    const slotData = allSlotsData.find(slot => slot.Slotno === oSelectedData.Slotnumber);
                    const sSlotNumberPath = `/ZEWM_T_ALLSLOTSSet('${slotData.Id}')`;
                    // Prepare the updated slot object
                    const updatedSlot = {
                        Id: slotData.Id,
                        Slotno: slotData.Slotno,
                        Status: "Occupied",
                        Servicetype: slotData.Servicetype // Keep existing ServiceType
                    };
                    await new Promise((resolve, reject) => {
                        oModel.update(sSlotNumberPath, updatedSlot, {
                            success: resolve,
                            error: reject
                        });
                    });
                    sap.m.MessageToast.show("Slot status updated to Available.");

                    //Send SMS to driver Phone...
                    const driverPhoneFull = "+91" + oDriverNumber;
                    const messageBody = `Hello ${oDriverName},\n\nPlease park your vehicle at the following slot:\nSlot Number: ${oSlotNumber} \nVehicle Number: ${oVehicleNumber}\n\nThank you for choosing us.\nBest regards,\nArithcus Global Pvt Ltd.`;

                    const accountSid = 'AC9418cec2d41b4131132454d424d9f90c';
                    const authToken = '574590d23b9133a189d20f34e94c360d';
                    const fromNumber = '+16187243098';
                    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

                    const payload = {
                        To: driverPhoneFull,
                        From: fromNumber,
                        Body: messageBody
                    };

                    await $.ajax({
                        url: url,
                        type: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken)
                        },
                        data: payload,
                        success: function (data) {
                            console.log('SMS sent successfully:', data);
                            sap.m.MessageToast.show('SMS sent successfully to the driver.');
                        },
                        error: function (xhr, status, error) {
                            console.error('Error sending SMS:', error);
                            sap.m.MessageToast.show('Failed to send SMS: ' + error);
                        }
                    });

                    // Remove the reserved slot entry after confirming assignment
                    const sReservedSlotPath = oSelectedItem.getBindingContext().getPath();
                    debugger
                    await new Promise((resolve, reject) => {
                        oModel.remove(sReservedSlotPath, {
                            success: () => {
                                sap.m.MessageToast.show("Reserved slot entry removed successfully.");
                                oThis.getView().byId("idReservedslotsTable").getBinding("items").refresh();
                                resolve();
                            },
                            error: (oError) => {
                                sap.m.MessageBox.error("Failed to remove reserved slot entry: " + oError.message);
                                reject(oError);
                            }
                        });
                    });
                    // Print Assignment Details
                    this.printAssignmentDetailsFromReservedSlots(oSelectedData);
                    this.getView().byId("idparkingLotSelect").getBinding("items").refresh();
                    this.onSlotcountReservedSlotsTable();
                    this.onSlotcountAllocatedSlotsTable();
                    this.onSlotcountAvailableSlots();
                    this.onSlotcountOccupiedSlots();
                    this.onSlotcountReservedSlots();
                    // Close the dialog
                    this.onAssignReserveSlotConfirmDialog.close();
                } catch (error) {
                    sap.m.MessageBox.error("An error occurred: " + error.message);
                    console.error("Error: ", error);
                }
            },

            //UnAssigning the slot for the vehicle by using Barcode as Vehicle Number..
            onScanSuccess: async function (oEvent) {
                debugger;
                if (oEvent.getParameter("cancelled")) {
                    MessageToast.show("Scan cancelled", { duration: 1000 });
                } else {
                    var VehicleNumber = oEvent.getParameter("text");
                    var sVehicleNumber = VehicleNumber.split(':').pop().trim();
                    var sUUID = this.generateUUID();
                    var FinalDate = new Date();

                    // Format the date and time
                    var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                    var formattedDate = FinalDate.toLocaleString('en-US', options);

                    if (sVehicleNumber) {
                        var oModel = this.getView().getModel();
                        var oThis = this;

                        try {
                            // Step 1: Fetch all allocated slots
                            const allocatedSlotsData = await new Promise((resolve, reject) => {
                                oModel.read("/ZEWM_T_ALDSLOTSSet", {
                                    success: function (oData) {
                                        resolve(oData.results);
                                    },
                                    error: function (oError) {
                                        reject(oError);
                                    }
                                });
                            });

                            // Step 2: Find the particular slot details by vehicle number
                            var allocatedSlotData = allocatedSlotsData.find(slot => slot.Vehiclenumber === sVehicleNumber);

                            // Step 3: Confirm unassign action
                            MessageBox.warning(
                                `Are you sure you want to unassign Slot '${allocatedSlotData.Slotnumber}' for the Vehicle Number '${sVehicleNumber}'?.`,
                                {
                                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                                    onClose: async function (sAction) {
                                        if (sAction === MessageBox.Action.YES) {
                                            try {
                                                // Step 4: Add entry to the History table
                                                const oHistoryPayload = {
                                                    Id: sUUID,
                                                    Slotnumber: allocatedSlotData.Slotnumber,
                                                    Servicetype: allocatedSlotData.ServiceType,
                                                    Vehicletype: allocatedSlotData.Vehicletype,
                                                    Vehiclenumber: allocatedSlotData.Vehiclenumber,
                                                    Drivername: allocatedSlotData.Drivername,
                                                    Drivernumber: allocatedSlotData.Drivernumber,
                                                    Intime: allocatedSlotData.Intime,
                                                    Outtime: formattedDate
                                                };
                                                await new Promise((resolve, reject) => {
                                                    oModel.create("/ZEWM_T_HISTORYSet", oHistoryPayload, {
                                                        success: resolve,
                                                        error: reject
                                                    });
                                                });

                                                // Step 5: Update the slot status in AllSlots to 'Available'
                                                const sAllSlotsPath = `/ZEWM_T_ALLSLOTSSet?$filter=Slotno eq '${allocatedSlotData.Slotnumber}'`;
                                                const allSlotsData = await new Promise((resolve, reject) => {
                                                    oModel.read(sAllSlotsPath, {
                                                        success: (oData) => resolve(oData.results),
                                                        error: reject
                                                    });
                                                });

                                                // Find the specific slot data based on the Slotno
                                                const slotData = allSlotsData.find(slot => slot.Slotno === allocatedSlotData.Slotnumber);
                                                const sSlotNumberPath = `/ZEWM_T_ALLSLOTSSet('${slotData.Id}')`;

                                                // Prepare the updated slot object
                                                const updatedSlot = {
                                                    Id: slotData.Id,
                                                    Slotno: slotData.Slotno,
                                                    Status: "Available",
                                                    Servicetype: slotData.Servicetype // Keep existing ServiceType
                                                };
                                                await new Promise((resolve, reject) => {
                                                    oModel.update(sSlotNumberPath, updatedSlot, {
                                                        success: resolve,
                                                        error: reject
                                                    });
                                                });
                                                sap.m.MessageToast.show("Slot status updated to Available.");

                                                // Step 6: Delete the Slot details in Allocated Slots table
                                                const sAllocatedSlotPath = `/ZEWM_T_ALDSLOTSSet('${allocatedSlotData.AssignedslotId}')`;
                                                await new Promise((resolve, reject) => {
                                                    oModel.remove(sAllocatedSlotPath, {
                                                        success: resolve,
                                                        error: reject
                                                    });
                                                });

                                                MessageBox.success("Slot unassigned successfully. Please check the history.");
                                                oThis.onSlotcountHistoryTable();
                                                oThis.onSlotcountAllocatedSlotsTable();

                                                // Step 7: Refresh the relevant tables
                                                oThis.getView().byId("AllocatedSlotsTable").getBinding("items").refresh();
                                                oThis.getView().byId("idHistoryTable").getBinding("items").refresh();
                                                oThis.getView().byId("allSlotsTable").getBinding("items").refresh();
                                                oThis.getView().byId("idparkingLotSelect").getBinding("items").refresh();

                                            } catch (error) {
                                                MessageBox.error("Failed to unassign slot or add to history.");
                                                console.error("Error: ", error);
                                            }
                                        }
                                    }
                                }
                            );
                        } catch (error) {
                            MessageBox.error("Error finding allocated slot: " + error.message);
                        }
                    }
                }
            },

            //for closing Opened Dialog in Reserved Slots table...
            onCloseReserveSlotConfirm: function () {
                if (this.onAssignReserveSlotConfirmDialog) {
                    this.onAssignReserveSlotConfirmDialog.close();
                }
            },

            //for closing Opened Dialog in Reservations Table...
            onCloseReserveSlotDialog: function () {
                if (this.onRequestConfirmSlotDialog) {
                    this.onRequestConfirmSlotDialog.close();
                }
            },

            //Notifications from Vendor reservation slot details...
            onNotificationPress: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = this.loadFragment("ReservationsNotify").then(function (oPopover) {
                        oView.addDependent(oPopover);
                        oPopover.bindElement("");
                        return oPopover;
                    });
                }
                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            _updateNotificationCount: function () {
                var oModel = this.getView().getModel();
                var that = this;

                // Fetch a limited number of entities from NotifySet
                oModel.read("/ZEWM_T_RESERVSSet", {
                    urlParameters: {
                        "$top": 1 // Fetch a small number of records
                    },
                    success: function (oData) {
                        // Count the number of fetched records
                        var count = oData.results.length;
                        // Update the BadgeCustomData value
                        var oBadge = that.byId("idBadge");
                        if (oBadge) {
                            oBadge.setValue(count.toString());
                        }
                    },
                    error: function (oError) {
                        // Handle error scenario
                        console.error("Error fetching NotifySet data: ", oError);
                    }
                });
            },

        });
    });
