//USEUNIT ApplicationOpen
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT OrderDetails
//USEUNIT SelectPackageAndSubPackage
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT VerifyCheckProperty
/**
 * @author mnpatil
 */

/** @function
@name SelectGroupFromMainMenu.selectGroupFromMainMenu
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectGroupFromMainMenu(myGroupsName)
{
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectGroupFromMainMenu");
        WrapperFunction.selectMainMenu(Groups_MainMenu); 
        var envName = getTrackerName();         
        try{  
      //if(groupsGride.wRowCount > 0 && ( aqString.Compare(myGroupsName, defaultGroupName, false) ==0 )){ //_m
        if(false){
            groupsGride.scroller.FindChild("Caption",myGroupsName,0,true).Click();
          }else{
            Button.click(groupsClearButton);
            if(envName == "LDCBoston"){
                   Log.Message("LDC Boston");            
                   TextBox.setTextBoxValue(groupsOrganizationNameti,"LDC Boston");
            }
            TextBox.setTextBoxValue(groupsNameti,myGroupsName);
            aqUtils.Delay(1000);  
            Button.click(groupsSerarchButton);
            aqUtils.Delay(3000);    
            groupsGride.scroller.FindChild("Caption",myGroupsName,0,true).Click();
        }
        }catch(e){
              Button.click(groupsClearButton);
              TextBox.setTextBoxValue(groupsNameti,myGroupsName);
              Button.click(groupsSerarchButton);
              aqUtils.Delay(2000);    
              groupsGride.scroller.FindChild("Caption",myGroupsName,0,true).Click();
        }       
        aqUtils.Delay(2000); 
    } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
/** @function
@name SelectGroupFromMainMenu.getTrackerName
@description get config file tracker name.
*/
function getTrackerName(){
try{
var appFolder = TestedApps.Passport_POS.Path;
              var trackerUserName="";
              var fso, folder, myEnum, f,fName; 
              fso = Sys.OleObject("Scripting.FileSystemObject");
              folder = fso.GetFolder(appFolder);
              for (let f of folder.Files)
              {
                      fName=f.Name; 
                      sPath = appFolder + fName; 
                      sFileNm =aqString.Replace(sPath, "\\", "\\\\").trim();
                      sFile = aqString.Replace(sPath, "\\", "").trim();
                      try{
                        var F, s;
                        if (!aqFile.Exists(sFile) &&  fName.includes("config"))
                        {
                          F = aqFile.OpenTextFile(sFileNm, aqFile.faRead, aqFile.ctANSI);
                          aqFile.o
                          F.Cursor = 0; 
                          while(! F.IsEndOfFile()){
                            s = F.ReadLine();
                            if(s.includes("trackerUser=")){
                               trackerUserName = (s.split('=')[1]).trim();
                               trackerUserName = aqString.Replace(trackerUserName,"\"","");
                               return trackerUserName;
                               Log.Message(trackerUserName);
                                break;
                            }
                          }
                          F.Close();
                          }
                        } catch ( e) {
                          merlinLogError("Tracker name is not present in file: ");
                          return "";
                        }
                    }
      } catch ( e) {
             merlinLogError("Unable to get Tracker Name: ");
             return "";
            }
}

