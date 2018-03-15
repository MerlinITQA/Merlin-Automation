//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT PlaceOrder
//USEUNIT SupportManagerFunctions

function _0001485874482968_POS_Auto_Validation_On()
{
try{
      Log.AppendFolder("_0001485874482968_POS_Auto_Validation_On");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login(); 
       var keyWordNm ="Daily Admission";
      var packageNm ="Dated";
      var subPakNm ="Adult";
      var qty = 2;
      dt = CommonCalender.getTodaysDate(); 
      var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
      var givenPaymentType = "Cash"; 
   
       Button.clickOnButton(selectDirectoryButton); 
  		    if(slidetoggleAutovalidateslidetogg.FlexObject.active){
            Button.clickOnButton(selectDirectoryButton);
          } else{
  			   slidetoggleAutovalidateslidetogg.Click();     
  		}    
      //step 1 dont validate       
        placeOrder(keyWordNm,packageNm,subPakNm,qty,dateD,givenPaymentType);
         selectSupportManagerFromMainMenu(); 
         aqUtils.Delay(5000);
        // AppLoginLogout.loginSupportManager();
        checkOrderInfoSupportManager(OrderInfo.prototype.OrderID,qty);
      //step 2 validate all
        WrapperFunction.selectMainMenu(PointOfSale_MainMenu);  
        WrapperFunction.selectKeywordName(keyWordNm);
        selectPackage(packageNm,subPakNm);
        aqUtils.Delay(3000);  
        selectQuantityFromSubWindow(qty);
        selectSubPackageFromSubWindow(subPakNm);   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy  
        selectNextButtonFromSubWindow(); 
        finilizeOrder();
        aqUtils.Delay(2000);
        var settlementSubTotal = orderDetailsSubTotal.Caption;
        var settlementTotal =orderDetailsTotal.Caption; 
        Log.Message("Verified order details on settlement page");
        selectPaymentTypeAddRequiredFields(givenPaymentType); 
        applyAmount= aqString.Replace(settlementTotal,"$",""); 
        OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
        Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
        if(applyAmount != 0){
          Log.Message("Apply amount");
          WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
          Button.clickOnButton(applyButton); 
        }
        Log.Message("Complete the order");
        WrapperFunction.settlementCompleteOrder();
        aqUtils.Delay(2000);
        validateTicket("Validate All");
        if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
        }
        Log.Message("Validate All the order"); 
         
        aqObject.CheckProperty(confirmationPageSubTotalNormal,"Caption", cmpEqual, settlementSubTotal); 
        //verifySubTotalOnConfirmationPage(settlementSubTotal);
        verifyTotalOnConfirmationPage(settlementTotal);
        var orderId = cnf_orderID1.Caption;
        if (orderId == null){
           merlinLogError("Order id is not present");
        } 
        var OrderID= (orderId.split('#')[1]).trim();
        OrderInfo.prototype.OrderID = OrderID;
        Log.Message("Order id is set:"+OrderID); 
        selectSupportManagerFromMainMenu();         
        aqUtils.Delay(5000);
         checkOrderInfoSupportManager(OrderInfo.prototype.OrderID,qty);
      //step 3 validate few  
        WrapperFunction.selectMainMenu(PointOfSale_MainMenu);  
        WrapperFunction.selectKeywordName(keyWordNm);
        selectPackage(packageNm,subPakNm);
        aqUtils.Delay(3000);  
        selectQuantityFromSubWindow(qty);
        selectSubPackageFromSubWindow(subPakNm);   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy  
        selectNextButtonFromSubWindow(); 
        finilizeOrder();
        aqUtils.Delay(2000);
        var settlementSubTotal = orderDetailsSubTotal.Caption;
        var settlementTotal =orderDetailsTotal.Caption; 
        Log.Message("Verified order details on settlement page");
        selectPaymentTypeAddRequiredFields(givenPaymentType); 
        applyAmount= aqString.Replace(settlementTotal,"$",""); 
        OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
        Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
        if(applyAmount != 0){
          Log.Message("Apply amount");
          WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
          Button.clickOnButton(applyButton); 
        }
        Log.Message("Complete the order");
        WrapperFunction.settlementCompleteOrder();
        aqUtils.Delay(2000);
        validateTicket("Validate Selected");
        if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
        }
        Log.Message("Validate Selected order"); 
        aqObject.CheckProperty(confirmationPageSubTotalNormal,"Caption", cmpEqual, settlementSubTotal);
        //verifySubTotalOnConfirmationPage(settlementSubTotal);
        verifyTotalOnConfirmationPage(settlementTotal);
        var orderId = cnf_orderID1.Caption;
        if (orderId == null){
          merlinLogError("Order id is not present");
        } 
        var OrderID= (orderId.split('#')[1]).trim();
        OrderInfo.prototype.OrderID = OrderID;
        Log.Message("Order id is set:"+OrderID);
        selectSupportManagerFromMainMenu(); 
        aqUtils.Delay(5000);  
        checkOrderInfoSupportManager(OrderInfo.prototype.OrderID,qty);
        AppLoginLogout.logout();
        } catch (e) {
          merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
        }
        finally { 
          Log.PopLogFolder();
        } 
     }