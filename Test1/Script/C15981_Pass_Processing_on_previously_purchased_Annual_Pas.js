//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
  
function C15981_Pass_Processing_on_previously_purchased_Annual_Pas()
{
  try {   
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        Log.AppendFolder("C15981_Pass_Processing_on_previously_purchased_Annual_Pas");
        WrapperFunction.selectKeyword("Annual Pass"); 
        selectPackage("Annual Pass - reserve","Individual");
        aqUtils.Delay(5000);
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutPassHolderDetails(); 
        aqUtils.Delay(5000);
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
        aqUtils.Delay(3000);
        var ticketBarcode = TicketBarcodeTextBox.Caption;
        if(ticketBarcode != ""){
          Pass_Back_Button.Click();
          PassHolderSearchClear.Click();
           TextBox.setTextBoxValue(PassHolderSearch_TicketID,ticketBarcode);
            Button.clickOnButton(SearchButton);
            Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);  
            Button.clickOnButton(AssignNewBarCode_Button);
            aqUtils.Delay(3000);
            WrapperFunction.setTextValue(FirstnameField,"Test"); 
            Button.clickOnButton(sessionPassSavebtn);
            aqUtils.Delay(3000);      
            Button.clickOnButton(sessionPassProcessbtn);         
        }
        else {
          merlinLogError("Unable to get ticket barcode.");
        }      
        AppLoginLogout.logout();
      } catch (e) {
	        merlinLogError("Oops! There's some glitch in the script: " + e.message);	   
    }
    finally { 
	    Log.PopLogFolder();
    }    
}