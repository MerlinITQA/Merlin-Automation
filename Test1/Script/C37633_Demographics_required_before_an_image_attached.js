//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase

function C37633_Demographics_required_before_an_image_attached()
{
try {
    Log.AppendFolder("C37633_Demographics_required_before_an_image_attached");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Annual Pass";
    var packageNm = "Annual Pass - reserve";
    var subPakNm="Individual";    
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
    finilizeOrder();
    aqUtils.Delay(2000);
    if(PassholderWindow.Exists && PassholderWindow.VisibleOnScreen){
      Button.clickOnButton(Passholder_NextButton);     
      if(PassholderCameraLogo.Exists)
      {
        merlinLogError("PassholderCameraLogo is displayed.");
        return;
      }
         aqUtils.Delay(2000);
      if(Settlement_CompleteOrder.Exists && Settlement_CompleteOrder.VisibleOnScreen)
      {
        Log.Message("Settlement screen displays showing correct details");
         var settlementTotal =orderDetailsTotal.Caption;
         applyAmount= aqString.Replace(settlementTotal,"$",""); 
         OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();         
         Button.clickOnButton(applyBalance);
         Log.Message("Complete the order");
         WrapperFunction.settlementCompleteOrder();
         aqUtils.Delay(3000);
         validateTicket("Don't Validate");
         Log.Message("Don't Validate the order"); 
         verifyTotalOnConfirmationPage(settlementTotal);
         var orderId = cnf_orderID1.Caption;
         if (orderId == null){
            merlinLogError("Order id is not present");
            return;
          } 
          var OrderID= (orderId.split('#')[1]).trim();
          OrderInfo.prototype.OrderID = OrderID;
          Log.Message("Order id is set:"+OrderID);
          Button.clickOnButton(PassProcessing_Button);
          aqUtils.Delay(3000);
//          var PassHolder_ResultDataGridScroller_OrderID_Row1_value= WrapperFunction.getTextValue(PassHolder_ResultDataGridScroller_OrderID_Row1);
//          Log.Message("OrderID_Row1_value "+PassHolder_ResultDataGridScroller_OrderID_Row1_value);
//          Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
//          aqUtils.Delay(2000);
//       
//          var OrderHistory_Scroller_OrderID_Row1_value= WrapperFunction.getTextValue(OrderHistory_Scroller_OrderID_Row1);
//          Log.Message("OrderHistory_Scroller_OrderID_Row1_value "+OrderHistory_Scroller_OrderID_Row1_value);  
//          WrapperFunction.verifyDetails(PassHolder_ResultDataGridScroller_OrderID_Row1_value,OrderHistory_Scroller_OrderID_Row1_value);
        
          Button.clickOnButton(AssignNewBarCode_Button);
         // Button.clickOnButton(AssignNewBarCode_Button);
          aqUtils.Delay(2000);
          Button.clickOnButton(sessionPassSavebtn);
          aqUtils.Delay(3000);      
          Button.clickOnButton(sessionPassProcessbtn);
        aqUtils.Delay(2000);
        if(FirstNameErrorIndicator.Exists && FirstNameErrorIndicator.VisibleOnScreen){
            Log.Message("The First Name field will have a red border and an error message will be displayed");          
        }
        else{
            merlinLogError("The First Name field do not have a red border and an error message is not displayed")
        }       
      }else{
          merlinLogError("Settlement Screen is not displayed.")
      }
     }else{
      merlinLogError("PassholderWindow is not displayed.");
      return;
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
 
    