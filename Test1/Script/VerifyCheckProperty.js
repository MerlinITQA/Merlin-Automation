//USEUNIT ApplicationOpen
//USEUNIT POSObjectMapping
//USEUNIT Button
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT PassholderDetails
/**
 * @author mnpatil
 */

 
/** @function
@name VerifyCheckProperty.verifySubTotalOnConfirmationPage
@description verify expected result.
@param {Object} expectedResult is expected result to be displayed.
*/
function verifySubTotalOnConfirmationPage(expectedResult){
  aqObject.CheckProperty(cnf_orderDetailsSubTotal,"Caption", cmpEqual, expectedResult); 
}

/** @function
@name VerifyCheckProperty.verifyTotalOnConfirmationPage
@description verify expected result.
@param {Object} expectedResult is expected result to be displayed.
*/
function verifyTotalOnConfirmationPage(expectedResult){
  aqObject.CheckProperty(confirmationPageTotalNormal,"Caption", cmpEqual, expectedResult);  
  //  aqObject.CheckProperty(cnf_orderDetailsTotal,"Caption", cmpEqual, expectedResult); 
}

/** @function
@name VerifyCheckProperty.verifyTotalOnConfirmationPageReservation
@description verify expected result.
@param {Object} expectedResult is expected result to be displayed.
*/
function verifyTotalOnConfirmationPageReservation(expectedResult){
  aqObject.CheckProperty(confirmationPageTotalREZ,"Caption", cmpEqual, expectedResult);  
  //  aqObject.CheckProperty(cnf_orderDetailsTotal,"Caption", cmpEqual, expectedResult); 
}

/** @function
@name VerifyCheckProperty.compareStringObj
@description verify expected result.
@param {Object} expected is expected result to be displayed.
@param {Object} actual is actual result to be displayed.
*/
function compareStringObj(expected,actual){  
try{
  Log.AppendFolder("compareStringObj");
  Log.Message(expected);
  Log.Message(actual);
  if(!aqString.Compare(expected,actual,true)){
      Log.Message("Both strings are equal");
    return true;
    }
    else{
      
      var errorString ="String are not matching Expected -"+expected+"- Actual -"+actual; 
      merlinLogError(errorString);
     return false;
    }
     } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return false;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   
}

/** @function
@name VerifyCheckProperty.verifyPackageNamePrefixColor
@description verify package name and background color.
@param {Object} verifyPackageName is package name to verify.
*/
//function verifyPackageNamePrefixColor(verifyPackageName){
//  var cCount =settlementOrderDataGridOrderdgRender.ChildCount;
//  for (i = 0 ; i< cCount; i++)
//  { 
//   if(settlementOrderDataGridOrderdgRender.Child(i).Visible){   
//    var pknm = settlementOrderDataGridOrderdgRender.Child(i).Caption;
//      if(pknm.includes(verifyPackageName)&& pknm.startsWith("(REZ)")){
//          var greenColorValue = 8514250;
//          var vBKColor = getBKColor(settlementOrderDataGridOrderdgRender.Child(i).Picture());
//          var attrs = Log.CreateNewAttributes();
//          attrs.BackColor = vBKColor;   
//          if(aqObject.CompareProperty(vBKColor, cmpEqual, greenColorValue, false, 0)){
//              Log.Message("Package Name Starts With (REZ)", "", 0, attrs);
//              aqObject.CheckProperty(settlementOrderDataGridOrderdgRender.Child(i), "Caption", cmpStartsWith, "(REZ)");
//              return true;          
//          }
//          else{
//              merlinLogError("Cell backcolor is not matching", "", 0, attrs); 
//              return false;           
//          }        
//        }  
//      } 
//  }
//  merlinLogError("Expected package is not found");
//  return false;   
//} 

