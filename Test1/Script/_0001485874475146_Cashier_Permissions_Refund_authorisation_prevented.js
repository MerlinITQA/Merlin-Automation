//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory 
//USEUNIT PlaceReservationOrder

function _0001485874475146_Cashier_Permissions_Refund_authorisation_prevented()
{  
try{
    Log.AppendFolder("_0001485874475146_Cashier_Permissions_Refund_authorisation_prevented");
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
    enterResonaOnConfirmationRefundCashier();   
    aqUtils.Delay(5000);
    if( alertErrorWnd.Visible && buttonOkOnError.Visible){
        Log.Message("Message is displayed confirming the user is not authorised to refund the transaction.");
        buttonOkOnError.Click();
        refundReservationClosebutton.Click();
        aqUtils.Delay(2000);
        temp = cnf_orderDetailsTotal.Caption;
        var totalAmt= (temp.split('$')[1]).trim();
        if( totalAmt != OrderInfo.prototype.OrderTotalAmount){
          
          merlinLogError("The order details are not matching.");
        }        
    }    
    else{
      merlinLogError("Message is not displayed confirming the user is not authorised to refund the transaction.");
    }    
    AppLoginLogout.logout();  
   } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    }
}