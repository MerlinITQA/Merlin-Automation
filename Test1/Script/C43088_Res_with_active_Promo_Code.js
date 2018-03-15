//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C43088_Res_with_active_Promo_Code()
{ 
try{
    Log.AppendFolder("C43088_Res_with_active_Promo_Code");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login(); 
    var myGroupsName =defaultGroupName;  
    var keyWordNm ="Promo Codes";
    var packageNm = "Reservation - Promo";
    var subPakNm ="Individual";    
    var qty =1;
    var dateD = CommonCalender.getTodaysDate();   
    aqUtils.Delay(2000);  
    selectGroupFromMainMenu(myGroupsName);
    clickBuyTicketsButton(); 
    OrderInfo.prototype.OrderID = 0;  
    WrapperFunction.setTextValue(textinputPromocodeinput,"reservationtest");
    Button.clickOnButton(selectablebuttonSearchbutton);
     aqUtils.Delay(3000); 
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);       
     if(datetimeformSubWindow.Exists){
      selectDateFromSubWindow(dateD); //mm-dd-yyyy  
      selectNextButtonFromSubWindow();
    }
     aqUtils.Delay(2000); 
     var sSubTotal = subTotalOnOrderScreen.Caption;
     var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
     var sTax =taxOnOrderScreen.Caption;
     var sFees =feesOnOrderScreen.Caption;
     var sTotal =(totalOnOrderScreen.Caption.split(':')[1]).trim();
     finilizeOrder();
     aqUtils.Delay(2000);    
     var settlementSubTotal = orderDetailsSubTotal.Caption;
     var settlementTotal =orderDetailsTotal.Caption;
     var settlementCartAdjustments =orderDetailsCartAdjustment.Caption;
     var settlementTax =orderDetailsTax.Caption;
     var settlementFees =orderDetailsFees.Caption;  
     if(compareStringObj(settlementSubTotal,sSubTotal)
       && compareStringObj(settlementCartAdjustments,sCartAdjustments)
       && compareStringObj(settlementTax,sTax)
       && compareStringObj(settlementFees,sFees)
       && compareStringObj(settlementTotal,sTotal)
     ){
        Log.Message("Order details are matching on settlement page.");     
     }else{
        merlinLogError("Order details are not matching on settlement page.");
      }   
     clickConvertToReservation();
     aqUtils.Delay(3000); 
    Log.Message("Verified order details on settlement page");
    CashButton.Click();
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
    if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton); 
      Button.clickOnButton(applycashrespopupCashPaymentOKButton);    
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);  
    var orderId = cnf_orderID.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var reservationOrderID= (orderId.split('#')[1]).trim();
    ReservationOrderInfo.prototype.ResID = reservationOrderID;   
    
    selectGroupFromMainMenuWithReservationRecord(myGroupsName);
    aqUtils.Delay(3000); 
    
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    verifyTotalOnConfirmationPage(settlementTotal); 
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally {
      AppLoginLogout.logout(); 
	    Log.PopLogFolder();
    } 
}