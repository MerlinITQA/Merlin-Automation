//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874472962_Res_Modify_Reduce_tickets_minimum_pay()
{
try{
      Log.AppendFolder("_0001485874472962_Res_Modify_Reduce_tickets_minimum_pay");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Reservations";
    var packageNm ="Minimum Payment Required Reservation 1";
    var packageNm1 ="Minimum Payment Required Reservation 2";
    var subPakNm ="Individual";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
    
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
       aqUtils.Delay(3000);
    var temp =totalOnOrderScreen.Caption;
    var firstOrderTotal = parseInt((temp.split('$')[1]).trim());
  //  Button.clickOnButton(selectablebuttonClosebutton);
    
    addNewTicket(keyWordNm,packageNm1,subPakNm,qtyT,dateD);
       aqUtils.Delay(3000);
    temp =totalOnOrderScreen.Caption;
    var secondOrderTotal = parseInt((temp.split('$')[1]).trim()) - firstOrderTotal;
    finilizeOrder();
    aqUtils.Delay(3000);
    clickConvertToReservation();
    aqUtils.Delay(4000);  
    verifyPrefixGreenColorReservation(packageNm);  
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
    paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
    selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
    paymentTypeBal = parseInt(paymentTypeBal);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
      Button.clickOnButton(applycashrespopupCashPaymentOKButton);
    }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(5000);   
    verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
    //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
    var orderId = cnf_orderID.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var reservationOrderID= (orderId.split('#')[1]).trim();
    ReservationOrderInfo.prototype.ResID = reservationOrderID;
    Log.Message("Reservation id is set:",reservationOrderID);    
    selectGroupFromMainMenu(groupNm);
    selectReservationRecord(groupUpdateDataGridReservation);
    Button.clickOnButton(checkboxReservationOrder);
    clickOnCancelSelectedTickets();
    WrapperFunction.setTextValue(cancelSelectedInputText,"1");
    Button.clickOnButton(cancelSelectedOK);
	  aqUtils.Delay(3000);  
    //examine the reservation details displayed on the ‘Settlement screen’.
    clickLoadReservation();
    temp =orderDetailsTotal.Caption;
    var settlementTotal = parseInt((temp.split('$')[1]).trim());
    if(secondOrderTotal == settlementTotal){
      Log.Message("Order details are correct on settlement page");
    }
    else{
      merlinLogError("Order details are not correct on settlement page");
    }
    SelectDirectory.selectDirectory(Directory_OrderHistory);
    clickSpecificViewOrder(reservationOrderID);
     aqUtils.Delay(5000);  
    temp =confirmationPageTotalREZ.Caption;
    var confirmationTotal = parseInt((temp.split('$')[1]).trim());
    if(secondOrderTotal == confirmationTotal){
      Log.Message("Order details are correct on confirmation page");
    }
    else{
      merlinLogError("Order details are not correct on confirmation page");
    }
     if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
       Log.Message("Cash Lift pop up alert is displayed.")
       Button.clickOnButton(cashLiftPopupClosebutton);
    }
     AppLoginLogout.logout();  
        } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      }  
}