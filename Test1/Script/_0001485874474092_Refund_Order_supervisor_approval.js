//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory 
//USEUNIT PlaceReservationOrder

function _0001485874474092_Refund_Order_supervisor_approval()
{  
try{
    Log.AppendFolder("_0001485874474092_Refund_Order_supervisor_approval");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    placeOrder("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash");  
    var oid = OrderInfo.prototype.OrderID ; 
    AppLoginLogout.logout();
    AppLoginLogout.loginCashier();  
    SelectDirectory.selectDirectory(Directory_OrderHistory);
    clickSpecificViewOrder(OrderInfo.prototype.OrderID);//OrderInfo.prototype.OrderID
    aqUtils.Delay(1000);
    Refund_Button.Click();
    enterResonaOnConfirmationCancelARefundwnd();   
    aqUtils.Delay(5000);
    temp = cnf_orderDetailsTotal.Caption;
    var cnfTotal = parseInt((temp.split('$')[1]).trim());
     if(cnfTotal == 0){
      Log.Message("The refund is processed correctly.");
    }
    else{
      merlinLogError("The refund is not processed correctly.");
    }    
  
  AppLoginLogout.logout();  
   } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      }  
}