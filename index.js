var form = require('./models/form710Model');
var form710ToFDFData = require('./lib/form710ToFDFData');
var pdf = require('./lib/pdf');

var newForm = new form({
  formId: "formId",
  loanNumber: "loanNumber",
  servicerName: "servicerName",
  propertyAction: "Vacate the Property", // Keep the Property, Vacate the Property, Sell the Property, Undecided
  propertyType: "An Investment Property", // My Primary Residence, A Second Home, An Investment Property
  propertyStatus: "Owner Occupied", // Owner Occupied, Renter Occupied, Vacant
  borrower: {
    name: "borrower name",
    birthDate: "borrower birthdate",
    homePhone: "borrower homephone",
    cellPhone: "borrower cellphone",
    email: "borrower email",
  },
  coBorrower: {
    name: "coBorrower name",
    birthDate: "coBorrower birthdate",
    homePhone: "coBorrower homephone",
    cellPhone: "coBorrower cellphone",
  },
  mailingAddress: {
    street: "12345 random street",
    city: "Irvine",
    state: "CA",
    zip: "54321"
  },
  propertyAddress: {
    street: "11111 new street",
    city: "Irvine",
    state: "CA",
    zip: "22222"
  },
  isForSale: true,
  saleListingDate: new Date(),
  hasReceivedOffer: true,
  // offerDate: Date,
  // offerAmount: Number,
  // agent: {
  //   name: String,
  //   phone: String
  // },
  // isForSaleByOwner: Boolean,
  // hasContactedCreditAgency: Boolean,
  // creditAgency: {
  //   counselor: {
  //     name: String,
  //     phone: String,
  //     email: String
  //   },
  //   agencyName: String
  // },
  // haveCondominiumOrHOAFees: Boolean,
  // condominiumOrHOAFees: {
  //   totalMonthlyAmount: Number,
  //   fullName: String,
  //   street: String,
  //   city: String,
  //   state: String,
  //   zip: String
  // },
  // haveFiledForBankruptcy: Boolean,
  // bankruptcyFile: {
  //   chapter: String, // Chapter7, Chapter11, Chapter12, Chapter13
  //   date: String,
  //   hasBeenDischarged: Boolean,
  //   caseNumber: String
  // },
  // anyBorrower: {
  //   isActiveDutyServiceMember: Boolean,
  //   hasBeenDeployed: Boolean,
  //   isSurvivingSpouse: Boolean
  // },
  // monthlyHouseholdIncome: {
  //   grossWages: Number,
  //   overtime: Number,
  //   childSupport: Number,
  //   nonTaxableSocialSecurity: Number,
  //   taxableSSBenefits: Number,
  //   selfEmployedIncome: Number,
  //   rentsReceived: Number,
  //   unemploymentIncome: Number,
  //   foodStamps: Number,
  //   other: String,
  //   otherAmount: Number,
  //   totalGrossIncome: Number
  // },
  // monthlyHouseholdExpensesAndDebtPayments: {
  //   firstMortgagePayment: Number,
  //   secondMortgagePayment: Number,
  //   homeownerInsurance: Number,
  //   propertyTaxes: Number,
  //   creditCardsAndInstallmentLoans: Number,
  //   childSupportPayments: Number,
  //   carLeasePayments: Number,
  //   propertyMaintenance: Number,
  //   otherProperties: Number,
  //   other: String,
  //   otherAmount: Number,
  //   totalPayments: Number
  // },
  // householdAssets: {
  //   checkingAccount1: Number,
  //   checkingAccount2: Number,
  //   savings: Number,
  //   certificatesOfDeposits: Number,
  //   stocks: Number,
  //   otherCashOnHand: Number,
  //   otherRealEstate: Number,
  //   other1: String,
  //   other1Amount: Number,
  //   other2: String,
  //   other2Amount: Number,
  //   other3: String,
  //   other3Amount: Number,
  //   totalAssets: Number
  // },
  // otherLiens: String,
  // lien1: {
  //   holderName: String,
  //   balanceAndInterestRate: String,
  //   loanNumber: String,
  //   holderPhoneNumber: String,
  // },
  // lien2: {
  //   holderName: String,
  //   balanceAndInterestRate: String,
  //   loanNumber: String,
  //   holderPhoneNumber: String,
  // },
  // lien3: {
  //   holderName: String,
  //   balanceAndInterestRate: String,
  //   loanNumber: String,
  //   holderPhoneNumber: String,
  // },
  // earnSalaryOrHourlyWage: Boolean,
  // isSelfEmployed: Boolean,
  // haveAdditionalSourcesOfIncome: Boolean,
  // additionalSourcesOfIncome: {
  //   otherEarnedIncome: {
  //     haveDocument: Boolean
  //   },
  //   benefitsAndAssistance: {
  //     haveAmountAndFrequencyDocument: Boolean,
  //     haveReceiptDocument: Boolean
  //   },
  //   rentalIncome: {
  //     haveTaxReturn: Boolean,
  //     haveReceiptOfRent: Boolean
  //   },
  //   investmentIncome: {
  //     haveStatements: Boolean
  //   },
  //   alimonyIncome: {
  //     haveDivorceDecree: Boolean,
  //     haveReceiptOfPayment: Boolean
  //   }
  // },
  // hardshipBeginDate: Date,
  // hardshipLength: String, // Short-term (under 6 months), Medium-term (6 – 12 months), Long-term or Permanent Hardship (greater than 12 months)
  // hardshipReasons: {
  //   isUnemployed: Boolean,
  //   isReductionInIncome: Boolean,
  //   isIncreaseInHousingExpenses: Boolean,
  //   isDivorced: Boolean,
  //   isBorrowerOrWageEarnerDead: Boolean,
  //   isDisabledOrIll: Boolean,
  //   isDisaster: Boolean,
  //   isRelocation: Boolean,
  //   isBusinessFailure: Boolean,
  //   isOther: Boolean
  // },
  // hardshipDocuments: {
  //   divorced: {
  //     hasDivorceDecree: Boolean,
  //     hasSeparationAgreement: Boolean,
  //     hasCreditReport: Boolean,
  //     hasQuitclaimDeed: Boolean
  //   },
  //   borrowerOrWageEarnerDead: {
  //     hasDeathCertificate: Boolean,
  //     hasArticleReportingDeath: Boolean
  //   },
  //   disabledOrIll: {
  //     hasInsuranceOrGovernmentAssistance: Boolean,
  //     hasDocument: Boolean,
  //     hasDoctorCertificate: Boolean,
  //     hasMedicalBills: Boolean
  //   },
  //   disaster: {
  //     hasInsuranceClaim: Boolean,
  //     hasGrantOrLoan: Boolean,
  //     hasPropertyInDisasterArea: Boolean
  //   },
  //   relocation: {
  //     hasTransferDocument: Boolean,
  //     hasPaystub: Boolean
  //   },
  //   businessFailure: {
  //     hasTaxReturn: Boolean,
  //     hasProofOfBusiness: Boolean,
  //     proofOfBusiness: {
  //       hasBankruptcyFiling: Boolean,
  //       hasBankStatements: Boolean,
  //       hasProfitLossStatement: Boolean
  //     }
  //   },
  //   other: Boolean
  // },
  // hasConsentToTextMessaging: Boolean,
  // borrowerSignatureDate: Date,
  // coBorrowerSignatureDate: Date
});

src = "./pdf/form710.pdf";
dest = "./result.pdf";
data = form710ToFDFData(newForm);
images = [
  {
    name: "signature 1",
    src: "./images/yoko.jpg",
    page: 0,
    left: 10,
    bottom: 10,
    width: 100,
    height: 50
  },
  {
    name: "signature 2",
    src: "./images/yoko.jpg",
    page: 1,
    left: 100,
    bottom: 100,
    width: 100,
    height: 50
  }
];

pdf.fillForm(src, dest, data, images);
