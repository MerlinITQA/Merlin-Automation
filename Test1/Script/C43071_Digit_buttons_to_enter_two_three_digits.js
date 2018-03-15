//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader

function C43071_Digit_buttons_to_enter_two_three_digits()
{ 
 Log.AppendFolder("C43071_Digit_buttons_to_enter_two_three_digits");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login();
   aqUtils.Delay(2000);
  try{
    checkControlExistence(labelQuantitylabel);
    checkControlExistence(selectablebuttonClearbutton);
    checkControlExistence(selectablebuttonQtybtn0);
    checkControlExistence(selectablebuttonQtybtn1);
    checkControlExistence(selectablebuttonQtybtn2);
    checkControlExistence(selectablebuttonQtybtn3);
    checkControlExistence(selectablebuttonQtybtn4);
    checkControlExistence(selectablebuttonQtybtn5);
    checkControlExistence(selectablebuttonQtybtn6);
    checkControlExistence(selectablebuttonQtybtn7);
    checkControlExistence(selectablebuttonQtybtn8);
    checkControlExistence(selectablebuttonQtybtn9);
    
    selectQuantity(2);
    var appliedQty = labelQuantitylabel.Caption;
    if (appliedQty != 2){
        merlinLogError("Quantity is not displayed in text box.");
    }else{
      Button.clickOnButton(selectablebuttonClearbutton);
    }
    selectQuantity(21);
    var appliedQty = labelQuantitylabel.Caption;
    if (appliedQty != 21){
        merlinLogError("Quantity is not displayed in text box.");
    }else{
      Button.clickOnButton(selectablebuttonClearbutton);
    }
     selectQuantity(217);
    var appliedQty = labelQuantitylabel.Caption;
    if (appliedQty != 217){
        merlinLogError("Quantity is not displayed in text box.");
    }else{
      Button.clickOnButton(selectablebuttonClearbutton);
    }
     selectQuantity(2178);
    var appliedQty = labelQuantitylabel.Caption;
    if (appliedQty != 217){
        merlinLogError("Quantity is not displayed in text box.");
    }else{
      Button.clickOnButton(selectablebuttonClearbutton);
    }
    
    
    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
  AppLoginLogout.logout(); 
}
 