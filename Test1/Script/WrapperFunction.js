//USEUNIT Button
//USEUNIT DropDownList
//USEUNIT Label
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT PassholderDetails
//USEUNIT ApplicationOpen


/*******************************************************************************************/
/** @function
@name WrapperFunction.CompareBalance
@description Set Text to a particulat object.
@param {Object} locator: Object Name
@param value: value to set given locator 
*/
function verifyBalance(obj1,obj2)
{
  try{
    Log.AppendFolder("WrapperFunction.verifyBalance of "+obj1.Name +"and"+obj2.Name);
    var balObj1=obj1.Caption;
    var balObj2=obj2.Caption;

    balObj_1= removeSpecialCharacter(balObj1);
    balObj2= (balObj2.split('(')[0]).trim();
    balObj_2= removeSpecialCharacter(balObj2);
    //Log.Message("removeSpecialCharacter  "+balObj_1);
    //Log.Message("removeSpecialCharacter  "+balObj_2);
    IntegerComparisonResult=balObj_1.localeCompare(balObj_2);
    if (IntegerComparisonResult == 0) 
       Log.Message("The Balance matches :"+ balObj1+" with "+balObj2);
    else
       merlinLogError("The Balance do not matches :"+balObj1 +" with "+balObj2);
   }catch(e){
   merlinLogError("Error in verifyBalance function");
   }
       
}


/*******************************************************************************************/

function verifyDetails(value1,value2)
{
  try{
      Log.Message("removeSpecialCharacter  "+value1);
      Log.Message("removeSpecialCharacter  "+value2);
      IntegerComparisonResult=value1.localeCompare(value2);
        if (IntegerComparisonResult == 0) 
              Log.Message("Details of "+ value1.Name+" matches with "+value2.Name);
            else
              merlinLogError("Details of "+ value1.Name+" do not matches with "+value2.Name);
      }catch(e){
        merlinLogError("Error in verifyDetails function");
   }
}


/*******************************************************************************************/
//USEUNIT Button
//USEUNIT DropDownList
//USEUNIT Label
//USEUNIT Listbox
//USEUNIT POSObjectMapping

/** @function
@name WrapperFunction.selectMainMenu
@description Select main menu of the POS application.
@param {Object} mainMenu: main menu name to select menu  .
*/   
function selectMainMenu(mainMenu)
{
   Button.clickOnButton(homeButton);
   aqUtils.Delay(2000);
   Label.clickOnLabel(mainMenu);

}
/*******************************************************************************************/
/** @function
@name WrapperFunction.selectKeywod
@description select Keyword .
@param {Object} locator: locator name to select keyword
*/

function selectKeyword(keywordName)
{
   selectKeywordName(keywordName);
//   Log.AppendFolder("Select Keyword:"+keywordName);
//   var KeyWordList=passportPOS.listListgroup;
//   Listbox.SelectListboxItem(Keyword_Listgroup,keywordName);
  
}
/*******************************************************************************************/
/** @function
@name WrapperFunction.selectKeywordName
@description select Keyword .
@param {Object} name: name to select keyword
*/

//function selectKeywordName(name)
//{
//  Log.AppendFolder("WrapperFunction.selectKeywordName");
//    try{
//      Keyword_Listgroup.ListItem("Show more").Click();
//    } catch(e){Log.Message("Show more keyword is not exists.");} 
//  var KeyWordList=passportPOS.listListgroup;
//  var cnt = Keyword_Listgroup.ItemCount;
//  for (i=0;i< cnt; i++) 
//  {
//    if(Keyword_Listgroup.Item(i) == name)
//    {
//          if(i > 5){
//            Keyword_Listgroup.ClickItem(5,0);
//          }
//          if(i > 11){
//            Keyword_Listgroup.MouseWheel(-1);
//            Keyword_Listgroup.MouseWheel(-1);
//            Keyword_Listgroup.MouseWheel(-1);
//          }
//      Keyword_Listgroup.ClickItem(i,0);
//      break;
//    }
//  }
  
