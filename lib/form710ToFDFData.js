var moment = require('moment');

module.exports = function createData(form) {
  var data = {
    'Loan Number': form.loanNumber,
    'If yes please complete the counselor contact information below': '',
    'Counselors Name': '',
    'Agencys Name': '',
    'Do you have condominium or homeowner association HOA fees Yes No Total monthly amount   Name and address that fees are paid to': '',
    undefined_4: '',
    fill_24: '',
    fill_26: '',
    fill_30: '',
    fill_32: '',
    fill_34: '',
    fill_36: '',
    fill_38: '',
    fill_39: '',
    fill_41: '',
    fill_44: '',
    fill_45: '',
    fill_48: '',
    fill_50: '',
    fill_54: '',
    fill_56: '',
    fill_52: '',
    fill_59: '',
    fill_57: '',
    fill_63: '',
    fill_61: '',
    Other_2: '',
    fill_64: '',
    Other_4: '',
    fill_66: '',
    'Total Household Expenses and Debt': '',
    Other_5: '',
    fill_68: '',
    fill_70: '',
    fill_71: '',
    fill_73: '',
    'Balance and Interest Rate': '',
    'Lien Holders NameRow1': '',
    'Balance and Interest RateRow1': '',
    'Loan NumberRow1': '',
    'Lien Holders Phone NumberRow1': '',
    'Lien Holders NameRow2': '',
    'Balance and Interest RateRow2': '',
    'Loan NumberRow2': '',
    'Lien Holders Phone NumberRow2': '',
    'Lien Holders NameRow3': '',
    'Balance and Interest RateRow3': '',
    'Loan NumberRow3': '',
    'Lien Holders Phone NumberRow3': '',
    undefined_14: '',
    'No hardship documentation required_3': '',
    'No hardship documentation required_4': '',
    'Divorce decree signed by the court OR': '',
    'Separation agreement signed by the court OR': '',
    'Current credit report evidencing divorce separation or nonoccupying': '',
    'Recorded quitclaim deed evidencing that the nonoccupying Borrower or co': '',
    'Death certificate OR': '',
    'Proof of monthly insurance benefits or government assistance if applicable OR': '',
    'Doctors certificate of illness or disability OR': '',
    'Medical bills': '',
    'Insurance claim OR': '',
    'Federal Emergency Management Agency grant or Small Business Administration': '',
    'Borrower or Employer property located in a federally declared disaster area': '',
    'Copy of signed offer letter or notice from employer showing transfer to a new': '',
    'Pay stub from new employer OR': '',
    'Tax return from the previous year including all schedules AND': '',
    'Proof of business failure supported by one of the following': '',
    'Bankruptcy filing for the business OR': '',
    'Two months recent bank statements for the business account evidencing': '',
    'Most recent signed and dated quarterly or yeartodate profit and loss': '',
    'Written explanation describing the details of the hardship and relevant': '',
    Text2: form.servicerName,
    Text7: '',
    Text1: '',
    Text12: '',
    'Check Box2': '',
    'Check Box28': '',
    'Check Box7': '',
    'service member': '',
    deployed: '',
    'surviving spouse': '',
    HOA: '',
    filed: '',
    'Check Box8': '',
    'Check Box9': '',
    'Check Box99': '',
    'Check Box22222': '',
    length: '',
    hardship: '',
    'Check Box10': '',
    'Amount of Offer': '',
    fill_47: '',
    fill_43: '',
    'Check Box111': '',
    'Check Box999': '',
    'Check Box1111': '',
    'Check Box2222': '',
    'Check Box222': '',
    'Check Box222222': '',
    'Written statement or other documentation verifying disability or illness OR': '',
    'Obituary or newspaper article reporting the death': '',
    Text6: '',
    'If yes what is the filing Date': '',
    'Agents Phone Number': '',
    'Agents Name': '',
    'Mortgage Payments on other properties': '',
    Maintenance: '',
    Other: '',
    'Date of offer': '',
    'If yes what was the listing date': form.saleListingDate ? moment(form.saleListingDate).format('L') : '',
    'Counselors Email Address': '',
    'Counselors Phone Number': '',
    fill_28: '',
    fill_22: '',
    'Check Box8678686': ''
  };

  switch(form.propertyAction) {
    case 'Keep the Property':
      data.Group1 = "Choice1";
      break;
    case 'Vacate the Property':
      data.Group1 = "Choice2";
      break;
    case 'Sell the Property':
      data.Group1 = "Choice3";
      break;
    case 'Undecided':
      data.Group1 = "Choice4";
      break;
    default:
      data.Group1 = "Off";
  }

  switch(form.propertyType) {
    case 'A Second Home':
      data.Group4 = "Choice1";
      break;
    case 'An Investment Property':
      data.Group4 = "Choice2";
      break;
    case 'My Primary Residence':
      data.Group4 = "Choice3";
      break;
    default:
      data.Group4 = "Off";
  }

  switch(form.propertyStatus) {
    case 'Owner Occupied':
      data.Group2 = "Choice1";
      break;
    case 'Renter Occupied':
      data.Group2 = "Choice2";
      break;
    case 'Vacant':
      data.Group2 = "Choice3";
      break;
    default:
      data.Group2 = "Off";
  }

  if(form.borrower) {
    data['BORROWERS NAME'] = form.borrower.name;
    data['SOCIAL SECURITY NUMBER'] = "123456789";
    data['DATE OF BIRTH'] = form.borrower.birthDate;
    data['HOME PHONE NUMBER WITH AREA CODE'] = form.borrower.homePhone;
    data['CELL OR WORK NUMBER WITH AREA CODE'] = form.borrower.cellPhone;
    data['EMAIL ADDRESS'] = form.borrower.email;
  }

  if(form.coBorrower) {
    data['COBORROWERS NAME'] = form.coBorrower.name;
    data['SOCIAL SECURITY NUMBER_2'] = "987654321";
    data['DATE OF BIRTH -2'] = form.coBorrower.birthDate;
    data['HOME PHONE NUMBER WITH AREA CODE_2'] = form.coBorrower.homePhone;
    data['CELL OR WORK NUMBER WITH AREA CODE_2'] = form.coBorrower.cellPhone;
  }

  var addr = form.mailingAddress;
  if(addr) {
    data['MAILING ADDRESS'] = `${addr.street}, ${addr.city}, ${addr.state}, ${addr.zip}`;
  }

  var propaddr = form.propertyAddress;
  if(propaddr && propaddr.street) {
    data['PROPERTY ADDRESS IF SAME AS MAILING ADDRESS JUST WRITE SAME'] = `${propaddr.street}, ${propaddr.city}, ${propaddr.state}, ${propaddr.zip}`;
  } else {
    data['PROPERTY ADDRESS IF SAME AS MAILING ADDRESS JUST WRITE SAME'] = 'same';
  }

  if(form.isForSale !== undefined) {
    data['Is the property listed for sale'] = form.isForSale ? "Yes" : "No";
  }

  if(form.saleListingDate !== undefined) {
    data['Check Box22'] = form.isForSale ? "Yes" : "No";
  }

  return data;
};
