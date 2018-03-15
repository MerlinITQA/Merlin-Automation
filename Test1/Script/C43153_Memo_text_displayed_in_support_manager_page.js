//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT SupportManagerFunctions

function C43153_Memo_text_displayed_in_support_manager_page()
{
try {
    Log.AppendFolder("C43153_Memo_text_displayed_in_support_manager_page");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Reservations";
    var packageNm ="Minimum Payment Required Reservation 1"; 
    var subPakNm ="Individual";
    var textForMemoField = "This is Memo Test Field it contains more than fifty characters to test functionality of memo text more than fifty characters.";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
    
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
    finilizeOrder();
     aqUtils.Delay(3000);
    var temp =orderDetailsTotal.Caption;
    var firstOrderTotal = parseInt((temp.split('$')[1]).trim()); 
    
    aqUtils.Delay(3000);
    clickConvertToReservation();
    aqUtils.Delay(4000);
    
      WrapperFunction.setTextValue(textareaOrdermemo,textForMemoField);
      aqUtils.Delay(1000);
      ReservationOrderInfo.prototype.ResTotal = 0;
      ReservationOrderInfo.prototype.ResID = 0;
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;
      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
      ReservationOrderInfo.prototype.ResTotal = paymentTypeBal;
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        // aqUtils.Delay(2000);
        Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
	  verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
      var orderId = cnf_orderID.Caption;
      if (orderId == null){
        merlinLogError("Order id is not present");
      } 
      var reservationOrderID= (orderId.split('#')[1]).trim();
      ReservationOrderInfo.prototype.ResID = reservationOrderID;
      Log.Message("Reservation id is set:"+reservationOrderID);  
      
      
      OrderID = ReservationOrderInfo.prototype.ResID;
      selectSupportManagerFromMainMenu(); 
      aqUtils.Delay(10000);          
      searchSpecificOrderInSM(OrderID);  
      selectsubTabSM(tabReservationDetails); 
      if(VerifyCheckProperty.compareStringObj(memotextSupportManagerResDetails.Caption,textForMemoField)){
        Log.Message("Memo text is present in support manager Reservation detail page.");
      }else{
      merlinLogError("Memo text is present not displayed on support manager Reservation detail page.")
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