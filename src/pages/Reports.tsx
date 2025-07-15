import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import DesignSystemButton from '../design-system/DesignSystemButton';
import DesignSystemTextField from '../design-system/DesignSystemTextField';
import DesignSystemSelect, { StyledMenuItem } from '../design-system/DesignSystemSelect';
import DesignSystemMultiSelect, { MultiSelectOption } from '../design-system/DesignSystemMultiSelect';
import CheckIcon from '@mui/icons-material/Check';
import { MenuItemProps } from '@mui/material/MenuItem';

// Custom menu item that only shows the check icon when inDropdown is true
const DropdownMenuItem: React.FC<MenuItemProps & { checked: boolean; inDropdown: boolean }> = ({ checked, inDropdown, children, ...props }) => (
  <StyledMenuItem {...props}>
    <span>{children}</span>
    {checked && inDropdown && <CheckIcon sx={{ color: '#3D1CBA', fontSize: 18, ml: 2 }} />}
  </StyledMenuItem>
);

const years = ['2025/2026', '2024/2025', '2023/2024'];
const periods = ['Select period', 'Period 1', 'Period 2'];
const payGroups = ['Long Weekly Pay Updated', 'Short Weekly Pay'];
const employeeGroups = ['All Employees', 'Group 1', 'Group 2'];

const standardReports = [
  { name: 'Payroll Summary', tag: 'Read Me' },
  { name: 'Accounting Export', sub: 'Previously Payroll Invoice' },
  { name: 'Payroll Employee by Run' },
  { name: 'Payroll Summary by Run' },
  { name: 'Payslips' },
  { name: 'Deduction Summary' },
  { name: 'Employee Super Advice' },
  { name: 'Payroll Tax' },
  { name: 'Payments Data', tag: 'Beta', tagColor: 'red' },
];

const customReports = [];

