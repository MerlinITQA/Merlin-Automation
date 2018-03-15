//USEUNIT ApplicationOpen
//USEUNIT Button
//USEUNIT POSObjectMapping
//USEUNIT SelectQuantityFromHeader
//USEUNIT WrapperFunction

function selectPaymentType(paymentType)
{
  try {
    	Log.AppendFolder("SelectPaymentType.selectPaymentType");
      Log.Message("paymentType: "+paymentType);
       if(paymentType=="Cash")
        {
          Button.clickOnButton(CashButton);
         }
        else if(paymentType=="Credit Card")
        {
          selectPaymentTypeDropDown.ClickItem("Credit Card");
          Button.clickOnButton(CC_EnterNumber);
          SelectPaymentType.enterCCNumber("4444333322221111");
          CC_ExpirationMonth.ClickItem("05 - May");
          // CC_ExpirationYear.ClickItem("2019");
 
          CC_ExpirationYear.Keys("[Down][Down][Down]");
          CC_StreetAddress.Keys("Pune");
          CC_ZipCode.Keys("12345");
        }
        else if(paymentType=="Websphere")
        {
        selectPaymentTypeDropDown.ClickItem("Websphere");
        }
        else if(paymentType=="External CC")
        {
        selectPaymentTypeDropDown.ClickItem("External CC");
        }
        else if(paymentType=="Callscripter")
        {
          selectPaymentTypeDropDown.ClickItem("Callscripter");
        }
        else if(paymentType=="Invoice")
        {
          selectPaymentTypeDropDown.ClickItem("Invoice");
          Invoice_Ordernumber.Keys("12345678");   
          Invoice_Organization.Keys("SQS");
        }
     
        else if(paymentType=="Check")
        {
           selectPaymentTypeDropDown.Keys("[Down][Down][Down][Down][Down][Down][Down][Down][Down]");
          Check_Checknumber.Keys("123456789");
          Check_name.Keys("SQSTEST");
        
        }
        else if(paymentType=="Ticket")
        {
           selectPaymentTypeDropDown.ClickItem("Ticket");
           Ticket_TicketBarcode.Keys("123456");
           Button.clickOnButton(Ticket_GetValueButton);
           
        }
      
        else if(paymentType=="Voucher")
        {
          selectPaymentTypeDropDown.Keys("[Down][Down][Down][Down][Down][Down][Down][Down][Down]");
           Voucher_Code.Keys("ABCD");
      
        }
      } catch (e) {
    		merlinLogError("Oops! There's some glitch in the script: " + e.message);
    		return;
      
}
    	finally {
    		Log.PopLogFolder();
    	}      
}
    
/*****************************************************************************************/
/** @function
@name SelectQuantityFromHeader.selectFromQuantityRegisterWindow
@description Assign text box with a new value.
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
/*****************************************************************************************/
/** @function
@name SelectQuantityFromHeader.clickOnQuantityRegisterWindowButton
@description Assign text box with a new value.
@param {Object} buttonNumber  TestComplete's object containing a value.
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

    
    



    