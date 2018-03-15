//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
function C43124_Selecting_checkbox_date_gets_copied()
{
try{
    Log.AppendFolder("C43124_Selecting_checkbox_date_gets_copied");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();  
      WrapperFunction.selectKeyword("Annual Pass"); 
      selectQuantity(2);
      selectPackage("Annual Pass - reserve","Individual");
      aqUtils.Delay(5000);
      WrapperFunction.finilizeOrder();    
      Button.clickOnButton(Passholder_NextButton);
      aqUtils.Delay(500);
      Button.clickOnButton(Passholder_NextButton);
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
      var orderId= WrapperFunction.getTextValue(PassHolder_ResultDataGridScroller_OrderID_Row1);
        var numberRows=PassHolder_ResultDataGridScroller.FindAllChildren("Caption",orderId,1,true);
        if(numberRows[0].ScreenTop < numberRows[1].ScreenTop){          
          Button.click(numberRows[0]);
        }else{
          Button.click(numberRows[1]);
        }        
        aqUtils.Delay(2000);
          copyDataForPass.Click();
          WrapperFunction.setTextValue(FirstnameField,"abc");  
          WrapperFunction.setTextValue(MiddleInitialField,"p");       
          WrapperFunction.setTextValue(LastnameField,"xyz");
          WrapperFunction.setTextValue(SuffixField,"Mr");    
          WrapperFunction.setTextValue(AddressField,"test_add1");
          WrapperFunction.setTextValue(Address2Field,"test_add2");
          WrapperFunction.setTextValue(EmailField,"test@test.com");
          WrapperFunction.setTextValue(PhoneField,"9876543210");
          aqUtils.Delay(1000);
          Button.clickOnButton(sessionPassSavebtn);
          aqUtils.Delay(3000); 
          Button.clickOnButton(sessionPassBackbtn);
          aqUtils.Delay(2000); 
          numberRows=PassHolder_ResultDataGridScroller.FindAllChildren("Caption",orderId,1,true);
          aqUtils.Delay(500); 
          if(numberRows[0].ScreenTop > numberRows[1].ScreenTop){          
            Button.click(numberRows[0]);
          }else{
            Button.click(numberRows[1]);
          }
          aqUtils.Delay(2000);        
         compareStringObj(FirstnameField.Caption,"");
         compareStringObj(MiddleInitialField.Caption,"");  
         compareStringObj(LastnameField.Caption,"VOUCHER");
         compareStringObj(SuffixField.Caption,"");         
     
         compareStringObj(AddressField.Caption,"test_add1");
         compareStringObj(Address2Field.Caption,"test_add2");
         compareStringObj(EmailField.Caption,"test@test.com");
         compareStringObj(PhoneField.Caption,"9876543210");
      
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
      AppLoginLogout.logout(); 
	    Log.PopLogFolder(); 
    }   
     
}