public class AccountLocator {
	@AuraEnabled
    public static List<Account> findAll(){
        return [select id, name, BillingLatitude , billinglongitude,BillingStreet,BillingCity from account
                where BillingLatitude !=null
                //where id='0012400000XtWU4AAN' 
                LIMIT 20];
    }
}