/** @function
@name SelectGroupFromMainMenu.selectGroupFromMainMenuWithReservationRecord
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectGroupFromMainMenuWithReservationRecord(myGroupsName)
{ 
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectGroupFromMainMenuWithReservationRecord");
        selectGroupFromMainMenu(myGroupsName);
        selectReservationRecord(groupUpdateDataGridReservation);
        aqUtils.Delay(2000);
        clickLoadReservation();        
        clickConvertToPurchase();
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}

/** @function
@name SelectGroupFromMainMenu.selectGroupFromMainMenuWithOrderedRecord
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectGroupFromMainMenuWithOrderedRecord(myGroupsName)
{ 
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectGroupFromMainMenuWithOrderedRecord");
        selectGroupFromMainMenu(myGroupsName);
        selectOrderReservationRecord(groupUpdateDatagridOrderHistory);    
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}

/** @function
@name SelectGroupFromMainMenu.selectGroupFromMainMenuWithReservationRecord
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectReservationRecordToCancelAndRefund(myGroupsName)
{ 
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectReservationRecordToCancel");
        selectGroupFromMainMenu(myGroupsName);
        aqUtils.Delay(1000);
        selectReservationRecord(groupUpdateDataGridReservation);
        aqUtils.Delay(1000);
        clickCancelAndRefund();
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
/** @function
@name SelectGroupFromMainMenu.selectGroupFromMainMenuWithReservationRecord
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectReservationRecordToCancelReservation(myGroupsName)
{ 
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectReservationRecordToCancel");
        selectGroupFromMainMenu(myGroupsName);
        selectReservationRecord(groupUpdateDataGridReservation);
        aqUtils.Delay(1000);
        clickCancelReservation();
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
/** @function
@name SelectGroupFromMainMenu.selectReservationRecordToPartialRefundReservation
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectReservationRecordToPartialRefundReservation(myGroupsName)
{ 
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectReservationRecordToCancel");
        selectGroupFromMainMenu(myGroupsName);
        selectReservationRecord(groupUpdateDataGridReservation);
        aqUtils.Delay(1000);
        clickPartialRefundReservation();
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
/** @function
@name SelectGroupFromMainMenu.selectReservationRecordToAddReservation
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectReservationRecordToAddReservation(myGroupsName)
{ 
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectReservationRecordToAddReservation");
        selectGroupFromMainMenu(myGroupsName);
        selectReservationRecord(groupUpdateDataGridReservation);
        aqUtils.Delay(2000);
        clickAddReservation();
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}

/** @function
@name SelectGroupFromMainMenu.selectReservationRecordToModifyResDate
@description Assign text box with a new value.
@param {Object} myGroupsName is Group Name.
*/
function selectReservationRecordToModifyResDate(myGroupsName)
{ 
  try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectReservationRecordToAddReservation");
        selectGroupFromMainMenu(myGroupsName);
        selectReservationRecord(groupUpdateDataGridReservation);
         aqUtils.Delay(1000);
        clickModifyReservationDate();
     } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}


/** @function
@name SelectGroupFromMainMenu.clickLoadReservation
@description Click on LoadReservationButton.
*/ 
function clickLoadReservation(){
 Button.click(reservationWndLoadReservation);
 aqUtils.Delay(7000);
}

/** @function
@name SelectGroupFromMainMenu.clickLoadReservation
@description Click on LoadReservationButton.
*/ 
function clickAddReservation(){
 Button.click(reservationWndAddReservation);
}

/** @function
@name SelectGroupFromMainMenu.clickModifyReservationDate
@description Click on LoadReservationButton.
*/ 
function clickModifyReservationDate(){
 Button.click(reservationWndModifyReservationDate);
}

/** @function
@name SelectGroupFromMainMenu.clickLoadReservation
@description Click on LoadReservationButton.
*/ 
function clickOnCancelSelectedTickets(){
 Button.click(reservationWndCancelSelectedTickets);
}

/** @function
@name SelectGroupFromMainMenu.clickCancelAndRefund
@description Click on LoadReservationButton.
*/ 
function clickCancelAndRefund(){
 Button.click(reservationWndCancelRefund);
}

/** @function
@name SelectGroupFromMainMenu.clickCancelReservation
@description Click on LoadReservationButton.
*/ 
function clickCancelReservation(){
 Button.click(reservationWndCancelReservation);  
}

/** @function
@name SelectGroupFromMainMenu.clickPartialRefundReservation
@description Click on LoadReservationButton.
*/ 
function clickPartialRefundReservation(){
 Button.click(reservationWndPartialRefundReservation);
}
/** @function
@name SelectGroupFromMainMenu.clickCancelAndRefundWndOk
@description Click on LoadReservationButton.
*/ 
function clickCancelAndRefundWndOk(){
 Button.click(cancelARefundOk);
}

