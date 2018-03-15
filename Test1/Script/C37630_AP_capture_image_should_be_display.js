//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase

function C37630_AP_capture_image_should_be_display()
{
try {
    Log.AppendFolder("C37630_AP_capture_image_should_be_display");
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
      setTextBoxValue(FirstName, "Test_FirstName");      
      setTextBoxValue(LastName, "Test_LastName");      
      Button.clickOnButton(Passholder_NextButton);     
      if(!PassholderCameraLogo.Exists)
      {
        merlinLogError("PassholderCameraLogo is not displayed.");
        return;
      }
      Button.clickOnButton(PassholderCameraLogo);
      Button.clickOnButton(Passholder_NextButton);
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
          VerifyCheckProperty.compareStringObj(FirstnameField.Caption,"Test_FirstName");
          VerifyCheckProperty.compareStringObj(LastnameField.Caption,"Test_LastName");
         // Button.clickOnButton(AssignNewBarCode_Button);
          Button.clickOnButton(AssignNewBarCode_Button);
          aqUtils.Delay(3000);
          Button.clickOnButton(sessionPassSavebtn);
          aqUtils.Delay(3000);      
          Button.clickOnButton(sessionPassProcessbtn);
           aqUtils.Delay(3000);
          Button.clickOnButton(PrintPreview_Button);   
          aqUtils.Delay(3000);
          if(PrintPreview_Window.Visible){
              PrintPreview_Closebutton.Click();
              Log.Message("Print preview window is present");
          }else{
          merlinLogError("Print preview window is displayed.");
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
 
    Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1.POSGroup.groupContentgroup.mainviewMainview33.seasonpassdetailsviewSeasonpassd.scrollerScrollbar.groupVgroup4382.groupVgroup23616.groupHgroup23617.groupHgroup23618.FirstnameField
	Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1.POSGroup.groupContentgroup.mainviewMainview33.seasonpassdetailsviewSeasonpassd.scrollerScrollbar.groupVgroup4382.groupVgroup23616.groupHgroup23617.groupHgroup23618.FirstnameField