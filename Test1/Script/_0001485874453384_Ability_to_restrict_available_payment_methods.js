//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874453384_Ability_to_restrict_available_payment_methods()
{
  InitializationEnviornment.initiliaze();
   AppLoginLogout.login();
  try {
    var keyWordNm ="Daily Tickets";
    var packageNm = "Restricted Payment Type";
    var subPakNm="Adult";
    var qty = 2;
    var dateD =CommonCalender.getTodaysDate();
    var givenPaymentType = "Invoice";
    
    Log.AppendFolder("_0001485874453384_Ability_to_restrict_available_payment_methods");
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
    allPackages.MouseWheel(-1);
    allPackages.MouseWheel(-1);
    SelectQuantityFromHeader.selectQuantity(qty);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000); 
    
    if(alertInfo.Exists){
      Button.clickOnButton(alertInfobuttonOk);
      }
    else{
      merlinLogError("pop-up alert message prompt is not displayed.");
    }  
     selectPackage("Flexi Admission","Adult");  
      aqUtils.Delay(1000); 
    finilizeOrder();
    aqUtils.Delay(2000);
    var settlementSubTotal = orderDetailsSubTotal.Caption;
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");
    selectPaymentTypeAddRequiredFields(givenPaymentType);
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
    if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton); 
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(1000);
    
    if(postordercharaczippopupAdditiona.Exists){
      WrapperFunction.setTextValue(zipCodeTextInput,"12345");
      Button.clickOnButton(zipCodeContinueButton);
    }else{
    Log.Message("Additional information for zip code is not populated.");
    }
    aqObject.CheckProperty(confirmationPageSubTotalNormal,"Caption", cmpEqual, expectedResult); 
    //verifySubTotalOnConfirmationPage(settlementSubTotal);
    verifyTotalOnConfirmationPage(settlementTotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}
