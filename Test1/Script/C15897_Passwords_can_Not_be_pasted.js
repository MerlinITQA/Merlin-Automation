//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory 
//USEUNIT PlaceReservationOrder
function C15897_Passwords_can_not_be_pasted()
{ 
//  var testCaseId = 42851;
  try { 
   Log.AppendFolder("C15897_Passwords_can_not_be_pasted");  
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    placeOrder("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash");  
    var oid = OrderInfo.prototype.OrderID ; 
    AppLoginLogout.logout();
      
      AppLoginLogout.loginCashier();  
      SelectDirectory.selectDirectory(Directory_OrderHistory);
      clickSpecificViewOrder(OrderInfo.prototype.OrderID);//OrderInfo.prototype.OrderID
      aqUtils.Delay(2000);
      Refund_Button.Click();
     // enterResonaOnConfirmationRefundCashier(); 
      WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");   
      var p, Edit;
      WshShell.Run("notepad.exe", SW_SHOWNORMAL);
 
      p = Sys.Process("NOTEPAD");
      Edit = p.Window("Notepad").Window("Edit");
      Edit.Keys("myPassword");
      Edit.Keys("^a");
      Edit.Keys("^c");
      Edit.ClickR(-1,-1,0);  
      Edit.PopupMenu.Click("Copy");
      aqUtils.Delay(1000);
        var np=Sys.WaitProcess("notepad");      
         if (np.Exists){
            np.Terminate();       
         }
         aqUtils.Delay(2000);
       refundReservationConfPassword.Click();
       refundReservationConfPassword.ClickR(-1,-1,0);
       aqUtils.Delay(200);
       wnd.PopupMenu.Click("Paste");
    aqUtils.Delay(1000);
    var passValue = refundReservationConfPassword.Caption;
    refundReservationClosebutton.Click();
    if(passValue == ""){
      Log.Message("password canNot be pasted into the Password field.");
    }else{
    merlinLogError("password can be pasted into the Password field");
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
