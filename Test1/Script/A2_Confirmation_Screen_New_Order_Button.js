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

function A2_Confirmation_Screen_New_Order_Button()
{
try{
    Log.AppendFolder("A2_Confirmation_Screen_New_Order_Button");
   InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Daily Admission";
    var packageNm ="3 site Combi";
    var subPakNm ="Adult";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
    
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);     
    finilizeOrder();
    aqUtils.Delay(3000); 
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    selectPaymentTypeAddRequiredFields(paymentTypeForReservation);    
    WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
    Button.clickOnButton(applyButton);
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    Log.Message("Don't Validate the order");
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");      
    aqUtils.Delay(3000);        
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
      return;
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID); 
    
    Button.clickOnButton(NewOrder_Button);
    //cnf_newGroupOrderBtn.Click();
    aqUtils.Delay(2000);   
    if(Keyword_Listgroup.VisibleOnScreen){
    Log.Message("POS navigates to and remains on the Point of Sale screen after clicking on New Order button");
    }else{
    merlinLogError("POS is not navigated to the Point of Sale screen after clicking on New Order button");
    }
   
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
       AppLoginLogout.logout(); 
	    Log.PopLogFolder(); 
    }   
     
}