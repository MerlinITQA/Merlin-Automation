//USEUNIT Button
//USEUNIT POSObjectMapping
//USEUNIT SelectQuantityFromHeader
//USEUNIT WrapperFunction

//function Test1()
//{
////  var dd=Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1.TotalBalanceLabel_orderDetails.labelTotal;
////  //aqObject.CheckProperty(dd,"Caption", cmpEqual, "$21.95");
////  wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;
//// // applicationMessage = wnd.LogOutActivityWindow;
//////  applicationMessage.Click(240, 152);
//////  applicationMessage.labelImagemessagelabel.DblClick(240, 10);
////  passportPOS = wnd.passportposPassportpos1;
//////  passportPOS.finilizeOrder_button.Click(29, 13);
//////  button = wnd.alertErrorInPackage500003DateTim.alertform0.buttonOk;
////  button.ClickButton();
////  button.DblClick(28, 15);
////  button.ClickButton();
////  button.ClickButton();
////  button.ClickButton();
////  button.Keys("[Esc][Esc][Esc][Esc][Esc][Esc][Esc][Esc][Esc][Esc]");
////  button.ClickButton();
////  button.Keys("[Esc]");
////  wnd.Keys("[Esc]");
////  passportPOS.allPackages.ClickItem("<P assoc_keywords=\"Taxes and Fees,Daily Admission\" cart_limit_override=\"1\" date=\"1\" desc=\"2 site combi - scans at 2 attractions\" display_order=\"255\" extra_movie=\"date_time\" id=\"500032\" keyword=\"Taxes and Fees,Daily Admission\" keyword_description=\"\" max_quantity=\"100\" merchant_id=\"803\" min_quantity=\"1\" min_retail_amount=\"0.00\" name=\"2 site Combi (with $2 fee)\" package_class=\"PreProd POS\" print_movie=\"ticket_ldcb\" rate_count=\"6\" reservable_flag=\"0\" shipping_type_flag=\"4\" tax=\"0\" type=\"N\" use_capacity=\"true\" qty=\"0\"><KEYWORDS><K display_order=\"255\" keyword=\"Taxes and Fees\" keyword_description=\"\"/><K display_order=\"4\" keyword=\"Daily Admission\" keyword_description=\"\"/></KEYWORDS><CT active=\"1\" display_order=\"0\" fee_total=\"2.0\" fees=\"0\" group_id=\"0\" id=\"500344\" max_variable_price=\"\" min_variable_price=\"\" name=\"Adult\" rate_id=\"518599\" renewal_flag=\"0\" retail_amount=\"21.95\" retail_value=\"21.95\" tax_amount=\"0.00\" flex_use_date_time=\"true\"><F amount=\"2.00\" id=\"4\" name=\"Processing Fee\"/></CT><CT active=\"1\" desc=\"Children (Ages 3-12)\" display_order=\"1\" fee_total=\"2.0\" fees=\"0\" group_id=\"0\" id=\"500345\" max_variable_price=\"\" min_variable_price=\"\" name=\"Children (Ages 3-12)\" rate_id=\"518600\" renewal_flag=\"0\" retail_amount=\"20.95\" retail_value=\"20.95\" tax_amount=\"0.00\" flex_use_date_time=\"true\"><F amount=\"2.00\" id=\"4\" name=\"Processing Fee\"/></CT><CT active=\"1\" display_order=\"2\" fee_total=\"2.0\" fees=\"0\" group_id=\"0\" id=\"500354\" max_variable_price=\"\" min_variable_price=\"\" name=\"Under 3\" rate_id=\"518601\" renewal_flag=\"0\" retail_amount=\"0.00\" retail_value=\"0.00\" tax_amount=\"0.00\" flex_use_date_time=\"true\"><F amount=\"2.00\" id=\"4\" name=\"Processing Fee\"/></CT><E date=\"1\" id=\"502500\" isResourceEvent=\"N\" name=\"PreProd - Main Timed\" seating=\"0\" vendor_id=\"10\" vendor_name=\"Legoland Discovery Center Boston\"/><CHARACS product_of_interest=\"meg_test\"/><PACKAGE_ENTITLEMENT ee_id=\"500237\" rule_id=\"1\" rule_value=\"1\"/><CROSS_SELL/></P>");
//////  passportPOS.qty_3.Click(19, 6);
////  accDropDownList = passportPOS.accdropdownlistOtherpaymentddl;
//////  accDropDownList.Click(209, 24);
//////  wnd.groupDropdown.scroller.scrollbarVerticalscrollbar.buttonThumb.Drag(19, 25, -4, 66);
//////  passportPOS.PaymentType_PaymentStack.listwithoutkeyboardNumericinputd.ClickItem("4");
////  passportPOS.PaymentType_PaymentStack.listwithoutkeyboardNumericinputd.ClickItem("6");
////  accDropDownList.ClickItem("Check");
//////  aqObject.CheckProperty(Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1.selectPaymentTypeDropDown, "wSelectedItem", cmpEqual, 6);
////  //aqObject.CheckProperty(Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1.selectPaymentTypeDropDown, "wSelectedItem", cmpContains, 6);
////  var cnt = Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.ChildCount;
////  var packageArray = new Array();
////        
////  for (i=0;i<cnt;i++){
////    if(Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Visible == "True"){
////      var s= Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.Child(i).Caption;
////      packageArray.push(s);
////    }
////  }
////   
////  Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.scrollbarVerticalscrollbar.Button("incrementButton").Click();
//Log.AppendFolder("qqqqqqq");
//  clickonT("Cash");
//  editFi();
//  clickonT("Credit Card");
// editFi();
//  
//  clickonT("Websphere");
// editFi();
//  clickonT("External CC");
// editFi();
//  
//  clickonT("Callscripter");
//  editFi();
//  clickonT("Invoice");
//  editFi();
//  
//  clickonT("Check");
//  editFi();
//  clickonT("Ticket");
//  editFi();
// 
//  clickonT("Voucher");
//  Log.PopLogFolder();
//  
//  
//}

function selectPaymentTypeAddRequiredFields(payMentType){
   selectPaymentType(payMentType);
   addPaymentTypeRequiredFields(payMentType);
}

function selectPaymentType(payMentType){
    aqUtils.Delay(3000); 
    selectPaymentTypeDropDown.Click();
    var cnt = Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.ChildCount;
      for( j=0;j<4;j++){
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


function addPaymentTypeRequiredFields(paymentType)
{
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

    
    



    