/** @function
@name SelectGroupFromMainMenu.clickCancelAndRefundWndEditDetails
@description Click on LoadReservationButton.
*/ 
function clickCancelAndRefundWndEditDetails(){
 Button.click(cancelARefundEditDetails);
}

/** @function
@name SelectGroupFromMainMenu.clickConvertToPurchase
@description Click on LoadReservationButton.
*/ 
function clickConvertToPurchase(){
 Button.click(reservationWndConvertToPurchaseButton);
}

/** @function
@name SelectGroupFromMainMenu.clickConvertToReservation
@description Click on LoadReservationButton.
*/ 
function clickConvertToReservation(){
 Button.click(reservationWndConvertToReservationButton);
}

/** @function
@name SelectGroupFromMainMenu.clickBuyTicketsButton
@description Click on LoadReservationButton.
*/ 
function clickBuyTicketsButton(){
  aqUtils.Delay(3000);
  Button.click(groupUpdateBuyTicketsButton);
  aqUtils.Delay(1000);
}
  
/** @function
@name SelectGroupFromMainMenu.selectReservationRecord
@description Assign text box with a new value.
@param {Object} dataGridTable is dataGrid.
*/   
function selectReservationRecord(dataGridTable){
try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectReservationRecord");
        var resOrderID = ReservationOrderInfo.prototype.ResID ;
        if(resOrderID == 0){
          merlinLogError("resOrderId is not set");
        }else{ 
          var cC = dataGridTable.wColumnCount;
          var rC =0;
		     rC = dataGridTable.wRowCount;
		  
          for ( rowC = 0 ; rowC <  rC ; rowC++){
              var orderID = dataGridTable.wValue(rowC ,0);
              if (resOrderID  == orderID){
                  dataGridTable.ClickCell(rowC,0);
                  setReservationRecordDetailsforVerification(dataGridTable,rowC);
                  break; 
              }
          } 
        }
  } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}

/** @function
@name SelectGroupFromMainMenu.selectOrderReservationRecord
@description Assign text box with a new value.
@param {Object} dataGridTable is dataGrid.
*/   
function selectOrderReservationRecord(dataGridTable){  
try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectOrderReservationRecord");
        var resOrderID = OrderInfo.prototype.OrderID;
        if(resOrderID == 0){
        merlinLogError("resOrderId is not set.")
        }else{ 
        var cC = dataGridTable.wColumnCount;
        var rC =0;
	    	rC =  dataGridTable.wRowCount;
        for ( rowC = 0 ; rowC <  rC ; rowC++){
            var orderID = dataGridTable.wValue(rowC ,0);
            if (resOrderID  == orderID){
                dataGridTable.ClickCell(rowC,0);
               // setReservationRecordDetailsforVerification(dataGridTable,rowC);
                break; 
            }
        } 
        }
  } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}

/** @function
@name SelectGroupFromMainMenu.selectGroupFinilizeOrderForReservation
@description select group to finilize order for reservation .
@param {Object} myGroupsName is Group Name.
@param {Object} keyWordName is keyword selection Name.
@param {Object} pakName is package Name.
@param {Object} subPakName is sub package Name.
@param {Object} selDate is date Name.

*/
function selectGroupFinilizeOrderForReservation(myGroupsName,keyWordName,pakName,subPakName,ticketQty,selDate)
{
try {
         Log.AppendFolder("SelectGroupFromMainMenu.selectGroupFinilizeOrderForReservation");
         selectGroupForReservation(myGroupsName,keyWordName,pakName,subPakName,ticketQty,selDate);
         finilizeOrder();
         aqUtils.Delay(3000);
         clickConvertToReservation();
   } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    } 
}

