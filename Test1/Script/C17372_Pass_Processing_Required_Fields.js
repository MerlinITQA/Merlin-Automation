//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty

function C17372_Pass_Processing_Required_Fields()
{
 try {
    Log.AppendFolder("C17372_Pass_Processing_Required_Fields");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    
    var keyWordNm ="Annual Pass";
    var packageNm ="Annual Pass - reserve";
    var subPakNm ="Individual";
    var qtyT = 1;          
      
    WrapperFunction.selectKeywordName(keyWordNm);
    selectQuantity(qtyT);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(1000);
    finilizeOrder();
    aqUtils.Delay(2000);
    if(PassholderWindow.Visible){
     
      WrapperFunction.setTextValue(FirstName,"abc");
      Button.clickOnButton(Passholder_NextButton);
      if(!PassHolderLastNameErrorindicator.Visible){
        merlinLogError("Last Name Error indicator is not displayed.");
      }else{
      
       WrapperFunction.setTextValue(FirstName,"abc");
       WrapperFunction.setTextValue(LastName,"xyz");
        WrapperFunction.clearTextValue(FirstName);
       WrapperFunction.clearTextValue(LastName);
       Button.clickOnButton(Passholder_NextButton);
        if(PassHolderLastNameErrorindicator.Visible && PassHolderFirstNameErrorindicator.Visible){
        
         WrapperFunction.setTextValue(FirstName,"abc");
         WrapperFunction.setTextValue(LastName,"xyz");
           Button.clickOnButton(Passholder_NextButton);
           Button.clickOnButton(Passholder_NextButton);
              aqUtils.Delay(2000);
            
              SelectPaymentType.selectPaymentType("Cash");
              WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
              var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
              WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
              Button.clickOnButton(applyButton);
              WrapperFunction.settlementCompleteOrder();
              aqUtils.Delay(2000);
              validateTicket("Don't Validate");
              Button.clickOnButton(PassProcessing_Button);
              aqUtils.Delay(3000);
           //   Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1); 
           //   aqUtils.Delay(1000);
              WrapperFunction.clearTextValue(FirstnameField);
              WrapperFunction.clearTextValue(LastnameField);
              aqUtils.Delay(2000);
              Button.clickOnButton(sessionPassProcessbtn);
              aqUtils.Delay(1000);
               if((FirstNameErrorIndicator.Exists && FirstNameErrorIndicator.Visible )&&
               (sessionPassLastNameErrorindicator.Exists && sessionPassLastNameErrorindicator.Visible)){
                       WrapperFunction.setTextValue(FirstnameField,"abc");
                       WrapperFunction.setTextValue(LastnameField,"xyz");
                       WrapperFunction.clearTextValue(FirstnameField);
                       WrapperFunction.clearTextValue(LastnameField);
                       aqUtils.Delay(1000);
                       Button.clickOnButton(sessionPassProcessbtn);
                       if((FirstNameErrorIndicator.Exists && FirstNameErrorIndicator.Visible )&&
                        (sessionPassLastNameErrorindicator.Exists && sessionPassLastNameErrorindicator.Visible)){
                        }else{
                            merlinLogError("Error indicator is not displayed.");
                        }                       
               }else{
                merlinLogError("Last Name Error indicator is not displayed.");
               }  
        }else{
         merlinLogError("Error indicator is not displayed.");
        }
      }
       
    }else{
      merlinLogError("passholder window is not displayed");
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