//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory 
//USEUNIT PlaceReservationOrder
function C43108_Confirmation_screen()
{
  try {   
      Log.AppendFolder("C43108_Confirmation_screen");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
  
      SelectDirectory.selectDirectory(Directory_OrderHistory);
      
      var firstOrderID = 0;
      var secondOrderId =0;
      var cnt = Orderlist.Child(i).HGroup(0).Group(0).ChildCount;
        for(var j = 0; j< cnt;j++){
          orderData = Orderlist.Child(0).HGroup(0).Group(0).Child(j);
          getOrderID = orderData.Caption;
          if(orderData.Visible &&(getOrderID.startsWith("Reservation ID") || getOrderID.startsWith("Order ID"))){
                  firstOrderID =  (getOrderID.split(':')[1]).trim();        
                  Orderlist.Child(0).HGroup(0).SelectableButton("viewOrderButton").Click();               
                  Log.Message("View Order button is clicked");                    
                    break;
          }
         }
      aqUtils.Delay(2000);
      if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
           Log.Message("Cash Lift pop up alert is displayed.")
           Button.clickOnButton(cashLiftPopupClosebutton);
      }
       
       
      var orderIdOnConfirmationPage = cnf_orderID1.Caption;
      orderIdOnConfirmationPage = (orderIdOnConfirmationPage.split('#')[1]).trim();
      if (orderIdOnConfirmationPage == firstOrderID){
        Log.Message("Correct Order id is displayed on confirmation page.");
      }else{
        merlinLogError("Confirmation page Order id is not matching.");
      }
      
      SelectDirectory.selectDirectory(Directory_OrderHistory); 
      flag = true;
      for(var i=Orderlist.ChildCount-1;i>=0 ,flag ; i--)
      { 
        var cnt = Orderlist.Child(i).HGroup(0).Group(0).ChildCount;
        for(var j = 0; j< cnt;j++){
          orderData = Orderlist.Child(i).HGroup(0).Group(0).Child(j);
          getOrderID = orderData.Caption;
           if((getOrderID.startsWith("Reservation ID") || getOrderID.startsWith("Order ID")) && orderData.Visible ){
              temp =(getOrderID.split(':')[1]).trim(); 
              if(temp != firstOrderID){
                      secondOrderId =  temp;       
                      Orderlist.Child(i).HGroup(0).SelectableButton("viewOrderButton").Click();
                      flag = false;
                      break;
              }
          }
         }
      }
      aqUtils.Delay(5000);
      if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
           Log.Message("Cash Lift pop up alert is displayed.")
           Button.clickOnButton(cashLiftPopupClosebutton);
       }
      
       if(getOrderID.startsWith("Reservation ID")){
          orderIdOnConfirmationPage = cnf_orderID.Caption;
        }else{
          orderIdOnConfirmationPage = cnf_orderID1.Caption;
        }
      orderIdOnConfirmationPage = (orderIdOnConfirmationPage.split('#')[1]).trim();
      if (orderIdOnConfirmationPage == secondOrderId){
        Log.Message("Correct Order id is displayed on confirmation page.");
      }else{
        merlinLogError("Confirmation page Order id is not matching.");
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