/** @function
@name SelectGroupFromMainMenu.selectGroupForReservation
@description select group to finilize order for reservation .
@param {Object} myGroupsName is Group Name.
@param {Object} keyWordName is keyword selection Name.
@param {Object} pakName is package Name.
@param {Object} subPakName is sub package Name.
@param {Object} selDate is date Name.
*/
function selectGroupForReservation(myGroupsName,keyWordName,pakName,subPakName,ticketQty,selDate){
try {
         Log.AppendFolder("SelectGroupFromMainMenu.selectGroupForReservation");
         selectGroupFromMainMenu(myGroupsName);
         clickBuyTicketsButton();
         WrapperFunction.selectKeywordName(keyWordName);
         selectPackage(pakName,subPakName);
         if(datetimeformSubWindow.Exists){   
          selectDateFromSubWindow(selDate); //mm-dd-yyyy  
          selectNextButtonFromSubWindow();
          aqUtils.Delay(1000);        
          Button.clickOnButton(selectablebuttonClosebutton);
         }  
      
         //selectQuantityFromSubWindow(ticketQty); //  application issue
        // selectSubPackageFromSubWindow(subPakName);    
//         aqUtils.Delay(1000);  
//         selectDateFromSubWindow(selDate); //mm-dd-yyyy
//         //selectAvailableTimeFromSubWindow("11:00 AM");
//         selectNextButtonFromSubWindow(); 
          } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
    }
    finally {
	    Log.PopLogFolder();
    } 
}
function setReservationRecordDetailsforVerification(dataGridTable,rowNumber){
  ReservationOrderInfo.prototype.ResID = dataGridTable.wValue(rowNumber ,0);
  ReservationOrderInfo.prototype.ResDate = dataGridTable.wValue(rowNumber ,1);
  ReservationOrderInfo.prototype.ResParts = dataGridTable.wValue(rowNumber ,2);
  ReservationOrderInfo.prototype.ResTotal = dataGridTable.wValue(rowNumber ,3);
  ReservationOrderInfo.prototype.ResPaid = dataGridTable.wValue(rowNumber ,4);
  ReservationOrderInfo.prototype.ReStatus= dataGridTable.wValue(rowNumber ,5); 
}





/*******************************************************************************/
/** @function
@name SelectGroupFromMainMenu.selectOrderRecord
@description Assign text box with a new value.
@param {Object} dataGridTable is dataGrid.
*/   
function selectOrderRecord(dataGridTable,resOrderID){
try {
      	Log.AppendFolder("SelectGroupFromMainMenu.selectReservationRecord");
        //var orderID = ReservationOrderInfo.prototype.ResID ; 
        var cC = dataGridTable.wColumnCount;
        var rC =0;
		rC =  dataGridTable.wRowCount;
        for ( rowC = 0 ; rowC <  rC ; rowC++){
            var orderID = dataGridTable.wValue(rowC ,0);
            if (resOrderID  == orderID){
                dataGridTable.ClickCell(rowC,0);
                setReservationRecordDetailsforVerification(dataGridTable,rowC);
                break; 
            }
        } 
  } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}

