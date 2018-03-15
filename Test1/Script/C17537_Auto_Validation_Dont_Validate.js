//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT PlaceOrder
//USEUNIT SupportManagerFunctions

function C17537_Auto_Validation_Dont_Validate()
{
try{
      Log.AppendFolder("C17537_Auto_Validation_Dont_Validate");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login(); 
      var keyWordNm ="Daily Admission";
      var packageNm ="Dated";
      var subPakNm ="Adult";
      var qty = 1;
      dt = CommonCalender.getTodaysDate();
      var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
      var givenPaymentType = "Cash"; 
     
      Button.clickOnButton(selectDirectoryButton); 
       if(slidetoggleAutovalidateslidetogg.FlexObject.active){
             slidetoggleAutovalidateslidetogg.Click();  
          } else{
  			     Button.clickOnButton(selectDirectoryButton); 
  		    }  
        placeOrder(keyWordNm,packageNm,subPakNm,qty,dateD,givenPaymentType);
        selectSupportManagerFromMainMenu(); 
        aqUtils.Delay(5000);
       // AppLoginLogout.loginSupportManager();
        checkOrderInfoSupportManager(OrderInfo.prototype.OrderID,qty);
        AppLoginLogout.logout();
         } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }  
}