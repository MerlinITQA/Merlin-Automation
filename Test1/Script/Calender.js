//USEUNIT AppLoginLogout
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT InitializationEnviornment
//USEUNIT SelectPackageAndSubPackage

//Selection of Keyword functionlity 
function SelectPaymentType()
{
var app =  TestedApps.Items(0);
var wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;



var datetimeform2SiteCombiWith2Fee= wnd.datetimeform2SiteCombiWith2Fee;
var datetimeformDated= wnd.datetimeformDated;
var datetimeWild= wnd.datetimeformDated;
var datetimeformDateTime= wnd.datetimeformDateTime;
var datetimeCom= wnd.datetimeform;
var calenderObj=wnd.datetimeform.SubPackageCalender; 
var strObjName;
//var tomm=aqDateTime.AddDays(CurrentDate, 1);


strObjName="datetimeform*"; 
selectPackage("Dated","Adult");
eval("wnd."+strObjName).labelBtnlbl.Click();

selectPackage("Dated","Adult");
aqUtils.Delay(3000);
datetimeCom.SelectApril.Click();
aqUtils.Delay(2000);
datetimeCom.labelBtnlbl.Click();

selectPackage("3 site Combi","Adult");
aqUtils.Delay(3000);
datetimeCom.SelectApril.Click();
aqUtils.Delay(2000);
datetimeCom.labelBtnlbl.Click();


selectPackage("3 site Combi","Adult");
aqUtils.Delay(3000);
datetimeCom.SelectApril.Click();
aqUtils.Delay(2000);
datetimeCom.labelBtnlbl.Click();


////SelectPackageAndSubPackage.selectPackage("2 site Combi (with $2 fee)","Adult");
//datetimeWild.labelBtnlbl.Click();
//
//selectPackage("3 site Combi","Adult");
//datetimeWild.labelBtnlbl.Click();
}