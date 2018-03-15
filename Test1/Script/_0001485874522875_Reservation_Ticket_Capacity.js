//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874522875_Reservation_Ticket_Capacity()
{
try{
      Log.AppendFolder("_0001485874522875_Reservation_Ticket_Capacity");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Cash";
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 2";
  var subPakNm ="Individual";
  var qtyT = 1;
  var dateD =CommonCalender.getTodaysDate();  
    placeROrderForMinimumPayment(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation)
    selectReservationRecordToAddReservation(groupNm);
    aqUtils.Delay(5000); 
    Keyword_Listgroup.MouseWheel(-1,0);
    Keyword_Listgroup.MouseWheel(-1,0);
    Keyword_Listgroup.MouseWheel(-1,0);
    Keyword_Listgroup.MouseWheel(-1,0);
    Keyword_Listgroup.Refresh();
    WrapperFunction.selectKeyword(keyWordNm); 
    selectQuantity(qtyT+1);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(5000); 
    finilizeOrder();
    aqUtils.Delay(3000);     
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
    verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal);
 
  AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();      
    }   
}