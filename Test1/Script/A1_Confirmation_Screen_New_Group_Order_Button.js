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

function A1_Confirmation_Screen_New_Group_Order_Button()
{
try{
    Log.AppendFolder("A1_Confirmation_Screen_New_Group_Order_Button");
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
    
   // merlinLogError("Verify New Group Order Button.")
   // merlinLogError("New Group Order Button is not displayed.")
    cnf_newGroupOrderBtn.Click();
    //Click on new group order button
    aqUtils.Delay(1000); 
    Button.click(groupsClearButton);
    TextBox.setTextBoxValue(groupsNameti,groupNm);
    aqUtils.Delay(1000);  
    Button.click(groupsSerarchButton);
    aqUtils.Delay(3000);    
    groupsGride.scroller.FindChild("Caption",groupNm,0,true).Click();
    clickBuyTicketsButton();
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);     
    finilizeOrder();
    aqUtils.Delay(3000); 
    expectedSettlemtnttotal = orderDetailsTotal.Caption;
    applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
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
    orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
      return;
    }
    OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;     
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
    AppLoginLogout.logout(); 
	    Log.PopLogFolder(); 
    }   
     
}