function selectKeywordName(keywordStr) {
    Log.AppendFolder("Finding the " + keywordStr + " keyword.");
    var keywordTCObject;
    if(Keyword_Listgroup.ListItem("Show more").Exists && Keyword_Listgroup.ListItem("Show more").VisibleOnScreen){
      Keyword_Listgroup.ListItem("Show more").Click();
     }
    //Aliases.PassportPOS.PointOfSale.keywordList.ShowMore.Button.Click();
 
    function isKeywordSelectable() {
        Keyword_Listgroup.Refresh();
        keywordTCObject =
            Keyword_Listgroup.FindChild("Caption", keywordStr);

        var selectable =
            keywordTCObject.Exists &&
            (groupClosekeywordgrp.ScreenTop -
                keywordTCObject.ScreenTop) > 49;
        //Log.Message(selectable); //debug message
        return selectable;
    };

    var keywordIsSelectable = isKeywordSelectable();

    for (
        let previousScrollPosition = -1;
        !keywordIsSelectable &&
        !equal(previousScrollPosition,
            Keyword_Listgroup.FlexObject.dataGroup.verticalScrollPosition
        );
    ) {
        previousScrollPosition =
            Keyword_Listgroup.FlexObject.dataGroup.verticalScrollPosition;
        keyWorddown.Click();
        keywordIsSelectable = isKeywordSelectable();
    }
    var results = keywordIsSelectable ? (
        Log.Message(
            "Keyword found.",
            "",
            pmNormal,
            null,
            keywordTCObject
        ),
        keywordTCObject.Click(),
        true
    ) : (
        Log.Warning("Unable to find keyword!"),
        false
    );
    Log.PopLogFolder();
    return results;
};
  
/*******************************************************************************************/

/** @function
@name WrapperFunction.finilizeOrder
@description click on finilize Order .
*/

function finilizeOrder()
{
  Log.Message("WrapperFunction.finilizeOrder click");
  aqUtils.Delay(2000);
  Button.clickOnButton(finilizeOrder_button);
}

/** @function
@name WrapperFunction.settlementCompleteOrder
@description click on complete Order.
*/

function settlementCompleteOrder()
{
   Button.clickOnButton(Settlement_CompleteOrder);
   aqUtils.Delay(1000);
   //savePrintFile();
   if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
       Log.Message("Cash Lift pop up alert is displayed.")
       Button.clickOnButton(cashLiftPopupClosebutton);
   }
}
/*******************************************************************************************/
/** @function
@name DropDownList.selectPaymentMethod
@description select payment Method.
@param {Object} paymentType: Select payment type
*/
function selectPaymentMethod(paymentType)
{
  DropDownList.SelectListboxItem(selectPaymentTypeDropDown,paymentType);

}
/*******************************************************************************************/
/** @function
@name WrapperFunction.getTextValue
@description Get Text of particulat object.
@param {Object} locator: Object Name
*/
function getTextValue(locator)
{
  if(locator.Exists)
  {
    if (locator.WaitProperty("Enabled", true, 10000)
     && locator.Visible)
     {
         return locator.Caption;
      }
  }
      }
/*******************************************************************************************/
/** @function
@name WrapperFunction.setTextValue
@description Set Text to a particulat object.
@param {Object} locator: Object Name
@param value: value to set given locator 
*/
function setTextValue(locator,value)
{
   aqUtils.Delay(1000);
   return locator.Keys(value);
}

/** @function
@name WrapperFunction.clearTextValue
@description Set Text to a particulat object.
@param {Object} locator: Object Name
*/
function clearTextValue(locator)
{
      locator.keys("^a");
      locator.keys("[BS]");
}
/*******************************************************************************************/
/** @function
@name WrapperFunction.setTextValue
@description Set Text to a particulat object.
@param {Object} locator: Object Name
@param value: value to set given locator 
*/
function validateTicket(validationType)
{
try
{
if(validateTicketspopUp.Exists)
{
       if(validationType=="Validate All")
       {
          clickOnButton(ValidateAllButton);
           if(ValidateFailed_Alert.Exists)
          { 
             ValidateFailed_AlertOK.Click();
        
          }
          else
          {
          Log.Message("Do not exhists: ValidateFailed_Alert");
          }
       }  
       else if(validationType=="Validate Selected")
       {
           listTicketsGroup.Child(0).click();//default first ticket getting selected
           clickOnButton(ValidateSelectedButton);
           if(ValidateFailed_Alert.Exists)
            { 
               ValidateFailed_AlertOK.Click(); 
            }
            else
            {
                Log.Message("Do not exhists: ValidateFailed_Alert");
            }
       }
       else if(validationType=="Don't Validate")
       {
          clickOnButton(DontValidateButton);
       }
}

 }
      catch (e) {
        
         merlinLogError("Oops! There's some glitch in the script: " + e.message);
          //Runner.Stop(true);
      return;
      }
      finally {
      Log.PopLogFolder();
      }
      }

/*******************************************************************************************/
/** @function
@name WrapperFunction.setTextValue
@description Set Text to a particulat object.
@param {Object} locator: Object Name
@param value: value to set given locator 
*/