/** @function
@name SelectGroupFromMainMenu.createNewTestGroup
@param {Object} myGroupsName is group name.
@param {Object} externalSysRefCode is external system reference code.
*/ 
function createNewTestGroup(myGroupsName,externalSysRefCode){
 try {
      	Log.AppendFolder("SelectGroupFromMainMenu.createNewTestGroup");
       TextBox.setTextBoxValue(textinputOrgnameti,"Automation");
       TextBox.setTextBoxValue(textinputGroupnameti,myGroupsName); 
       TextBox.setTextBoxValue(textinputGroupphoneti,"987654321");
       TextBox.setTextBoxValue(textinputGroupaddyti,"ABC");
     //  TextBox.setTextBoxValue(textinputGroupcityti,"tCity");
       //textinputGroupcityti.Click();
      
//       dropdownlistStateddl.ClickItem(0,0);
//       countriesdropdownlistHomecountry.ClickItem(0,0);
        aqUtils.Delay(2000);
      // TextBox.setTextBoxValue(textinputGroupzipti,"01923");
       textinputGroupzipti.Keys("01923");
        aqUtils.Delay(2000);
        textinputGroupzipti.Keys("[Enter]");
        aqUtils.Delay(2000);
//       TextBox.setTextBoxValue(textinputGroupcountyti,"tCounty");
//       aqUtils.Delay(500);
       accdropdownlistCategoryddl.ClickItem(0,0); 
       TextBox.setTextBoxValue(textinputGroupidentifierti,externalSysRefCode); 
       createNewGroupTabBar.ClickTab(1);  
       
       TextBox.setTextBoxValue(textinputPrimaryfirstti,myGroupsName);
       TextBox.setTextBoxValue(textinputPrimarylastti,externalSysRefCode+"New");
       TextBox.setTextBoxValue(textinputPrimaryemailti,"Test@Test.com");
       TextBox.setTextBoxValue(textinputPrimaryphoneti,"987654321");
       aqUtils.Delay(1000); 
       saveNewGroup.Click();
        aqUtils.Delay(3000);
        if(wnd.alert0.buttonOk.Exists){
          wnd.alert0.buttonOk.Click();    
       }           
  } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
/** @function
@name SelectGroupFromMainMenu.verifyCreatedNewGroup
@param {Object} myGroupsName is group name.
@param {Object} externalSysRefCode is external system reference code.
*/ 
function verifyCreatedNewGroup(myGroupsName,externalSysRefCode){
 try {
       Log.AppendFolder("SelectGroupFromMainMenu.verifyCreatedNewGroup");
       VerifyCheckProperty.compareStringObj("Automation",textinputOrgnameti.Caption);             
       VerifyCheckProperty.compareStringObj(textinputGroupnameti.Caption,myGroupsName); 
       VerifyCheckProperty.compareStringObj(textinputGroupphoneti.Caption,"987654321");
       VerifyCheckProperty.compareStringObj(textinputGroupaddyti.Caption,"ABC");
       VerifyCheckProperty.compareStringObj(textinputGroupcityti.Caption,"Danvers");
       VerifyCheckProperty.compareStringObj(textinputGroupzipti.Caption,"01923");
       VerifyCheckProperty.compareStringObj(textinputGroupcountyti.Caption,"Essex County");
       VerifyCheckProperty.compareStringObj(textinputGroupidentifierti.Caption,externalSysRefCode); 
       createNewGroupTabBar.ClickTab(1);  
       VerifyCheckProperty.compareStringObj(textinputPrimaryfirstti.Caption,myGroupsName);
       VerifyCheckProperty.compareStringObj(textinputPrimarylastti.Caption,externalSysRefCode+"New");
       VerifyCheckProperty.compareStringObj(textinputPrimaryemailti.Caption,"Test@Test.com");
       VerifyCheckProperty.compareStringObj(textinputPrimaryphoneti.Caption,"987654321"); 
             
  } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
/** @function
@name SelectGroupFromMainMenu.editCreatedGroup
@param {Object} myGroupsName is group name.
@param {Object} externalSysRefCode is external system reference code.
*/ 
function editCreatedGroup(myGroupsName,externalSysRefCode){
 try {
       Log.AppendFolder("SelectGroupFromMainMenu.editCreatedGroup");
        createNewGroupTabBar.ClickTab(0);  
       TextBox.setTextBoxValue(textinputGroupnameti,myGroupsName); 
      // TextBox.setTextBoxValue(textinputGroupidentifierti,externalSysRefCode);
       createNewGroupTabBar.ClickTab(1);  
       TextBox.setTextBoxValue(textinputPrimaryfirstti,myGroupsName);  
       saveNewGroup.Click();
        if(wnd.alert0.buttonOk.Exists){
          wnd.alert0.buttonOk.Click();    
       }           
             
  } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}
