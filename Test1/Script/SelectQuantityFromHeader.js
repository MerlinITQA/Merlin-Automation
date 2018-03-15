//USEUNIT ApplicationOpen
//USEUNIT Button
//USEUNIT POSObjectMapping
/**
 * @author mnpatil
 */

/** @function
@name SelectQuantityFromHeader.selectQuantity
@description select quantity from heder button.
@param {Object} quantity  TestComplete's object containing a value.
*/
function selectQuantity(quantity){
	try {
      sNumber  = quantity.toString();
        len =sNumber.length;
      for (var i = 0; i < len; i++) {
        var n = sNumber.charAt(i); 
        switch (n) {
          case '0':           
           Button.click(selectablebuttonQtybtn0);   
           break;
          case '1':           
           Button.click(selectablebuttonQtybtn1);   
           break;
          case '2':           
           Button.click(selectablebuttonQtybtn2);   
           break;
          case '3':           
           Button.click(selectablebuttonQtybtn3);   
           break;
          case '4':           
           Button.click(selectablebuttonQtybtn4);   
           break;
          case '5':           
           Button.click(selectablebuttonQtybtn5);   
           break;
          case '6':           
           Button.click(selectablebuttonQtybtn6);   
           break;
          case '7':           
           Button.click(selectablebuttonQtybtn7);   
           break;
          case '8':           
           Button.click(selectablebuttonQtybtn8);   
           break;
          case '9':           
           Button.click(selectablebuttonQtybtn9);   
           break;
         }
    }
 /*mnp_
    Log.AppendFolder("SelectQuantityFromHeader.SelectQuantity");
  switch (quantity) {
    case 0:
     Button.click(qty_0);   
     break;
    case 1:
      Button.click(qty_1); 
      break;
    case 2:
      Button.click(qty_2);
      break;
    case 3:
      Button.click(qty_3);
      break;
    case 4:
      Button.click(qty_4);
      break;
    case 5:
      Button.click(qty_5);
      break; 
    default:
     if(quantity<10000){
          Button.click(qty_qty);
          selectFromQuantityRegisterWindow(quantity);
      }
      break;
  }*/
  } catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}

/** @function
@name SelectQuantityFromHeader.selectFromQuantityRegisterWindow
@description select quantity form register window.
@param {Object} quantity  TestComplete's object containing a value.
*/
function  selectFromQuantityRegisterWindow(quantity){
try {
    Log.AppendFolder("SelectQuantityFromHeader.selectFromQuantityRegisterWindow");
    sNumber = quantity.toString();
    for (var i = 0, len = sNumber.length; i < len; i += 1) {
       clickOnQuantityRegisterWindowButton(+sNumber.charAt(i));
    }
     aqUtils.Delay(2000);
     Sys.Desktop.Keys("[Enter]");
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
@description select buttons form register window.
@param {Object} buttonNumber  TestComplete's object containing a value.
*/
function clickOnQuantityRegisterWindowButton(buttonNumber){
try {
    
	 	Log.AppendFolder("SelectQuantityFromHeader.clickOnQuantityRegisterWindowButton");
switch (buttonNumber) {
    case 0:
      Button.click(qtyregister_0);   
      break;
    case 1:
      Button.click(qtyregister_1); 
      break;
    case 2:
      Button.click(qtyregister_2);
      break;
    case 3:
      Button.click(qtyregister_3);
      break;
    case 4:
      Button.click(qtyregister_4);
      break;
    case 5:
      Button.click(qtyregister_5);
      break; 
    case 6:
      Button.click(qtyregister_6);
      break;
    case 7:
      Button.click(qtyregister_7);
      break;
    case 8:
      Button.click(qtyregister_8);
      break;
    case 9:
      Button.click(qtyregister_9);
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
/*****************************************************************************************/