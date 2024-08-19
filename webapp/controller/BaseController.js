sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
  ],
  function (BaseController, Fragment, Sorter, Filter, FilterOperator, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("com.app.parkinglotodatasys.controller.BaseController", {
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },
      loadFragment: async function (sFragmentName) {
        const oFragment = await Fragment.load({
          id: this.getView().getId(),
          name: `com.app.parkinglotodatasys.fragments.${sFragmentName}`,
          controller: this
        });
        this.getView().addDependent(oFragment);
        return oFragment
      },

      createData: function (oModel, oPayload, sPath) {
        return new Promise(function (resolve, reject) {
          oModel.create(sPath, oPayload, {
            refreshAfterChange: true,
            success: function () {
              resolve();
            },
            error: function (oError) {
              reject(oError);
            }
          });
        });
      },
      //Status Colour...
      statusColorFormatter: function (sStatus) {
        switch (sStatus) {
          case "Occupied":
            return "Error"; // Red
          case "Available":
            return "Success"; // Green
          case "Reserved":
            return "Warning"; // Orange
          default:
            return "None"; // Default color
        }
      },

      //Sorting in AllSlots Table...
      onSortingAllSlotsTable: function () {
        this.byId("allSlotsTable").getBinding("items").sort(new sap.ui.model.Sorter("Slotno", false));
        MessageToast.show("Slot Numbers Sorted!")

      },
      //Sorting in AllSlots Table...
      onSortingHistoryTable: function () {
        this.byId("idHistoryTable").getBinding("items").sort(new sap.ui.model.Sorter("Slotnumber", false));
        MessageToast.show("Slot Numbers Sorted!")

      },
      //Sorting in Reserved Slots Table...
      onSortingReservedSlotsTable: function () {
        this.byId("idReservedslotsTable").getBinding("items").sort(new sap.ui.model.Sorter("Slotnumber", false));
        MessageToast.show("Slot Numbers Sorted!")
      },
      //Sorting in Allocated Slots Table...
      onSortBtnAllocatedSlots: function () {
        var oTable = this.byId("AllocatedSlotsTable");
        var oBinding = oTable.getBinding("items");
        var oSorter = new Sorter("Slotnumber", false); // 'false' for ascending, 'true' for descending..
        // Apply the sorter to the binding..
        oBinding.sort(oSorter);
        MessageToast.show("Slot Numbers Sorted!")
      },

      //Refresh Btn in AllSlots Table
      onRefreshBtnPress: function () {
        var oTable = this.getView().byId("allSlotsTable");
        var oBinding = oTable.getBinding("items");
        var oComboBox = this.getView().byId("idComboAllslots");
        // Clear the selection in the ComboBox
        oComboBox.setSelectedKey(null);
        // Clear the filter on the table binding to show all items
        oBinding.filter([]);
        //Refresh the Table...
        this.getView().byId("allSlotsTable").getBinding("items").refresh();
        MessageToast.show("All Slots table Refreshed!");
      },
      //Refresh Btn in AllocatedSlots Table
      onRefresAllocated: function () {
        var oTable = this.getView().byId("AllocatedSlotsTable");
        var oBinding = oTable.getBinding("items");
        oBinding.filter([]);
        oBinding.refresh();
        MessageToast.show("Allocated Slots table Refreshed!")
      },
      //Refresh Btn in Reservations Table
      onRefreshReservations: function () {
        this.getView().byId("idReservationsTable").getBinding("items").filter([]);
        this.getView().byId("idReservationsTable").getBinding("items").refresh();
        MessageToast.show("Reservations table Refreshed!")
      },
      //Refresh Btn in History Table
      onRefreshBtnTotalHistoryTable: function () {
        var oTable = this.getView().byId("idHistoryTable");
        var oBinding = oTable.getBinding("items");
        oBinding.filter([]);
        oBinding.refresh();
        sap.m.MessageToast.show("History table refreshed!");
      },


      //Based on Service Type Available Slots will be Adjusted...(in root1 "change" property used)
      onServiceTypeChange: function (oEvent) {
        // Get the selected service type from the dropdown
        var sServiceType = oEvent.getSource().getSelectedKey();

        // Get the reference to the slots dropdown (Combobox)
        var oSlotsComboBox = this.getView().byId("idparkingLotSelect");

        // Create filters based on selected service type and available status
        var aFilters = [
          new sap.ui.model.Filter("Servicetype", sap.ui.model.FilterOperator.EQ, sServiceType),
          new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, "Available")
        ];

        // Apply the filters to the items aggregation of the slots dropdown
        oSlotsComboBox.bindAggregation("items", {
          path: "/ZEWM_T_ALLSLOTSSet",
          template: new sap.ui.core.Item({
            key: "{Id}",
            text: "{Slotno}"
          }),
          filters: aFilters
        });
      },

      //Filter By Status and Service Type...(AllSlots Table)
      onFilterButtonPress: function () {
        var oComboBox = this.byId("idComboAllslots");
        var bVisible = oComboBox.getVisible();
        oComboBox.setVisible(!bVisible);
      },
      onFilterStatusChange: function (oEvent) {
        var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
        //console.log("Selected Key: ", sSelectedKey); // Debugging Line

        var oTable = this.byId("allSlotsTable");
        var oBinding = oTable.getBinding("items");

        var aFilters = [];
        if (sSelectedKey === "Available" || sSelectedKey === "Occupied" || sSelectedKey === "Reserved") {
          aFilters.push(new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, sSelectedKey));
        } else if (sSelectedKey === "InBound" || sSelectedKey === "OutBound") {
          aFilters.push(new sap.ui.model.Filter("Servicetype", sap.ui.model.FilterOperator.EQ, sSelectedKey));
        }

        console.log("Filters: ", aFilters); // Debugging Line
        oBinding.filter(aFilters);
      },


      //Refresh Btn from Chart Data Visualization...
      onRefreshDataVisualizationChart: async function () {
        try {
          // Get the view and model
          const oView = this.getView();
          const oModel = oView.getModel();

          // Define the path to fetch all slot data
          const sPath = "/ZEWM_T_ALLSLOTSSet";

          // Read the updated data from the AllSlots table
          const oData = await new Promise((resolve, reject) => {
            oModel.read(sPath, {
              success: (oData) => resolve(oData.results),
              error: reject
            });
          });

          // Process the data to match the structure expected by the VizFrame
          const oProcessedData = this.processSlotData(oData);

          // Update the ParkingLotModel with new data
          const oParkingLotModel = oView.getModel("ParkingLotModel");
          oParkingLotModel.setData({
            Items: oProcessedData
          });
          // Refresh the VizFrame binding
          const oVizFrame = oView.byId("idbarchart");
          oVizFrame.getDataset().getBinding("data").refresh(true);
          MessageBox.success("Data visualization refreshed successfully!");

        } catch (error) {
          sap.m.MessageBox.error("Failed to refresh data visualization: " + error.message);
          console.error("Error: ", error);
        }
      },
      // Process the data to match the structure expected by the VizFrame
      processSlotData: function (aData) {
        // Transform the data as needed for your chart
        // Example: Calculate counts for each status
        const aProcessedData = [
          { Status: 'Available', Count: 0 },
          { Status: 'Occupied', Count: 0 },
          { Status: 'Reserved', Count: 0 }
        ];
        aData.forEach(slot => {
          if (slot.Status === 'Available') aProcessedData[0].Count++;
          if (slot.Status === 'Occupied') aProcessedData[1].Count++;
          if (slot.Status === 'Reserved') aProcessedData[2].Count++;
        });
        return aProcessedData;
      },

      //Generating the QR code and Table Content...(Call Back function)
      printAssignmentDetails: function () {
        debugger
        // Fetch values from the view
        var currentDateTime = new Date();
        var formattedDate = currentDateTime.toLocaleDateString();
        var formattedTime = currentDateTime.toLocaleTimeString();
        var sSlotNumber = this.byId("idparkingLotSelect")._getSelectedItemText();
        var sVehicleNumber = this.byId("idvehicleNumber").getValue();
        var sVehicleType = this.byId("idvehicleType").getValue();
        var sDriverNumber = this.byId("iddriverNumber").getValue();
        var sDriverName = this.byId("iddriverName").getValue();
        var sServiceType = this.byId("idTypeOfDelivery").getSelectedKey();

        // Create a new window for printing
        var printWindow = window.open('', '', 'height=600,width=800');

        // Write HTML content to the print window
        printWindow.document.write('<html><head><title>Print Receipt</title>');
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
        printWindow.document.write('.details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }');
        printWindow.document.write('.details-table th, .details-table td { border: 1px solid #000; padding: 8px; text-align: left; }');
        printWindow.document.write('.details-table th { background-color: #f2f2f2; }');
        printWindow.document.write('.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }');
        printWindow.document.write('.date-time { flex-grow: 1; }');
        printWindow.document.write('.qr-code { margin-right: 50px; }');
        printWindow.document.write('.truck-image { text-align: center; margin-top: 20px; }');
        printWindow.document.write('.logo { position: absolute; top: 20px; right: 20px; }');
        printWindow.document.write('.Dummy { padding:1rem; }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');

        // Add the logo to the top right corner
        printWindow.document.write('<div class="logo">');
        printWindow.document.write('<img src="https://artihcus.com/assets/img/AG-logo.png" height="50"/>'); // Reduced size
        printWindow.document.write('</div>');
        printWindow.document.write('<div class="Dummy">');
        printWindow.document.write('<div class="Dummy">');
        printWindow.document.write('</div>');

        printWindow.document.write('<div class="title">');
        printWindow.document.write('<h1>Assigned Parking Slot Details Slip:</h1>');
        printWindow.document.write('</div>');
        printWindow.document.write('<div class="header">');
        printWindow.document.write('<div class="date-time">');
        printWindow.document.write('<p><strong>Date:</strong> ' + formattedDate + '</p>');
        printWindow.document.write('<p><strong>Time:</strong> ' + formattedTime + '</p>');
        printWindow.document.write('</div>');
        printWindow.document.write('<div class="qr-code" id="qrcode"></div>');
        printWindow.document.write('</div>');
        printWindow.document.write('<table class="details-table">');
        printWindow.document.write('<tr><th>Property</th><th>Details</th></tr>');
        printWindow.document.write('<tr><td>Slot Number</td><td>' + sSlotNumber + '</td></tr>');
        printWindow.document.write('<tr><td>Vehicle Number</td><td>' + sVehicleNumber + '</td></tr>');
        printWindow.document.write('<tr><td>Vehicle Type</td><td>' + sVehicleType + '</td></tr>');
        printWindow.document.write('<tr><td>Driver Phone Number</td><td>' + sDriverNumber + '</td></tr>');
        printWindow.document.write('<tr><td>Driver Name</td><td>' + sDriverName + '</td></tr>');
        printWindow.document.write('<tr><td>Delivery Type</td><td>' + sServiceType + '</td></tr>');
        printWindow.document.write('</table>');
        printWindow.document.write('<div class="truck-image">');
        printWindow.document.write('</div>');

        // Close document and initiate QR code generation
        printWindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>');
        printWindow.document.write('<script>');
        printWindow.document.write('setTimeout(function() {');
        printWindow.document.write('new QRCode(document.getElementById("qrcode"), {');
        printWindow.document.write('text: "' + sVehicleNumber + '",'); // QR code contains vehicle number
        printWindow.document.write('width: 100,');
        printWindow.document.write('height: 100');
        printWindow.document.write('});');
        printWindow.document.write('}, 1000);'); // Adjust the timeout for QR code rendering
        printWindow.document.write('</script>');

        // Close document
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();

        // Wait for QR code to be fully rendered before printing
        setTimeout(function () {
          printWindow.print();
        }, 1500); // Timeout to ensure the QR code is rendered before printing
      },


    });
  }
);