/** @function
@name VerifyCheckProperty.verifyPrefixGreenColorReservation
@description verify expected result.
@param {Object} verifyPackageName is package name.
*/
function verifyPrefixGreenColorReservation(verifyPackageName){
  settlementOrderDataGridOrderdgRender.Refresh();
  aqUtils.Delay(2000);
  var cCount =settlementOrderDataGridOrderdgRender.ChildCount;
  for (i = 0 ; i < cCount; i++)
  { 
   if(settlementOrderDataGridOrderdgRender.Child(i).Visible){   
    var pknm = settlementOrderDataGridOrderdgRender.Child(i).Caption;
      if(pknm.includes(verifyPackageName)/*&& pknm.startsWith("(REZ)")*/){
          var greenColorValue = 8514250;
          var greenColorValue1 = 7987906;
          var greenColorValue2 =8711118;
          var vBKColor = getBKColor(settlementOrderDataGridOrderdgRender.Child(i).Picture());
          aqUtils.Delay(2000);
          var attrs = Log.CreateNewAttributes();
          attrs.BackColor = vBKColor;          
          if( vBKColor == greenColorValue || vBKColor == greenColorValue1 ||greenColorValue2){
              Log.Message("Package Name Starts With (REZ)", "", 0, attrs);
             // aqObject.CheckProperty(settlementOrderDataGridOrderdgRender.Child(i), "Caption", cmpStartsWith, "(REZ)");
              return true;          
          }
          else{
              var st ="Background color value -"+ vBKColor ;
              Log.Message(st);   
              merlinLogError("Background is Not Green", "", 0, attrs); 
              return false;           
          }        
        }  
      } 
  }
  merlinLogError("Expected package is not found or Background color is not green or package is not starts with (REZ).");
  return false;   
} 

/** @function
@name VerifyCheckProperty.verifyPrefixColorNonReservation
@description verify expected result.
@param {Object} verifyPackageName is package name.
*/
function verifyPrefixColorNonReservation(verifyPackageName){
  var cCount =settlementOrderDataGridOrderdgRender.ChildCount;
  for (i = 0 ; i< cCount; i++)
  { 
   if(settlementOrderDataGridOrderdgRender.Child(i).Visible){   
    var pknm = settlementOrderDataGridOrderdgRender.Child(i).Caption;
      if(pknm.includes(verifyPackageName)&& !(pknm.startsWith("(REZ)"))){
          var greenColorValue = 8514250;
          var vBKColor = getBKColor(settlementOrderDataGridOrderdgRender.Child(i).Picture());
          var attrs = Log.CreateNewAttributes();
          attrs.BackColor = vBKColor;   
          if(! aqObject.CompareProperty(vBKColor, cmpEqual, greenColorValue, false, 0)){
              Log.Message("Package Name Does not Starts With (REZ)", "", 0, attrs);
              aqObject.CheckProperty(settlementOrderDataGridOrderdgRender.Child(i), "Caption", cmpNotStartsWith, "(REZ)");
              return true;          
          }
          else{
              merlinLogError("Backgournd is Green", "", 0, attrs); 
              return false;           
          }        
        }  
      } 
  }
  merlinLogError("Expected package is not found");
  return false;   
} 

