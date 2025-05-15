
import React from 'react';
import AccountingLayout from './AccountingLayout';
import IncomeExpenseSection from './sections/IncomeExpenseSection';
import TaxDeadlinesSection from './sections/TaxDeadlinesSection';
import ReportsSection from './sections/ReportsSection';

const Accounting: React.FC = () => {
  return (
    <AccountingLayout title="Accounting & Tax">
      <IncomeExpenseSection />
      <TaxDeadlinesSection />
      <ReportsSection />
    </AccountingLayout>
  );
};

export default Accounting;
