//USEUNIT ApplicationOpen
//USEUNIT POSObjectMapping
//USEUNIT TextBox
//USEUNIT WrapperFunction


/** @function
@name SelectPackageAndSubPackage.selectPackage
@description select package.
@param {Object} packageName is a packageName.
@param {Object} subPackageName is a subPackageName.
*/
function enterDetailsWithCam()
{
 try
 {
   Log.AppendFolder("PassholderDetails.enterDetailsWithCam");
   if(FirstName.Exists)
   {
         setTextBoxValue(FirstName, "Merlin");
         setTextBoxValue(MiddleInitial, "EntertaiinMent");
         setTextBoxValue(LastName, "Accesso");
         setTextBoxValue(Suffix, "Mr");
         setTextBoxValue(DateOfBirth,"09 / 2   2  /       1     9     7     5");
         Gender.ClickItem("Male");
         setTextBoxValue(Address, "SQS");
         setTextBoxValue(Address2, "Pune");
         selectCountry("Canada");
         setTextBoxValue(ZipCode, "411057");
         setTextBoxValue(City_Town, "Hinjewadi");
         setTextBoxValue(State, "Maharshtra");
         setTextBoxValue(Email, "swapnil.mane@sqs.com");
         setTextBoxValue(Phone, "0123456789");
         setTextBoxValue(AltPhone, "0123456789");
         setTextBoxValue(ExternalID, "012");
         SubscriptionTOEmailBlast.Click();
         setTextBoxValue(MemoTextA, "SQS Test");
         Button.clickOnButton(Passholder_NextButton);
         Button.clickOnButton(PassholderCameraLogo);
         Button.clickOnButton(Passholder_NextButton);
     }
     
 }catch (e)
 {
		    merlinLogError("Error :" + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	}
}
/************************************************************************************/
//USEUNIT POSObjectMapping
//USEUNIT TextBox
//USEUNIT WrapperFunction
/** @function
@name SelectPackageAndSubPackage.selectPackage
@description select package.
@param {Object} packageName is a packageName.
@param {Object} subPackageName is a subPackageName.
*/
function enterDetailsWithoutCam()
{
Log.AppendFolder("PassholderDetails.enterDetails");
 try
 {
     setTextBoxValue(FirstName, "Merlin");
     setTextBoxValue(MiddleInitial, "EntertaiinMent");
     setTextBoxValue(LastName, "Accesso");
     setTextBoxValue(Suffix, "Mr");
     setTextBoxValue(DateOfBirth,"09 / 2   2  /       1     9     7     5");
     Gender.ClickItem("Male");
     setTextBoxValue(Address, "SQS");
     setTextBoxValue(Address2, "Pune");
     selectCountry("Canada");
     setTextBoxValue(ZipCode, "411057");
     setTextBoxValue(City_Town, "Hinjewadi");
     setTextBoxValue(State, "Maharshtra");
     setTextBoxValue(Email, "swapnil.mane@sqs.com");
     setTextBoxValue(Phone, "0123456789");
     setTextBoxValue(AltPhone, "0123456789");
     setTextBoxValue(ExternalID, "012");
     SubscriptionTOEmailBlast.Click();
     setTextBoxValue(MemoTextA, "SQS Test");
     Button.clickOnButton(Passholder_NextButton);
     Button.clickOnButton(Passholder_NextButton);
     
 }catch (e)
 {
		    merlinLogError("Error :" + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	}
}
/** @function
@name PassholderDetails.enterAllPassHolderDetails
@description enter passholder details.
*/
function enterAllPassHolderDetails()
{
Log.AppendFolder("PassholderDetails.enterAllPassHolderDetails");
 try
 {
     setTextBoxValue(FirstName, "M_FirstName");
     setTextBoxValue(MiddleInitial, "Midd");
     setTextBoxValue(LastName, "M_LastName");
     setTextBoxValue(Suffix, "Mr");
     setTextBoxValue(DateOfBirth,"09 / 2   2  /       1     9     7     5");
     Gender.ClickItem("Male");
     setTextBoxValue(Address, "SQS");
     setTextBoxValue(Address2, "Pune");
     selectCountry("Canada");
     setTextBoxValue(ZipCode, "411057");
     aqUtils.Delay(1000);
     setTextBoxValue(City_Town, "Hinjewadi");
     setTextBoxValue(State, "Maharshtra");
     setTextBoxValue(Email, "test@sqs.com");
     setTextBoxValue(Phone, "0123456789");
     setTextBoxValue(AltPhone, "0123456789");
     setTextBoxValue(ExternalID, "012");
 }catch (e)
 {
		    merlinLogError("Error :" + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	}
}

/************************************************************************************/
//USEUNIT POSObjectMapping
//USEUNIT TextBox
//USEUNIT WrapperFunction
/** @function
@name SelectPackageAndSubPackage.selectPackage
@description select package.
@param {Object} packageName is a packageName.
@param {Object} subPackageName is a subPackageName.
*/
function enterDetailsWithoutPassHolderDetails()
{
Log.AppendFolder("PassholderDetails.enterDetails");
 try
 {
     Button.clickOnButton(Passholder_NextButton);
     
      if(PassholderCameraLogo.Exists)
     {
        Button.clickOnButton(PassholderCameraLogo);
        Button.clickOnButton(Passholder_NextButton);
     }
     
 }catch (e)
 {
		    merlinLogError("Error :" + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	}
}
/************************************************************************************/

/** @function
@name SelectPackageAndSubPackage.selectPackage
@description select package.
@param {Object} packageName is a packageName.
@param {Object} subPackageName is a subPackageName.
*/
function enterDetailsWithoutCameraPassHolderDetails()
{
Log.AppendFolder("PassholderDetails.enterDetails");
 try
 {
     if(Passholder_NextButton.Exists)
     {
         if (Passholder_NextButton.WaitProperty("Enabled", true, 10000)
         && Passholder_NextButton.Visible)
          {
             Button.clickOnButton(Passholder_NextButton);
          }  
     }
     aqUtils.Delay(3000);
     if(Passholder_NextButton.Exists)
     {
      	if (Passholder_NextButton.WaitProperty("Enabled", true, 10000)
          && Passholder_NextButton.Visible)
          {
            Button.clickOnButton(Passholder_NextButton);
          }   
     
     }
    
 }catch (e)
 {
		    merlinLogError("Error :" + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	}
}
/************************************************************************************/
/** @function
@name SelectPackageAndSubPackage.selectPackage
@description select package.
@param {Object} packageName is a packageName.
@param {Object} subPackageName is a subPackageName.
*/


function PassProcessingPassholderDetails()
{
    WrapperFunction.setTextValue(FirstnameField,"abc");
    WrapperFunction.setTextValue(MiddleInitialField,"pqr");
    WrapperFunction.setTextValue(LastnameField,"xyz");
    WrapperFunction.setTextValue(SuffixField,"suffix");
   // WrapperFunction.setTextValue(SuffixField,"suffix");
    WrapperFunction.setTextValue(DateOfBirthfield,"04/12/1945");
    WrapperFunction.setTextValue(AddressField,"aaa");
    WrapperFunction.setTextValue(Address2Field,"zzz");
    WrapperFunction.setTextValue(EmailField,"asft@kk.com");
    WrapperFunction.setTextValue(PhoneField,"9876543210");
    
}