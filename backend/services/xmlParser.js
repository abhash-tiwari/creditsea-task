const xml2js = require('xml2js');
const fs = require('fs').promises;

class XMLParserService {
  static async parseXMLFile(filePath) {
    try {
      const xmlData = await fs.readFile(filePath, 'utf8');
      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xmlData);
      
      return this.extractCreditReport(result.INProfileResponse);
    } catch (error) {
      throw new Error(`Error parsing XML file: ${error.message}`);
    }
  }

  static extractCreditReport(data) {
    if (!data || !data.Current_Application || !data.Current_Application.Current_Application_Details) {
      throw new Error('Invalid XML structure: Missing required fields');
    }
    
    const currentApplicant = data.Current_Application.Current_Application_Details.Current_Applicant_Details || {};
    const caisSummary = data.CAIS_Account?.CAIS_Summary || {};
    const caisAccounts = Array.isArray(data.CAIS_Account?.CAIS_Account_DETAILS) 
      ? data.CAIS_Account.CAIS_Account_DETAILS 
      : [data.CAIS_Account?.CAIS_Account_DETAILS].filter(Boolean);

    return {
      basicDetails: {
        name: `${currentApplicant.First_Name || ''} ${currentApplicant.Last_Name || ''}`.trim(),
        mobilePhone: currentApplicant.MobilePhoneNumber || 'N/A',
        pan: currentApplicant.IncomeTaxPan || caisAccounts[0]?.CAIS_Holder_Details?.Income_TAX_PAN || 'N/A',
        creditScore: 0
      },
      
      reportSummary: {
        totalAccounts: parseInt(caisSummary.Credit_Account?.CreditAccountTotal) || 0,
        activeAccounts: parseInt(caisSummary.Credit_Account?.CreditAccountActive) || 0,
        closedAccounts: parseInt(caisSummary.Credit_Account?.CreditAccountClosed) || 0,
        currentBalanceAmount: parseInt(caisSummary.Total_Outstanding_Balance?.Outstanding_Balance_All) || 0,
        securedAccountsAmount: parseInt(caisSummary.Total_Outstanding_Balance?.Outstanding_Balance_Secured) || 0,
        unsecuredAccountsAmount: parseInt(caisSummary.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured) || 0,
        lastSevenDaysCreditEnquiries: 0
      },
      
      creditAccounts: this.extractCreditAccounts(caisAccounts)
    };
  }

  static extractCreditAccounts(accounts) {
    return accounts.map(account => {
      if (!account || !account.CAIS_Holder_Address_Details) {
        return {
          accountType: account?.Account_Type || 'Unknown',
          bankName: account?.Subscriber_Name?.trim() || 'Unknown',
          accountNumber: account?.Account_Number || 'N/A',
          amountOverdue: parseFloat(account?.Amount_Past_Due) || 0,
          currentBalance: parseFloat(account?.Current_Balance) || 0,
          address: { street: 'N/A', city: 'N/A', state: 'N/A', postalCode: 'N/A' }
        };
      }
      
      const address = account.CAIS_Holder_Address_Details;
      return {
        accountType: account.Account_Type || 'Unknown',
        bankName: account.Subscriber_Name?.trim() || 'Unknown',
        accountNumber: account.Account_Number || 'N/A',
        amountOverdue: parseFloat(account.Amount_Past_Due) || 0,
        currentBalance: parseFloat(account.Current_Balance) || 0,
        address: {
          street: address.First_Line_Of_Address_non_normalized || 'N/A',
          city: address.City_non_normalized || 'N/A',
          state: address.State_non_normalized || 'N/A',
          postalCode: address.ZIP_Postal_Code_non_normalized || 'N/A'
        }
      };
    });
  }
}

module.exports = XMLParserService;
