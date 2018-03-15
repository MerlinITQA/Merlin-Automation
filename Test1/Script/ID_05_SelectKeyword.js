//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectPaymentType
//USEUNIT WrapperFunction


//Selection of Keyword functionlity 
function SelectKeyword()
{
 //   InitializationEnviornment.initiliaze();
 //   AppLoginLogout.login();
     //   WrapperFunction.selectKeyword("Reservations");
//    WrapperFunction.selectKeyword("Daily Admission");
//    WrapperFunction.selectKeyword("Complimentary");
//    WrapperFunction.selectKeyword("Trade");
//    WrapperFunction.selectKeyword("Schools");
//    WrapperFunction.selectKeyword("Non Merlin Combo");
//    selectPaymentTypeDropDown.
//    AppLoginLogout.logout();

//    paymentTypeBal="20.85";
//    
//    var paymentTypeBalBefore= aqConvert.StrToInt(paymentTypeBal);
//    Log.Message("paymentTypeBalBefore :"+paymentTypeBalBefore);
//    
//    var paymentTypeBalAfter=(Math.floor(paymentTypeBalBefore));
//    Log.Message("paymentTypeBalAfter :"+paymentTypeBalAfter);
    
    function Rounders()
{
    var PositiveFloat1=123.456;
    var PositiveFloat2=123.567;
    var NegativeFloat1=-123.456;
    var NegativeFloat2=-123.567;

    Log.Message("Using the Floor method")
    Log.Message(Math.floor(PositiveFloat1));  //Result is: 123
    Log.Message(Math.floor(PositiveFloat2));  //Result is: 123
    Log.Message(Math.floor(NegativeFloat1));  //Result is: -124
    Log.Message(Math.floor(NegativeFloat2));  //Result is: -124

    Log.Message("Using the Ceil method")
    Log.Message(Math.ceil(PositiveFloat1));   //Result is: 124
    Log.Message(Math.ceil(PositiveFloat2));   //Result is: 124
    Log.Message(Math.ceil(NegativeFloat1));   //Result is: -123
    Log.Message(Math.ceil(NegativeFloat2));   //Result is: -123

    Log.Message("Using the Round method")
    Log.Message(Math.round(PositiveFloat1));  //Result is: 123
    Log.Message(Math.round(PositiveFloat2));  //Result is: 124
    Log.Message(Math.round(NegativeFloat1));  //Result is: -123
    Log.Message(Math.round(NegativeFloat2));  //Result is: -124
}
    
    
}

