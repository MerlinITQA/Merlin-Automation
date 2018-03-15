//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function  _001485874448664__20_AnnualPass_IAP_Cash_WOPassHolderDetails()
{
try{
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Pass");
        selectQuantity(1);
        selectPackage("Annual Pass - reserve","Individual");
        
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutPassHolderDetails();
        
        SelectPaymentType.selectPaymentType("Cash");
          
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        
        validateTicket("Validate All");
        Button.clickOnButton(confirmationPassProcessingButton);
        aqUtils.Delay(2000);
//        var PassHolder_ResultDataGridScroller_OrderID_Row1_value= WrapperFunction.getTextValue(PassHolder_ResultDataGridScroller_OrderID_Row1);
//        Log.Message("OrderID_Row1_value "+PassHolder_ResultDataGridScroller_OrderID_Row1_value);
//        Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
//        aqUtils.Delay(2000);
//       
//        var OrderHistory_Scroller_OrderID_Row1_value= WrapperFunction.getTextValue(OrderHistory_Scroller_OrderID_Row1);
//        Log.Message("OrderHistory_Scroller_OrderID_Row1_value "+OrderHistory_Scroller_OrderID_Row1_value);  
//        //Button.clickOnButton(OrderHistory_Scroller_OrderID_Row1);
//        
//      //Facing issue with object Change at runtime
//
//        // Examine the passholder details.
//        WrapperFunction.verifyDetails(PassHolder_ResultDataGridScroller_OrderID_Row1_value,OrderHistory_Scroller_OrderID_Row1_value);
        Button.clickOnButton(AssignNewBarCode_Button);
        aqUtils.Delay(2000);
        WrapperFunction.setTextValue(FirstnameField,"abc");
        WrapperFunction.setTextValue(LastnameField,"xyz");
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
      }
catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}}