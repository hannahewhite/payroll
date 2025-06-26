import React from 'react';
import { DropdownButton } from '../components/DropdownButton';

const PayRunDetails: React.FC = () => {
  return (
    <div>
      <DropdownButton
        variant="outline"
        className="mr-2"
        title="Bulk actions"
        items={[
          { label: 'Resend payslips', onClick: () => {/* TODO: Implement resend payslips */} },
          { label: 'Mark as paid', onClick: () => {/* TODO: Implement mark as paid */} },
          { label: 'Mark as unpaid', onClick: () => {/* TODO: Implement mark as unpaid */} },
          { label: 'Export payslips', onClick: () => {/* TODO: Implement export payslips */} },
          { label: 'Export summary', onClick: () => {/* TODO: Implement export summary */} },
          { label: 'Delete payslips', onClick: () => {/* TODO: Implement delete payslips */} }
        ]}
      />
    </div>
  );
};

export default PayRunDetails; 