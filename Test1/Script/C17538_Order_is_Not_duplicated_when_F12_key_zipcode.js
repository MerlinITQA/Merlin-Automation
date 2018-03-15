//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function C17538_Order_is_Not_duplicated_when_F12_key_zipcode()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var keyWordNm ="Daily Admission";
  var packageNm ="Open Dated";
  var subPakNm="Children (Ages 3-12)";
  var givenPaymentType ="Credit Card";
  
  try {
    Log.AppendFolder("C16039_Order_is_Not_duplicated_when_F12_key");
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm); 
    aqUtils.Delay(2000);
    finilizeOrder();
    aqUtils.Delay(2000);
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
      aqUtils.Delay(2000);
      Log.Message("Complete the order");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]");
      Sys.Desktop.Keys("[F12]"); 
      if(postordercharaczippopupAdditiona.Exists){
       WrapperFunction.setTextValue(zipCodeTextInput,"12345");
        Button.clickOnButton(zipCodeContinueButton);
      }else{
        merlinLogError("Zip Code capture is disabled so additional popup is not displayed.");
        merlinLogError("Additional information for zip code is not populated.");
      }   
      aqUtils.Delay(3000);
      validateTicket("Don't Validate");
      Log.Message("Don't Validate the order");    
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
//  AppLoginLogout.logout(); 
}