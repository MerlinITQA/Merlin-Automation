//USEUNIT ApplicationOpen
//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectGroupFromMainMenu
//USEUNIT SelectPaymentType
//USEUNIT VerifyCheckProperty
/**
 * @author mnpatil
 */

/** @function
@name ConvertReservationsToPurchase.convertReservationsToPurchase
@description convert reservation order to purchase.
@param {Object} givenGroup is group.
@param {Object} givenPaymentType is payment type.
*/
function convertReservationsToPurchase(givenGroup,givenPaymentType)
{
	try {
		  Log.AppendFolder("ConvertReservationsToPurchase.convertReservationsToPurchase");
      selectGroupFromMainMenuWithReservationRecord(givenGroup);
      var paymentTypeTotal=orderDetailsTotal.Caption;
      Log.Message("Verified order details on settlement page");
      if (ReservationOrderInfo.prototype.ResTotal == paymentTypeTotal){
      Log.Message("Order details are correct proceed to payment selection");
      selectPaymentTypeAddRequiredFields(givenPaymentType);
      var paymentTypeBal= PaymentType_BalanceLabel.Caption;
      paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");          
      if(paymentTypeBal != 0){
      Log.Message("Apply remaining amount");
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);
      }
      //Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      Log.Message("Don't Validate the order");
      aqUtils.Delay(2000);
      validateTicket("Don't Validate"); 
      verifySubTotalOnConfirmationPage(ReservationOrderInfo.prototype.ResTotal);
      verifyTotalOnConfirmationPage(ReservationOrderInfo.prototype.ResTotal);
      }
      } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    } 
}

/** @function
@name ConvertReservationsToPurchase.selectPaymentTypeAddRequiredFields
@description selection of payment type.
@param {Object} payMentType is payment type.
*/
function selectPaymentTypeAddRequiredFields(payMentType){
   ConvertReservationsToPurchase.selectPaymentType(payMentType);
   addPaymentTypeRequiredFields(payMentType);
}

/** @function
@name ConvertReservationsToPurchase.selectPaymentType
@description selection of payment type.
@param {Object} payMentType is payment type.
*/
function selectPaymentType(payMentType){
    aqUtils.Delay(3000); 
    selectPaymentTypeDropDown.Click();    
    var cnt = Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.ChildCount;
      for( j=0;j<4;j++){
      if(payMentType.toLowerCase() == "check"){
        selectPaymentTypeDropDown.Keys("c");
        aqUtils.Delay(100);      
        selectPaymentTypeDropDown.Keys("c");
        aqUtils.Delay(100);
        selectPaymentTypeDropDown.Keys("c");
        selectPaymentTypeDropDown.Keys("[Enter]");
        aqUtils.Delay(100);
      return;
      }
      cnt = Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.ChildCount;
      for (i=0;i<cnt;i++){
        if(Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Visible){
          var ptype= Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Caption;
            if(ptype.toLowerCase() == payMentType.toLowerCase()){
             Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Click();
             return true;
           }
        }
      }   
      Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.scrollbarVerticalscrollbar.Button("incrementButton").Click();
      aqUtils.Delay(1000);
      }
} 

/** @function
@name ConvertReservationsToPurchase.addPaymentTypeRequiredFields
@description selection of payment type.
@param {Object} payMentType is payment type.
*/
function addPaymentTypeRequiredFields(paymentType)
{
  aqUtils.Delay(1000);
  try {
    	Log.AppendFolder("addPaymentTypeRequiredFields");
      Log.Message("paymentType"+paymentType);
       if(paymentType=="Credit Card")
        {
          Button.clickOnButton(CC_EnterNumber);
          SelectPaymentType.enterCCNumber("4444333322221111");
          CC_ExpirationMonth.ClickItem("05 - May");
          CC_ExpirationYear.Keys("[Down][Down][Down]");
          CC_StreetAddress.Keys("Pune");
          CC_ZipCode.Keys("12345");
        }
        else if(paymentType=="Invoice")
        {
          Invoice_Ordernumber.Keys("12345678");   
          Invoice_Organization.Keys("SQS");
        }     
        else if(paymentType=="Check")
        {
          Check_Checknumber.Keys("123456789");
          Check_name.Keys("SQSTEST");        
        }
        else if(paymentType=="Ticket")
        {
           Ticket_TicketBarcode.Keys("123456");
           Button.clickOnButton(Ticket_GetValueButton);
        }
        else if(paymentType=="Voucher")
        {          
           Voucher_Code.Keys("ABCD");      
        }
        else if(paymentType=="[BillingTypes.Hotel Room Charge]"){
        Hotelguestnameinput.Keys("Test Guest Name");
        Hotelroomnumberinput.Keys("123"); 
        Hotelnamecombobox.Button("openButton").Click();
        cnt = Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.ChildCount;
        for (i=0;i<cnt;i++){
          if(Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Visible){
            var ptype= Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Caption;
              if(ptype.toLowerCase() == "Hotel 1".toLowerCase()){
               Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Click();
               return true;
             }
          }
        }     
        }
      } catch (e) {
    		merlinLogError("Oops! There's some glitch in the script: " + e.message);
    		return;
      
}
    	finally {
    		Log.PopLogFolder();
    	}      
}
    
/** @function
@name ConvertReservationsToPurchase.enterCCNumber
@description enter credit card details.
@param {Object} quantity  TestComplete's object containing a value.
*/
function enterCCNumber(quantity){
try {
	 	Log.AppendFolder("SelectPaymentType.enterCCNumber");
    sNumber = quantity.toString();
    for (var i = 0, len = sNumber.length; i < len; i += 1) {
       clickNumbers(+sNumber.charAt(i));
    }
     Sys.Desktop.Keys("[Enter]");
     } catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}   
 
/** @function
@name ConvertReservationsToPurchase.clickNumbers
@description enter  details.
*/
function clickNumbers(buttonNumber){
try {
  	Log.AppendFolder("SelectPaymentType.clickNumbers");
    switch (buttonNumber)
    {
      case 0:
        Button.click(Num0);   
        break;
      case 1:
        Button.click(Num1); 
        break;
      case 2:
        Button.click(Num2);
        break;
      case 3:
        Button.click(Num3);
        break;
      case 4:
        Button.click(Num4);
        break;
      case 5:
        Button.click(Num5);
        break; 
      case 6:
        Button.click(Num6);
        break;
      case 7:
        Button.click(Num7);
        break;
      case 8:
        Button.click(Num8);
        break;
      case 9:
        Button.click(Num9);
        break;
      default:
        break;
    }
  } catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}
