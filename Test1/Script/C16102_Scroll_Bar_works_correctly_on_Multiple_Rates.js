//USEUNIT InitializationEnviornment 
//USEUNIT AppLoginLogout
//USEUNIT POSObjectMapping 
//USEUNIT WrapperFunction
//USEUNIT SelectPackageAndSubPackage
function C16102_Scroll_Bar_works_correctly_on_Multiple_Rates()
{  
  try{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Low Capacity";
    var packageNm ="Low Capacity - Date/Time";
    var subPakNm ="Adult";
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
     aqUtils.Delay(5000);       
     var subPackageCount = subWindowSubPackageWindow.DataGroup("ratesList").ChildCount;
     if(CountForPackage.prototype.SpecificPackSubPackageCount == subPackageCount ){
      if(scrollbarVerticalscrollbar.Exists && scrollbarVerticalscrollbar.VisibleOnScreen){
          var currentTop = buttonThumb.ScreenTop;
          Button.clickOnButton(buttonIncrementbutton);
          Button.clickOnButton(buttonIncrementbutton);
          Button.clickOnButton(buttonIncrementbutton);
          aqUtils.Delay(1000);
          if(currentTop < buttonThumb.ScreenTop){
              Log.Message("The scroll bar functions is not working.")
          }else{
              merlinLogError("The scroll bar functions is not working.")
          }
            buttonClosebutton.Click();
            Log.Message("All SubPackages are displayed on Calender screen with Vertical Scroll bar.");
        }else{
            merlinLogError("Vertical Scroll bar is not displayed on UI.");
        }
      }else{
        merlinLogError("Package is not getting selected.");
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