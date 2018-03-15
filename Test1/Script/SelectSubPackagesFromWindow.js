//USEUNIT ApplicationOpen
//USEUNIT Button
//USEUNIT CommonCalender
//USEUNIT POSObjectMapping
//USEUNIT SelectPackageAndSubPackage
//USEUNIT SelectQuantityFromHeader
//USEUNIT WrapperFunction
//USEUNIT CommonCalender
/**
 * @author mnpatil
 */
 
/** @function
@name SelectSubPackagesFromWindow.selectSubPackagesFromWindowInit
@description Selection from SubWindow.
*/
function selectSubPackagesFromWindowInit()
{
    aqUtils.Delay(5000);
    selectQuantityFromSubWindow(3);
    selectSubPackageFromSubWindow("Adult");
    selectQuantityFromSubWindow(9);
    selectSubPackageFromSubWindow("Under 3");
    selectQuantityFromSubWindow(2);
    selectSubPackageFromSubWindow("Children (Ages 3-12)");
    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
    selectAvailableTimeFromSubWindow("11:30 AM");
    selectNextButtonFromSubWindow();
}

/** @function
@name SelectSubPackagesFromWindow.selectSubPackageFromSubWindow
@description Selection of sub package form SubWindow.
@param {Object} subPackageName is a sub package name.
*/
function selectSubPackageFromSubWindow(subPackageName){
 try {
          //mnp_temp select one rate subpackage
//                var passportPOS;
//                var list;
//                var vlabel;
//                passportPOS = Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1;
//                list = passportPOS.listPackagelistgroup;
//                list.ListItem("[object PackageListRendererData]").Click(60,80,0)
    
       /*mnp_ Log.AppendFolder("SelectSubPackagesFromWindow.selectSubPackageFromSubWindow");
        var subPackageNameOnSubWindow = subWindowSubPackageWindow.FindChild("Caption",subPackageName,0,true);
        Button.click(subPackageNameOnSubWindow);*/
    } catch (e) {
    //Runner.Stop(true);
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
  
		Log.PopLogFolder();
	}
}

/** @function
@name SelectSubPackagesFromWindow.selectDateFromSubWindow
@description Selection of date in calender form SubWindow.
@param {Object} newSetDate is a date.
*/
function selectDateFromSubWindow(newSetDate){
 try {
        Log.AppendFolder("SelectSubPackagesFromWindow.selectDateFromSubWindow");
        aqUtils.Delay(3000);
      /*mnp_  var monthButton = datetimeformSubWindow.FindChild("Caption",CommonCalender.getMonthName(newSetDate),0,true);
        aqUtils.Delay(1000);
        Button.click(monthButton);
        aqUtils.Delay(5000);
        */
        SetFutureDate(subWindowDateChooser,newSetDate)
  } catch (e) {
    //Runner.Stop(true);
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}

/** @function
@name SelectSubPackagesFromWindow.selectAvailableTimeFromSubWindow
@description Selection of time slot form SubWindow.
@param {Object} newTimeStamp is a timeslot.
*/
function selectAvailableTimeFromSubWindow(newTimeStamp){
  try {
       
        selectDefaultAvailableTimeFromSubWindow();
        Log.Message("temporary select first time slot default");
        // temporary select first time slot default. so commented belwo code.
                
//        Log.AppendFolder("SelectSubPackagesFromWindow.selectAvailableTimeFromSubWindow");
//        var subWindowTimeStamp = subWindowAvailableTimeWindow.FindChild("Caption",newTimeStamp,0,true);
//        Log.Message("selected time"+WrapperFunction.getTextValue(subWindowTimeStamp));
//        Button.click(subWindowTimeStamp);
    } catch (e) {
    //Runner.Stop();
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}
/** @function
@name SelectSubPackagesFromWindow.selectDefaultAvailableTimeFromSubWindow
@description Selection of time slot form SubWindow.
@param {Object} newTimeStamp is a timeslot.
*/
function selectDefaultAvailableTimeFromSubWindow(){
  try {
        Log.AppendFolder("SelectSubPackagesFromWindow.selectDefaultAvailableTimeFromSubWindow");
        aqUtils.Delay(3000);
       // availableTimedatagroup.ListItem(0).Click();      
        aqUtils.Delay(1000);
    } catch (e) {
    //Runner.Stop();
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}

/** @function
@name SelectSubPackagesFromWindow.selectNextButtonFromSubWindow
@description Selection next button form SubWindow.
*/
function selectNextButtonFromSubWindow()
{
    Button.click(POSObjectMapping.subWindowNextButton);    
}

/** @function
@name SelectSubPackagesFromWindow.selectQuantityFromSubWindow
@description Selection of quantity form SubWindow.
@param {Object} quantity is a value.
*/
function selectQuantityFromSubWindow(quantity){
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
 /*mnp_ var quantityButton;
    Log.AppendFolder("SelectSubPackagesFromWindow.selectQuantityFromSubWindow");
    
  switch (quantity) {
    case 0:
      quantityButton = datetimeformSubWindow.FindChild("Caption", "0" , 0 , true);
     Button.click(quantityButton);   
     break;
    case 1:
      quantityButton = datetimeformSubWindow.FindChild("Caption", "1" , 0 , true);
      Button.click(quantityButton); 
      break;
    case 2:
      quantityButton = datetimeformSubWindow.FindChild("Caption", "2" , 0 , true);
      Button.click(quantityButton);
      break;
    case 3:
      quantityButton = datetimeformSubWindow.FindChild("Caption", "3" , 0 , true);
      Button.click(quantityButton);
      break;
    case 4:
      quantityButton = datetimeformSubWindow.FindChild("Caption", "4" , 0 , true);
      Button.click(quantityButton);
      break;
    case 5:
      quantityButton = datetimeformSubWindow.FindChild("Caption", "5" , 0 , true);
      Button.click(quantityButton);
      break; 
    default:
     if(quantity<10000){
        quantityButton = datetimeformSubWindow.FindChild("Caption", "Quantity" , 0 , true);
        Button.click(quantityButton);
        SelectQuantityFromHeader.selectFromQuantityRegisterWindow(quantity);
      }
      break;
  }*/
  } catch (e)
   {
    //Runner.Stop(true);
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}
