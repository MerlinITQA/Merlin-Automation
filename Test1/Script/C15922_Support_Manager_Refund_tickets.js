//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
 
//USEUNIT SelectDirectory 
//USEUNIT PlaceReservationOrder
 
function C15922_Support_Manager_Refund_tickets()
{ 
//  var testCaseId = 42853;
  try{
       Log.AppendFolder("C15922_Support_Manager_Refund_tickets");
       InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
       placeOrder("Daily Admission","Open Dated","Children (Ages 3-12)",1,CommonCalender.getTodaysDate(),"Cash");
        
        WrapperFunction.selectMainMenu(SupportManger_MainMenu);
        //loginSupportManger();     
		    aqUtils.Delay(15000);
        setTextBoxValue(newConfirmationSearchtextBox, OrderInfo.prototype.OrderID);
        newPerformSearchButton.Click();
        aqUtils.Delay(2000);
        RefundMenu.Click()
        RefundSubmenuRefundOrder.Click();
        aqUtils.Delay(200);
       // PartialRefundCheckbox.Click();   removed
        smSelectAllUnusedTicketsbtn.Click();
        //ChangeButton.Click();             removed
        smRefundChangebtn.Click();
       // Refund_buttonOk.Click();        removed
       smPartialRefundCnfOKbtn.Click();
        aqUtils.Delay(2000);
        if(ErrorMessageButtonOk.Exists)
        {
            Button.clickOnButton(ErrorMessageButtonOk);
        }        
        selectDirectory(Directory_OrderHistory);
        clickSpecificViewOrder(OrderInfo.prototype.OrderID);
        aqUtils.Delay(2000);
        
          if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
             Log.Message("Cash Lift pop up alert is displayed.")
             Button.clickOnButton(cashLiftPopupClosebutton);
         }
        AppLoginLogout.logout();
         
      } catch (e) {
    	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
    	    return;
        }
    finally { 
	    Log.PopLogFolder();
//      ApplicationOpen.updateInTestRail(testCaseId);
//	    Log.PopLogFolder();
    }
}
 