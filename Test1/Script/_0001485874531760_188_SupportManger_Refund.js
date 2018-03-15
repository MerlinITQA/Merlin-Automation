//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
  
function _0001485874531760_188_SupportManger_Refund()
{
Log.AppendFolder("_0001485874531760_188_SupportManger_Refund");
try{
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Local Annual Pass Family - Renewal","Individual Free");
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        
        var confirnScreenOrderIDValue=getTextValue(ConfirnScreenOrderID);
        confirnScreenOrderIDValue=removeSpecialCharacter(confirnScreenOrderIDValue);
        Log.Message("confirnScreenOrderIDValue "+confirnScreenOrderIDValue);
       
       
        WrapperFunction.selectMainMenu(SupportManger_MainMenu);
        //loginSupportManger();
		    aqUtils.Delay(15000);
        setTextBoxValue(newConfirmationSearchtextBox,confirnScreenOrderIDValue);
        Button.clickOnButton(newPerformSearchButton);
        aqUtils.Delay(5000);
        Button.clickOnButton(RefundMenu);
        Button.clickOnButton(RefundSubmenuRefundOrder);
         
        Button.clickOnButton(smRefundOrdercheckbox);
        aqUtils.Delay(2000);
        Button.clickOnButton(smRefundChangebtn);
        Button.clickOnButton(smPartialRefundCnfOKbtn);
        if(ErrorMessageButtonOk.Exists)
        {
            Button.clickOnButton(ErrorMessageButtonOk);
        }       
        selectDirectory(Directory_OrderHistory);
        aqUtils.Delay(2000);
        clickSpecificViewOrder(confirnScreenOrderIDValue);
			if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
			   Log.Message("Cash Lift pop up alert is displayed.")
			   Button.clickOnButton(cashLiftPopupClosebutton);
		   }    
        aqUtils.Delay(2000);
        try{
        var refundID = cnf_orderID1.Caption;
            if(refundID.includes("REFUNDED")){
                Log.Message("Order is Refunded");                
            }else
            {
                merlinLogError("Order is not Refunded");
            }
        }catch(e){
            merlinLogError("Unable to select order history.")
        }
        AppLoginLogout.logout();
     
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 