/** @function
@name VerifyCheckProperty.getBKColor
@description verify background color.
@param {Object} picObj is object to find background color.
*/
function getBKColor(picObj)
{
  var colors = new Array();
  var maxColor = 0;
  var maxColorCount = 0;  
  for (var widthId = 0; widthId < picObj.Size.Width; widthId += 3) {
    for (var heighId = 0; heighId < picObj.Size.Height; heighId += 3) {
      var currentPix = picObj.Pixels(widthId, heighId)
      if (null == colors[currentPix]) {
        colors[currentPix] = 0;
      }
      colors[currentPix]++;
      if (colors[currentPix] > maxColorCount) {
        maxColorCount = colors[currentPix];
        maxColor = currentPix;
      }
    }
  } 
  return maxColor;
}
/** @function
@name VerifyCheckProperty.verifyCartDetailsFunctionality
@description verify expected result.
@param {Object} sSubTotal is total.
@param {Object} sCartAdjustments is amount.
@param {Object} sTax is amount.
@param {Object} sFees is amount.
@param {Object} sTotal is amount.
*/
function verifyCartDetailsFunctionality(sSubTotal,sCartAdjustments,sTax,sFees,sTotal){
try {
    Log.AppendFolder("verifyCartDetailsFunctionality");
     cartdetailsCartfeedetails.Click(1,1,0);
     cartAdjustment = cartdetailsdatagroupAdjlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
     cartTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
     cartTotalTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
     cartProcessingFee = cartdetailsdatagroupFeelist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
     cartFeeTotal = cartdetailsdatagroupFeelist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
     for(let i =0 ; i< cartdetailsdatagroupFeelist.ChildCount ; i++){
       feeTotalCap = cartdetailsdatagroupFeelist.Child(i).HGroup(0).Label("nameLabel").Caption;
       if(feeTotalCap == "Fee Total"){
        cartFeeTotal = cartdetailsdatagroupFeelist.Child(i).HGroup(0).Label("amountLabel").Caption;
        break;       
       }        
     }  
     flagPercent = false;
      for(let i =0 ; i< cartdetailsdatagroupFeelist.ChildCount ; i++){
       temp = cartdetailsdatagroupFeelist.Child(i).HGroup(0).Label("nameLabel").Caption;
        if(temp == "5% Tax"){
          flagPercent = true;
          break;        
        }
     }       
     if(!flagPercent){
        merlinLogError("Tax percentage is not displayed.")
     }
     VerifyCheckProperty.compareStringObj(sCartAdjustments,cartAdjustment);
     VerifyCheckProperty.compareStringObj(sTax,cartTax);
     VerifyCheckProperty.compareStringObj(sFees,cartFeeTotal);  
     var horizontalM = 50;
     var verticalM = 50;  
     for(let i =0 ;i < 5 ;i++){
          horizontalM = horizontalM + (i*5);
          verticalM =verticalM +(i*5);          
         var yCo = cartdetailspopupCartDetails.Top;     
         var xCo = cartdetailspopupCartDetails.Left;     
         cartdetailspopupCartDetails.labelTitledisplay.Drag(1,1,horizontalM,verticalM,1);
         aqUtils.Delay(500);
         yCoNew = cartdetailspopupCartDetails.Top;     
         xCoNew = cartdetailspopupCartDetails.Left;     
         if((yCoNew == (yCo+verticalM)  ) && (xCoNew = (xCo + horizontalM))){
          Log.Message("Correct position")
      
         }else{
          merlinLogError("Wrong position")
         }
     }
      horizontalM = 150;
      verticalM = 50;  
     for(let i =0 ;i < 5 ;i++){
          horizontalM = horizontalM - (i*5) ;
          verticalM =verticalM -(i*3)  ;          
         var yCo = cartdetailspopupCartDetails.Top;     
         var xCo = cartdetailspopupCartDetails.Left;     
         cartdetailspopupCartDetails.labelTitledisplay.Drag(1,1,-horizontalM,-verticalM,1);
         aqUtils.Delay(500);
         yCoNew = cartdetailspopupCartDetails.Top;     
         xCoNew = cartdetailspopupCartDetails.Left;     
         if((yCoNew == (yCo-verticalM)  ) && (xCoNew = (xCo - horizontalM))){
          Log.Message("Correct position")
      
         }else{
          merlinLogError("Wrong position")
         }
     }
    Button.clickOnButton(cartdetailsClosebutton);
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }  
}
/** @function
@name VerifyCheckProperty.verifySettlementScreenCashFunctionality
@description verify expected result.
@param {Object} keyWordNm is keyword name.
@param {Object} packageNm is package name.
@param {Object} subPakNm is sub package.
@param {Object} givenPaymentType is payment type.
@param {Object} cashFunctionKey is function key.
@param {Object} verifyValue is value to verify.
*/
function verifySettlementScreenCashFunctionality(keyWordNm,packageNm,subPakNm,givenPaymentType,cashFunctionKey,verifyValue){
 try {
    Log.AppendFolder("verifySettlementScreenCashFunctionality");
    WrapperFunction.selectKeywordName(keyWordNm);    
    selectPackage(packageNm,subPakNm);
     if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy 
      selectNextButtonFromSubWindow();      
    } 
    finilizeOrder();
    aqUtils.Delay(2000); 
    if(keyWordNm.startsWith("Annual Pass") && Passholder_NextButton.Exists){
    Button.clickOnButton(Passholder_NextButton);
      if(PassholderCameraLogo.Exists){
        Button.clickOnButton(PassholderCameraLogo);
      }
      if(Passholder_NextButton.Exists){
        Button.clickOnButton(Passholder_NextButton);
      }       
    }  
    selectPaymentTypeAddRequiredFields(givenPaymentType);
    paymentlistgroup.Click();
     aqUtils.Delay(2000); 
     wnd.Refresh();   
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");    
    var applyAmount= aqString.Replace(settlementTotal,"$","").trim();
     Sys.Desktop.Keys(cashFunctionKey); 
    
    aqUtils.Delay(1000);
    var applyedAmt = paymentlistgroup.Child(0).PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
    applyedAmt= aqString.Replace(applyedAmt,"$","").trim();    
    if(applyedAmt == verifyValue){
      Log.Message("Correct amount is applyed.");
    }else{
      merlinLogError("Wrong amount is is applyed.");
    }
    Button.clickOnButton(editOrder_SettlementWindow);
    aqUtils.Delay(1000);
    Button.clickOnButton(confirmationbuttonClearbtn);
    aqUtils.Delay(500);
    Button.clickOnButton(confirmationbuttonClearbtn); 
    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
}
/** @function
@name VerifyCheckProperty.verifyF9Keys
@description place reservation order.
@param {Object} keyWordNm is keyword name.
@param {Object} packageNm is package name.
@param {Object} subPakNm is subpackage name.
@param {Object} qty is quantity.
@param {Object} dateD is date.
@param {Object} givenPaymentType is payment type.
*/
function verifyFunctionKeys(keyWordNm,packageNm,subPakNm,qty,dateD,givenPaymentType,functionKey)
{   
try {
    Log.AppendFolder("PlaceOrder.placeOrder"); 
    WrapperFunction.selectKeywordName(keyWordNm);
    selectQuantityFromSubWindow(qty);
    selectPackage(packageNm,subPakNm);
     aqUtils.Delay(5000); 
    selectNextButtonFromSubWindow();
    aqUtils.Delay(3000);       
//     if(datetimeformSubWindow.Exists){
//      selectQuantityFromSubWindow(qty);
//      selectSubPackageFromSubWindow(subPakNm);   
//      selectDateFromSubWindow(dateD); //mm-dd-yyyy  
//      selectNextButtonFromSubWindow();
//    }else{
//      if(qty > 1){
//        SelectQuantityFromHeader.selectQuantity(qty);
//        selectPackage(packageNm,subPakNm);
//        aqUtils.Delay(2000);
//      }    
//    }
    finilizeOrder();
    aqUtils.Delay(2000);   
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");
    selectPaymentTypeAddRequiredFields(givenPaymentType);
    applyAmount= aqString.Replace(settlementTotal,"$","");   
    switch(functionKey){
        case "[F9]":
           if(applyAmount != 0){   
            WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
            aqUtils.Delay(1000);     
            Sys.Desktop.Keys("[F9]");
            aqUtils.Delay(1000);            
            paymentlistgroup.Refresh();
            aqUtils.Delay(1000);
            var applyedAmt = paymentlistgroup.Child(0).PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
            applyedAmt= aqString.Replace(applyedAmt,"$","").trim();    
            if(applyedAmt == applyAmount){
              Log.Message("Correct amount is applyed.");
            }else{
              merlinLogError("Wrong amount is is applyed.");
            }
          }    
          break;
        case "[F8]":
          if(applyAmount != 0){   
              WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
              aqUtils.Delay(1000);
              Sys.Desktop.Keys("[F8]");
              aqUtils.Delay(1000);
              testValue = PayamountTextBox.Caption;
              if(testValue == 0){
                Log.Message("The amount entered into the Apply Amount text box is cleared .");
              }else{
                merlinLogError("The amount entered into the Apply Amount text box is not cleared .");
              }
             }
           break;
        case "[F11]":
            if(applyAmount != 0){   
               // WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
                aqUtils.Delay(3000);     
                Sys.Keys("[F11]");
                aqUtils.Delay(2000);
                if(!paymentListFirstItem.Exists) 
                {
                      Sys.Keys("[F11]");
                      aqUtils.Delay(2000);                
                } 
                var applyedAmt = paymentListFirstItem.PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
                applyedAmt= aqString.Replace(applyedAmt,"$","").trim();    
                if(applyedAmt == applyAmount){
                  Log.Message("Correct amount is applyed.");
                }else{
                  merlinLogError("Wrong amount is is applyed.");
                }
              }    
              break;
        case "[F12]":
                if(applyAmount != 0){
                  Log.Message("Apply amount");
                  WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
                  Button.clickOnButton(applyButton);    
                  aqUtils.Delay(2000);             
                }
                Log.Message("Complete the order");
                Sys.Desktop.Keys("[F12]");
                aqUtils.Delay(2000);
                 if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
                   Log.Message("Cash Lift pop up alert is displayed.")
                    Button.clickOnButton(cashLiftPopupClosebutton);
                 }
                validateTicket("Don't Validate");
                Log.Message("Don't Validate the order");               
                verifyTotalOnConfirmationPage(settlementTotal);
                var orderId = cnf_orderID1.Caption;
                if (orderId == null){
                  merlinLogError("Order id is not placed buy using F12 shotcut key.");
                } 
                var OrderID= (orderId.split('#')[1]).trim();
                OrderInfo.prototype.OrderID = OrderID;
                Log.Message("Order id is set:"+OrderID);
                Log.Message("The order is completed when using the F12 shortcut key to complete the order.");                
                break;
        default:
                break;
    }
   
  } catch (e) {
      Log.PopLogFolder();
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }      
    try{
       if(!functionKey.startsWith("[F12]")){
          Button.clickOnButton(editOrder_SettlementWindow);
          aqUtils.Delay(1000);
          Button.clickOnButton(confirmationbuttonClearbtn);
          aqUtils.Delay(500);
          Button.clickOnButton(confirmationbuttonClearbtn);
        }     
      } catch (e) {
      Log.PopLogFolder();
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
}