const Reports: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [year, setYear] = useState(years[0]);
  const [period, setPeriod] = useState(periods[0]);
  const [payGroup, setPayGroup] = useState(payGroups[0]);
  const [employeeGroup, setEmployeeGroup] = useState(employeeGroups[0]);
  const [dateFrom, setDateFrom] = useState('2025-07-05');
  const [dateTo, setDateTo] = useState('2025-07-05');
  const [selectedPayCalendars, setSelectedPayCalendars] = useState<string[]>([]);
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false);
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);

  const payCalendarOptions: MultiSelectOption[] = [
    { parent: 'ABN 1', children: [
      { value: 'weekly1', label: 'Weekly 1' },
      { value: 'fortnightly1', label: 'Fortnightly 1' },
    ]},
    { parent: 'ABN 2', children: [
      { value: 'weekly2', label: 'Weekly 2' },
      { value: 'fortnightly2', label: 'Fortnightly 2' },
    ]},
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ maxWidth: '1000px', width: '100%', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>Reports</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DesignSystemButton variant="outlined">My Access</DesignSystemButton>
            <DesignSystemButton variant="contained">Report Builder</DesignSystemButton>
          </Box>
        </Box>
        <Paper sx={{ pt: 3, pb: 3, mb: 3, borderRadius: '16px', boxShadow: 'none' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box>
              <DesignSystemSelect
                label="Year"
                value={year}
                onChange={e => setYear(e.target.value)}
                width="130px"
                renderValue={(selected: string) => <span>{selected}</span>}
                SelectProps={{
                  onOpen: () => setYearMenuOpen(true),
                  onClose: () => setYearMenuOpen(false),
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
                        minWidth: '130px',
                        mt: '4px',
                      },
                    },
                    MenuListProps: {
                      sx: { p: 0 },
                    },
                  },
                }}
              >
                {years.map(y => (
                  <DropdownMenuItem key={y} value={y} checked={year === y} inDropdown={yearMenuOpen}>
                    {y}
                  </DropdownMenuItem>
                ))}
              </DesignSystemSelect>
            </Box>
            <Box>
              <DesignSystemSelect
                label="Period"
                value={period}
                onChange={e => setPeriod(e.target.value)}
                width="130px"
                renderValue={(selected: string) =>
                  selected === 'Select period' ? (
                    <span style={{ color: '#6B7280' }}>Select period</span>
                  ) : (
                    <span>{selected}</span>
                  )
                }
                SelectProps={{
                  onOpen: () => setPeriodMenuOpen(true),
                  onClose: () => setPeriodMenuOpen(false),
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
                        minWidth: '130px',
                        mt: '4px',
                      },
                    },
                    MenuListProps: {
                      sx: { p: 0 },
                    },
                  },
                }}
              >
                <DropdownMenuItem value="Select period" checked={false} inDropdown={periodMenuOpen} disabled>
                  <span style={{ color: '#6B7280' }}>Select period</span>
                </DropdownMenuItem>
                {periods.slice(1).map(p => (
                  <DropdownMenuItem key={p} value={p} checked={period === p} inDropdown={periodMenuOpen}>
                    {p}
                  </DropdownMenuItem>
                ))}
              </DesignSystemSelect>
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, mb: 0.5 }}>
                From
              </Typography>
              <DesignSystemTextField
                type="date"
                label=""
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                sx={{ width: 150 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ color: '#111827', fontSize: '14px', fontWeight: 500, mb: 0.5 }}>
                To
              </Typography>
              <DesignSystemTextField
                type="date"
                label=""
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                sx={{ width: 150 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <DesignSystemMultiSelect
                label="Pay calendar"
                options={payCalendarOptions}
                selected={selectedPayCalendars}
                onChange={setSelectedPayCalendars}
                width="100%"
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <DesignSystemSelect
                label="Group"
                value={employeeGroup}
                onChange={e => setEmployeeGroup(e.target.value)}
                width="100%"
                renderValue={(selected: string) => <span>{selected}</span>}
                SelectProps={{
                  onOpen: () => setGroupMenuOpen(true),
                  onClose: () => setGroupMenuOpen(false),
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.08)',
                        minWidth: '100%',
                        mt: '4px',
                      },
                    },
                    MenuListProps: {
                      sx: { p: 0 },
                    },
                  },
                }}
              >
                {employeeGroups.map(g => (
                  <DropdownMenuItem key={g} value={g} checked={employeeGroup === g} inDropdown={groupMenuOpen}>
                    {g}
                  </DropdownMenuItem>
                ))}
              </DesignSystemSelect>
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ p: 0, borderRadius: '16px', boxShadow: 'none', border: '1px solid #E5E7EB' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 3, pt: 2 }}>
            <Tab label={<Typography sx={{ fontWeight: 600, fontSize: 14 }}>Standard Reports</Typography>} />
            <Tab label={<Typography sx={{ fontWeight: 600, fontSize: 14 }}>Custom Reports</Typography>} />
          </Tabs>
          <Box sx={{ px: 3, pt: 2, pb: 3 }}>
            {tab === 0 && (
              <Box>
                {standardReports.map((report, idx) => (
                  <Box key={report.name} sx={{ display: 'flex', alignItems: 'center', borderBottom: idx !== standardReports.length - 1 ? '1px solid #E5E7EB' : 'none', py: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#18113C', minWidth: 220 }}>
                      {report.name}
                      {report.tag && (
                        <Box component="span" sx={{ ml: 1, display: 'inline-block', verticalAlign: 'middle', px: 1, py: 0.25, borderRadius: '6px', bgcolor: report.tagColor === 'red' ? '#FFF1F0' : '#F3F4F6', color: report.tagColor === 'red' ? '#C9150C' : '#18113C', fontSize: 13, fontWeight: 500, border: report.tagColor === 'red' ? '1px solid #C9150C' : '1px solid #E5E7EB' }}>{report.tag}</Box>
                      )}
                    </Typography>
                    {report.sub && (
                      <Typography sx={{ color: '#6B7280', fontSize: 15, ml: 1 }}>{`- ${report.sub}`}</Typography>
                    )}
                    <Box sx={{ flex: 1 }} />
                    <DesignSystemButton variant="outlined" sx={{ minWidth: 120 }}>Export as…</DesignSystemButton>
                  </Box>
                ))}
              </Box>
            )}
            {tab === 1 && (
              <Box sx={{ textAlign: 'center', color: '#6B7280', py: 4 }}>
                <Typography>No custom reports found.</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Reports; 