//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//USEUNIT PlaceReservationOrder
  
function _0001485874461771_49_ClusterTikcet_Cash()
{
Log.AppendFolder("_0001485874461771_49_ClusterTikcet_Cash");
try{
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        
        // Cluster keyword is supposed to be selected, but current;y not availble so used "daily admission tickets
         var groupNm=defaultGroupName;
         var paymentTypeForReservation = "Cash";
         var keyWordNm ="Daily Admission";
         var packageNm ="Dated";
         var subPakNm ="Adult";
         var qtyT = 1;
         var dateD =CommonCalender.getTodaysDate();  
         addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);  
         addNewTicket(keyWordNm,packageNm,"Children (Ages 3-12)",qtyT,dateD); 
         addNewTicket(keyWordNm,"Date/Time","Children (Ages 3-12)",2,dateD); 
    
//        WrapperFunction.selectKeyword("Daily Admission");
//        selectPackage("3 site Combi","Adult");
//        aqUtils.Delay(5000);
//        selectQuantityFromSubWindow(1);
//        selectSubPackageFromSubWindow("Adult");
//        selectQuantityFromSubWindow(1);
//        selectSubPackageFromSubWindow("Children (Ages 3-12)");
//        selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
//        selectAvailableTimeFromSubWindow("1:15 PM");
//        selectNextButtonFromSubWindow();
//   
//        selectPackage("Non Merlin Combo","Individual");
//        aqUtils.Delay(5000);
//        selectQuantityFromSubWindow(1);
//        selectSubPackageFromSubWindow("Individual");//        
//        selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
//        selectNextButtonFromSubWindow();
        
        selectFinalizeOrderbutton();
        SelectPaymentType.selectPaymentType(paymentTypeForReservation);
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        SettlementCompleteOrderButton();
        validateTicket("Don't Validate");
        Button.clickOnButton(NewOrder_Button);
        AppLoginLogout.logout(); 
        
}
catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 