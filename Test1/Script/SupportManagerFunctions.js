//USEUNIT ApplicationOpen
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
/**
 * @author mnpatil
*/

/** @function
@name SupportManagerFunctions.selectSupportManagerFromMainMenu
@description Select SupportManager Tab from main menu.
*/
function selectSupportManagerFromMainMenu()
{
  try {
      	Log.AppendFolder("SupportManagerFunctions.selectSupportManagerFromMainMenu");
         Button.clickOnButton(homeButton);
         aqUtils.Delay(3000);
         Label.clickOnLabel(SupportManger_MainMenu);
    } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}

/** @function
@name SupportManagerFunctions.selectSupportManagerFromMainMenu
@description Search record form orderId.
@param {Object} placedOrderNumber is order number.
*/   
function searchSpecificOrderInSM(placedOrderNumber)
{
      aqUtils.Delay(5000);
      newConfirmationSearchtextBox.Click();
      var var1 = newConfirmationSearchtextBox.Caption; 
      var var2 = var1.length; 
      for (i = 0; i < var2; i++){ 
      newConfirmationSearchtextBox.Keys("[BS]");
      } 
   WrapperFunction.setTextValue(newConfirmationSearchtextBox,placedOrderNumber);
   Button.clickOnButton(newPerformSearchButton);
   aqUtils.Delay(5000);
   if(!smOrderSearchTabBar.Exists){
      merlinLogError("Given Order details Tab is not displayed.")
   }
}
/** @function
@name SupportManagerFunctions.selectsubTabSM
@description Search record form orderId.
@param {Object} tabName is tab name.
*/   
function selectsubTabSM(tabName)
{    
   Button.clickOnButton(tabName);     
}

/** @function
@name SupportManagerFunctions.checkOrderInfoSupportManager
@description Search record form orderId.
@param {Object} orderNumber is order number.
@param {Object} qty is ticket numbers.
*/ 
function checkOrderInfoSupportManager(orderNumber,qty){
  aqUtils.Delay(2000);
 if(orderNumber != null){
       if(newOrdersearchpanelOrderSearch.Exists){
        if(!newOrdersearchpanelOrderSearch.Visible){ 
  		  Button.clickOnButton(smOrdersearchbutton);
        aqUtils.Delay(2000);
       }
     }else{
       Button.clickOnButton(smOrdersearchbutton);
       aqUtils.Delay(2000);
     }
     searchSpecificOrderInSM(orderNumber);     
     selectsubTabSM(tabTicketDetails); 
     aqUtils.Delay(2000);
	if(!smDatagridTicketdetails.wColumnCount == qty ){
		merlinLogError("Ticket quantity is not matching.");
	} 
  if(!smConfirmationOrderNumber.Caption == orderNumber){
        merlinLogError("Order Id is not correct.");
      }
  }else{
       merlinLogError("Unable to get order number.");
  }   
}