function selectCountry(countryName)
{
  DropDownList.SelectListboxItem(Country,countryName);
}


/*******************************************************************************************/
/** @function
@name WrapperFunction.CompareBalance
@description Set Text to a particulat object.
@param {Object} locator: Object Name
@param value: value to set given locator 
*/
function CompareBalance(obj1,obj2)
{
try{
    var balObj1=WrapperFunction.getTextValue(obj1);
    var balObj2=WrapperFunction.getTextValue(obj2);

    balObj_1= removeSpecialCharacter(balObj1);
    balObj2= (balObj2.split('(')[0]).trim();
    balObj_2= removeSpecialCharacter(balObj2);
    Log.Message("removeSpecialCharacter  "+balObj_1);
    Log.Message("removeSpecialCharacter  "+balObj_2);
    IntegerComparisonResult=balObj_1.localeCompare(balObj_2);
      if (IntegerComparisonResult == 0) 
            Log.Message(IntegerComparisonResult + ". The strings are the same.");
          else
            merlinLogError(IntegerComparisonResult + ". The strings are different.");
            
     }catch(e){
        merlinLogError("Error in CompareBalance function");
   }
  
}


/*******************************************************************************************/
/** @function
@name WrapperFunction.removeSpecialCharacter
@description Remove Special Characters and return value.
@param {Object} Obj1,: Object Names

*/ 

