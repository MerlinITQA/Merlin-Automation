//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
//USEUNIT SelectDirectory
function _0001485874470186_Pass_Processing_via_Order_History()
{
try{
       Log.AppendFolder("_0001485874470186_Pass_Processing_via_Order_History");
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Pass");
        selectPackage("Annual Pass - reserve","Individual");
        aqUtils.Delay(5000);
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithCam();        
        SelectPaymentType.selectPaymentType("Cash");          
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Don't Validate");
        var orderId = cnf_orderID1.Caption;
        orderId = (orderId.split('#')[1]).trim();
        Button.clickOnButton(NewOrder_Button);
        aqUtils.Delay(2000);
        SelectDirectory.selectDirectory(Directory_OrderHistory);
        clickSpecificViewOrder(orderId);
			if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
			   Log.Message("Cash Lift pop up alert is displayed.")
			   Button.clickOnButton(cashLiftPopupClosebutton);
			}    
         aqUtils.Delay(2000);
        WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
        aqUtils.Delay(2000);
        WrapperFunction.setTextValue(PassProcessing_OrderID,orderId);
        Button.clickOnButton(SearchButton);
         aqUtils.Delay(3000);
        var PassHolder_ResultDataGridScroller_OrderID_Row1_value= WrapperFunction.getTextValue(PassHolder_ResultDataGridScroller_OrderID_Row1);
       // Log.Message("OrderID_Row1_value "+PassHolder_ResultDataGridScroller_OrderID_Row1_value);
        Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
        aqUtils.Delay(2000);
       
        var OrderHistory_Scroller_OrderID_Row1_value= WrapperFunction.getTextValue(OrderHistory_Scroller_OrderID_Row1);
        Log.Message("OrderHistory_Scroller_OrderID_Row1_value "+OrderHistory_Scroller_OrderID_Row1_value);
        aqUtils.Delay(2000);  
        //WrapperFunction.verifyDetails(PassHolder_ResultDataGridScroller_OrderID_Row1_value,OrderHistory_Scroller_OrderID_Row1_value);
        Button.clickOnButton(AssignNewBarCode_Button);
        aqUtils.Delay(2000);
        Button.clickOnButton(sessionPassSavebtn);
        aqUtils.Delay(3000);      
        Button.clickOnButton(sessionPassProcessbtn);
        AppLoginLogout.logout();
        } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      }  
}