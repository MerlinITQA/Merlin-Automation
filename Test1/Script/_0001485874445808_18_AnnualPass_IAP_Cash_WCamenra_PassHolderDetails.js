//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function ID_018_AnnualPass_IAP_Cash()
{
try{
      Log.AppendFolder("ID_018_AnnualPass_IAP_Cash");
        InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Pass");
        selectPackage("Annual Pass - reserve","Individual");
        aqUtils.Delay(5000);
        selectFinalizeOrderbutton();
        PassholderDetails.enterDetailsWithCam();
//        PassholderDetails.enterDetailsWithCam();
//        PassholderDetails.enterDetailsWithCam();
//        PassholderDetails.enterDetailsWithCam();
//        PassholderDetails.enterDetailsWithCam();
//        SelectPaymentType.selectPaymentType("Cash");
          
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        
        validateTicket("Validate All");
        Button.clickOnButton(PassProcessing_Button);
        aqUtils.Delay(3000);
//        var PassHolder_ResultDataGridScroller_OrderID_Row1_value= WrapperFunction.getTextValue(PassHolder_ResultDataGridScroller_OrderID_Row1);
//        Log.Message("OrderID_Row1_value "+PassHolder_ResultDataGridScroller_OrderID_Row1_value);
//         //Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
//        aqUtils.Delay(2000);
//       
//        var OrderHistory_Scroller_OrderID_Row1_value= WrapperFunction.getTextValue(OrderHistory_Scroller_OrderID_Row1);
//        Log.Message("OrderHistory_Scroller_OrderID_Row1_value "+OrderHistory_Scroller_OrderID_Row1_value);  
//        //Button.clickOnButton(OrderHistory_Scroller_OrderID_Row1);
//        
//      //Facing issue with object Change at runtime
//        
//        WrapperFunction.verifyDetails(PassHolder_ResultDataGridScroller_OrderID_Row1_value,OrderHistory_Scroller_OrderID_Row1_value);
        Button.clickOnButton(AssignNewBarCode_Button);
        Button.clickOnButton(sessionPassSavebtn);
        aqUtils.Delay(3000);      
        Button.clickOnButton(sessionPassProcessbtn);
         aqUtils.Delay(3000);
          Button.clickOnButton(PrintPreview_Button);   
          aqUtils.Delay(5000);
          if(PrintPreview_Window.Visible){
              PrintPreview_Closebutton.Click();
              Log.Message("Print preview window is present");
          }else{
          merlinLogError("Print preview window is displayed.");
          }
       // Button.clickOnButton(PrintPreview_Button);
       // PrintPreview_Window.Visible;
        
        AppLoginLogout.logout();
        } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}