function removeSpecialCharacter(obj)
{
 
  obj= aqString.Replace(obj,"$","");
  obj= aqString.Replace(obj,"€","");
  obj= aqString.Replace(obj,"Balance: ","");
  obj= aqString.Replace(obj,"#","");
  obj= aqString.Replace(obj,"Order","");
  obj= aqString.Replace(obj,"Date: ","");
  obj= aqString.Trim(obj,3);
  return obj;
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.getBalanceValue
@description Get Balance value by removing special character and other characters.
@param {Object} locator: Locator object from which balance value is extracted

*/ 

function getBalanceValue(locator)
{
  try{
      var balanceValue=0;
      
      balanceValue=WrapperFunction.getTextValue(locator);
      var val= (balanceValue.split('(')[0]).trim();
      balanceValue= removeSpecialCharacter(val);
      balanceValue= aqConvert.StrToFloat(balanceValue);
      return balanceValue;
    }catch(e){    
        merlinLogError("Error in getBalanceValue function");
        return 0;
   }
}
/*******************************************************************************************/
/** @function
@name WrapperFunction.getFloorValue
@description Return value of a number representing the largest integer less than or equal to the specified number.
@param {Object} locator: Number to which we are flooring value

*/ 

function getFloorValue(value)
{
   return Math.floor(value);
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.getFloorValue
@description Return value of a number representing the largest integer less than or equal to the specified number.
@param {Object} locator: Number to which we are flooring value

*/ 

function captureSaveCameraImage()
{
      Button.clickOnButton(ClearCamera_Button);
      Button.clickOnButton(Capture_Button);
      Button.clickOnButton(Save_Button);  
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.enterDetailsWithCam
@description if Passport Window Displays enter deatsils otherwise skip and Caprture image


*/ 

function enterDetailsWithCam()
{
      if(PassholderWindow.Visible)
      {
         PassholderDetails.enterDetailsWithCam();
      }
      else
      {
          //break;
      }
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.getFloorValue
@description Return value of a number representing the largest integer less than or equal to the specified number.
@param {Object} locator: Number to which we are flooring value

*/ 

function enterDetailsWOCam()
{
      if(PassholderWindow.Visible)
      {
         PassholderDetails.enterDetailsWithoutCam();
      }
      else
      {
        //  break;
      }
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.getFloorValue
@description Return value of a number representing the largest integer less than or equal to the specified number.
@param {Object} locator: Number to which we are flooring value

*/ 

function enterPromoCode(value)
{
    TextBox.setTextBoxValue(PromoCodes_EnterPromoCodes,value);
     Sys.Desktop.Keys("[Enter]");
}

/*******************************************************************************************/

/** @function
@name WrapperFunction.getFloorValue
@description Return value of a number representing the largest integer less than or equal to the specified number.
@param {Object} locator: Number to which we are flooring value
*/ 

function enterTicketID(value)
{
    TextBox.setTextBoxValue(PassHolderSearch_TicketID,value);
    
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.getFloorValue
@description Return value of a number representing the largest integer less than or equal to the specified number.
@param {Object} locator: Number to which we are flooring value
*/ 

function verifyCartTotal()
{

      var subtotalValue= getBalanceValue(orderDetailsSubTotal); 
      Log.Message(subtotalValue);
    
      var feeValue= getBalanceValue(orderDetailsFees); 
      Log.Message(feeValue);
    
      var taxValue= getBalanceValue(orderDetailsTax);
      Log.Message(feeValue);

      var totalval= getBalanceValue(orderDetailsTotal); 
      Log.Message(totalval);

      var cartAdjustmentValue=getBalanceValue(orderDetailsCartAdjustment);
      Log.Message(cartAdjustmentValue);        
    
     var expectedTotal =subtotalValue + feeValue + taxValue+ cartAdjustmentValue;
     Log.Message("expectedTotal"+expectedTotal);
     Log.Message("total"+totalval);
    
     if(equal(expectedTotal, totalval))
     {
        Log.Message("Cart value Verified correctly");
     }
     else
     {
        merlinLogError("Cart value Verification fails")
     }
  
}

/*******************************************************************************************/

/** @function
@name WrapperFunction.selectFinalizeOrderbutton
@description Selct finalize order Button and if error pop up occurs the click ok

@param {Object} locator: Number to which we are flooring value
*/ 



function selectFinalizeOrderbutton()
{
 aqUtils.Delay(2000);
 Button.click(finilizeOrder_button);
 if(alertErrorInPackage.Exists)
 {
    Button.clickOnButton(buttonOk);
    Button.click(finilizeOrder_button);
 }
 

}
/*******************************************************************************************/
/** @function
@name WrapperFunction.selectFinalizeOrderbutton
@description Selct finalize order Button and if error pop up occurs the click ok

@param {Object} locator: Number to which we are flooring value
*/ 



function SettlementCompleteOrderButton()
{

 Button.click(Settlement_CompleteOrder); 
 if(buttonOkOnError.Exists)
 {
    Button.clickOnButton(buttonOkOnError);
    Button.click(Settlement_CompleteOrder);
 }
 aqUtils.Delay(1000);
   if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
       Log.Message("Cash Lift pop up alert is displayed.")
       Button.clickOnButton(cashLiftPopupClosebutton);
   }
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.searchPassHolderOrderID
@description Search PassHolder OrderID  

@param {Object} locator: Order ID
*/ 



function searchPassHolderOrderID(value)
{

  WrapperFunction.setTextValue(PassProcessing_OrderID,value);
  Button.clickOnButton(SearchButton);
}

/*******************************************************************************************/
/** @function
@name WrapperFunction.searchPassHolderOrderID
@description Search PassHolder OrderID  

@param {Object} locator: Order ID
*/ 

function checkControlExistence(control)
{
  try{
      if(control.Exists)
      {
        Log.Message(control.Name+"Control exists on screen");
        return true;
      }
      else
      {
        merlinLogError(control.Name+"Control do not exists on screen");
        return false;
      }
   }catch(e){    
        merlinLogError("Error in checkControlExistence function");
        return 0;
   }  
}


/*******************************************************************************************/
/** @function
@name WrapperFunction.isIncludes
@description includes functionality 
@param {Object} control1,control2
*/ 

function isIncludes(value1,value2)
{
  if(value1.includes(value2))
  {
    Log.Message(value1+" includes "+value2);
    return true;
  }
  else
  {
    merlinLogError(value1+" not includes "+value2);
    return false;
  }
  
}


/*******************************************************************************************/
/** @function
@name WrapperFunction.isIncludes
@description includes functionality 
@param {Object} control1,control2
*/ 

function getLogFolderPath()
{

    var username=Sys.UserName;
       var sysPath="C:\\Users\\"+username+"\\AppData\\Roaming\\com.accesso.PassportPOS\\Local Store\\logs";
       Log.Message("sysPath "+sysPath );
       
       var date=aqDateTime.Today();
       Log.Message("date "+date );
      
       var expectedDate=aqConvert.DateTimeToFormatStr(date, "%Y%m%d");
       Log.Message("expectedDate "+expectedDate );
      sysPath=sysPath+"\\"+ expectedDate+"\\";
      return sysPath;
}
/** @function
@name WrapperFunction.isIncludes
@description includes functionality 
@param {Object} control1,control2
*/
function getLocaleFolderPath()
{
    var username=Sys.UserName;
    var localePath="C:\\Users\\"+username+"\\AppData\\Roaming\\com.accesso.PassportPOS\\Local Store\\locales";
    Log.Message("localePath "+localePath );       
    return localePath;

}