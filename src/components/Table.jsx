import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { getSomeData, postSomeData } from '../service/apiService';

export default function TableWithFilter() {
    const [data, setData] = useState([]);
    console.log(data);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [representatives] = useState([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);
    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';
            case 'qualified':
                return 'success';
            case 'new':
                return 'info';
            case 'negotiation':
                return 'warning';
            case 'renewal':
                return null;
            default:
                return 'default';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getSomeData();
                setData(result.data); // Adjust based on actual data structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            global: { value, matchMode: FilterMatchMode.CONTAINS }
        }));
        setGlobalFilterValue(value);
    };

    // const renderHeader = () => (
    //     <div className="flex justify-content-end">
    //         <IconField iconPosition="left">
    //             <InputIcon className="pi pi-search" />
    //             <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
    //         </IconField>
    //     </div>
    // );

    const countryBodyTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <img alt="flag" src={`https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png`} className={`flag flag-${rowData.country}`} style={{ width: '24px' }} />
            <span>{rowData.country}</span>
        </div>
    );

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;

        return (
            <div className="flex align-items-center gap-2">
                <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
                <span>{representative.name}</span>
            </div>
        );
    };

    const representativesItemTemplate = (option) => (
        <div className="flex align-items-center gap-2">
            <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
            <span>{option.name}</span>
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <Tag value={rowData.rank} severity={getSeverity(rowData.rank)} />
    );

    const statusItemTemplate = (option) => (
        <Tag value={option} severity={getSeverity(option)} />
    );

    const verifiedBodyTemplate = (rowData) => (
        <i className={classNames('pi', {
            'true-icon pi-check-circle': rowData.verified,
            'false-icon pi-times-circle': !rowData.verified
        })}></i>
    );

    const representativeRowFilterTemplate = (options) => (
        <MultiSelect
            value={options.value}
            options={representatives}
            itemTemplate={representativesItemTemplate}
            onChange={(e) => options.filterApplyCallback(e.value)}
            optionLabel="name"
            placeholder="Any"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );

    const rankRowFilterTemplate = (options) => (
        <Dropdown
            value={options.value}
            options={statuses}
            onChange={(e) => options.filterApplyCallback(e.value)}
            // itemTemplate={statusItemTemplate}
            placeholder="Select One"
            className="p-column-filter"
            showClear
            style={{ minWidth: '12rem' }}
        />
    );

    const verifiedRowFilterTemplate = (options) => (
        <TriStateCheckbox
            value={options.value}
            onChange={(e) => options.filterApplyCallback(e.value)}
        />
    );

    // const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                value={data}
                paginator
                rows={10}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                // loading={loading}
                globalFilterFields={['name', 'country.name', 'representative.name', 'status']}
                // header={header}
                emptyMessage="No customers found."
            >
                <Column 
                    field="id" 
                    header="S/N" 
                    filterPlaceholder="Search by name" 
                    style={{ minWidth: '1rem' }} 
                />
                <Column
                    field="name" 
                    header="Name" 
                    filterField="name" 
                    style={{ minWidth: '12rem' }} 
                    // body={countryBodyTemplate} 
                    filter 
                    // filterPlaceholder="Search by country" 
                />
                <Column
                    header="Short Name"
                    field="symbol" 
                    // filterField="representative"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '14rem' }}
                    style={{ minWidth: '12rem' }}
                    // body={representativeBodyTemplate}
                    filter
                    // filterElement={representativeRowFilterTemplate}
                />
                <Column
                    field="rank"
                    header="Rank"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '14rem' }}
                    style={{ minWidth: '2rem' }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={rankRowFilterTemplate}
                />
                <Column
                    field="is_active"
                    header="Satus"
                    dataType="boolean"
                    style={{ minWidth: '2rem' }}
                    // body={verifiedBodyTemplate}
                    filter
                    // filterElement={verifiedRowFilterTemplate}
                />
            </DataTable>
        </div>
    );
}
