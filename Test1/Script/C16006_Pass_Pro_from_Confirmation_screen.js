//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function C16006_Pass_Pro_from_Confirmation_screen()
{
  try {   
        Log.AppendFolder("C16006_Pass_Pro_from_Confirmation_screen");
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        Log.AppendFolder("C16006_Pass_Processing_functionality_from_Confirmation");
        WrapperFunction.selectKeyword("Annual Pass"); 
        selectPackage("Annual Pass - reserve","Individual");
        aqUtils.Delay(5000);
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutPassHolderDetails(); 
        SelectPaymentType.selectPaymentType("Cash");
          
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        aqUtils.Delay(2000);
        validateTicket("Don't Validate");
        Button.clickOnButton(PassProcessing_Button);
        aqUtils.Delay(2000);
 
//        var PassHolder_ResultDataGridScroller_OrderID_Row1_value= WrapperFunction.getTextValue(PassHolder_ResultDataGridScroller_OrderID_Row1);
//        Log.Message("OrderID_Row1_value "+PassHolder_ResultDataGridScroller_OrderID_Row1_value);
//        Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
        aqUtils.Delay(2000);
       
       // var OrderHistory_Scroller_OrderID_Row1_value= WrapperFunction.getTextValue(OrderHistory_Scroller_OrderID_Row1);
       // Log.Message("OrderHistory_Scroller_OrderID_Row1_value "+OrderHistory_Scroller_OrderID_Row1_value);  
      //  WrapperFunction.verifyDetails(PassHolder_ResultDataGridScroller_OrderID_Row1_value,OrderHistory_Scroller_OrderID_Row1_value);
        Button.clickOnButton(AssignNewBarCode_Button);
        aqUtils.Delay(5000);
        WrapperFunction.setTextValue(FirstnameField,"abc");
        WrapperFunction.setTextValue(LastnameField,"xyz");
        aqUtils.Delay(3000);  
        Button.clickOnButton(sessionPassSavebtn);
        aqUtils.Delay(3000);      
        Button.clickOnButton(sessionPassProcessbtn);
        aqUtils.Delay(3000);
        Button.clickOnButton(PrintPreview_Button);
        aqUtils.Delay(2000);
        if(PrintPreview_Window.Visible){
            PrintPreview_Closebutton.Click();
            Log.Message("Print preview window is present");
        }else{
              merlinLogError("Print preview window is not displayed.");
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