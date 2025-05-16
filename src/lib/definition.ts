import { ChangeEvent } from "react";

export interface InventoryList {
    id: number;
    pc_name: string;
    name: string;
    mac_address: string;
    computer_type: string;
    specs: string;
    supplier: string;
    is_active_id: number;
    date_pullout: string;
    date_purchased: string;
    date_installed: string;
}

export interface User {
   
    uid?: number,
    name?: string,
    email?: string,
    department?: string,
    password?: string,
    is_active?: number,
    createdAt?: string,
    updatedAt?: string
    
  }
export interface UserProps {
    uid?: number,
    name?: string,
    email?: string,
    department?: string,
    password?: string,
    is_active?: number,
    createdAt?: string,
    updatedAt?: string
}  

export interface AuthUser {
   
    uid?: string | null | undefined;
    username?: string | null | undefined;
    role_id: number | null | undefined
        
}


export interface MobileInventoryList {
    id: number;
    assigned_to?: string;
    department?: string;
    brand?: string;
    model_specs?: string;
    imei?: string;
    email_password?: string;
    number?: string;
    serial_number?: string;
    inclusion?: string;
    date_issued?: string;
    date_returned?: string;
    is_active_id?: number;
    email?: string;
    plan?: string;
}

export interface PrinterInventoryList {
    id: number;
    printer_name: string;
    assigned_to: string;
    department: string;
    manufacturer: string;
    model: string;
    ink_type: string;
    serial_number: string;
    description: string;
    comment: string;
    date_purchased: string;
    date_installed: string;
    date_pullout: string;
    is_active_id: number;
}

export interface fetchMobileInventoryList {
    id: number;
    assigned_to: string;
    department: string;
    imei: string;
    serial_number: string;
    date_issued: string;
    source_table: string;
}

export interface FetchInventoryList {
    id: number;
    pc_name: string;
    mac_address: string;
    computer_type: string;
    specs: string;
    supplier: string;
    date_purchased: string;
    source_table: string;
}

export type CreateList = {
    id: number;
    pc_name: string;
    mac_address: string;
    computer_type: string;
    specs: string;
    supplier: string;
    date_purchased: string;
}

export interface ServerAccountsInventory {
    id: number;
    name: string;
    department: string;
    username: string;
    password: string;
    is_active_id: number;
    notes: string;
}

export interface ActivityLogInventory {
    id: number;
    user_id: number;
    user_name: string;
    actions: string;
    details: string;
    company_name: string;
    date_created: string;
}

export interface SupplyInventory {
    id: number;
    item_no: string;
    name: string;
    manufacturer: string;
    description: string;
    cost_per_item: number;
    stock_quantity: number;
    inventory_value: number;
    reorder_level: number;
    days_per_reorder: number;
    item_reorder_quantity: number;
    item_discontinued: string;
}

export interface DeliverInventory {
    id: number;
    quantity: number;
    item_name: string;
    description: string;
    location: string;
    name: string;
    date_acquired: string
}

export interface ReturnInventory {
    id: number;
    date_returned: string;
    item_name: string;
    item_description: string;
    quantity: number;
    name: string;
}

export interface NasInventory {
    id: number;
    name: string;
    company_name: string;
    ip_address: string;
    mac_address: string;
    manufacturer: string;
    model: string;
    specs: string;
    location_area: string;
    date_purchased: string;
    date_installed: string;
    status?: boolean;
}

export interface AssetInventory {
    id: number;
    person_in_charge: string;
    asset_type: string;
    amount: string;
    supplier: string;
    po_number: number | string;
    invoice_date: string;
    delivery_date: string
}

export interface PortProps {
    id?: number | string,
    name: string
}

export interface PortContextProps {
    portList: PortProps[];
    setPortList: (portList: PortProps[]) => void
    selectedPort: PortProps | null;
    setSelectedPort: (port: PortProps | null) => void
    portRefresh: () => void
}

export interface MonitorProps {
    id?: number;
    assigned_to?: string;
    brand?: string;
    model?: string;
    cost?: string;
    serial_number?: string;
    port_compatibility_id?: string;
    company_table?: number | undefined;
    date_purchased?: string;
    date_installed?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface MonitorContextProps {
    monitorList: MonitorProps[];
    selectedMonitor: MonitorProps;
    setMonitorList: (monitorList: MonitorProps[]) => void
    setSelectedMonitor: (monitor: MonitorProps) => void
    monitorRefresh: () => void
}

export interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    children: React.ReactNode;
}

export interface ChildrenModalProps {
    id?: number;
    name?: string;
    asset_type?: string;
    modalOpen: boolean;
    isSocketConnected?: boolean;
    setModalOpen: (open: boolean) => void;
    setIsSocketConnected?: (open: boolean) => void;
    onSubmit?: () => void;
}

export interface Option {
    value?: number | string;
    title?: string;
}

export interface SelectProps {
    label?: string;
    navbar?: boolean;
    name?: string;
    computerType?: boolean;
    selectedValue?: number | string
    options?: Option[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    
}

export interface InputProps {
    name?: string;
    label?: string;
    navbar?: boolean;
    placeholder?: string;
    type?: string;
    value?: string | number
    disabled?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
    bg?: boolean;
}

export interface TextAreaProps {
    name: string;
    label: string;
    navbar?: boolean;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string ;
    rows?: number;
    disabled?: boolean;
  }
  // Date Input
export interface InputDateProps {
    name: string;
    value?: string;
    navbar?: boolean;
    label?: string;
    type: string;
}

export interface TableName {
    name: string;
    accounts: string;
    company: string;
    table: string;
    displayName: string;
}

export interface CompanyContextType {
    tableData: CompanyProps[];
    setTableData: (tableData: CompanyProps[]) => void
    selectedCompany: CompanyProps | null;
    setSelectedCompany: (table: CompanyProps) => void
    companyRefresh: () => void
}

export interface ButtonContextProps {
    isCreating: boolean;
    isEditing: boolean;
    isArchiving: boolean;
    setIsEditing: (open: boolean) => void;
    setIsArchiving: (open: boolean) => void;
    toggleCreate: () => void;
    toggleEdit: (id: number | undefined) => void;
    toggleArchive:(id: number) => void;
}

export interface CompanyProps {
    id?: number;
    name?: string;
    code?: string;
    table_name?: string;
    logo_image?: string;
    is_active?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface TableColumn {
    key: string;
    label?: string;
}

export interface ComputerInventoryProps {
    id?: number;
    name?: string;
    department?: string;
    cost?: string;
    supplier?: string;
    computer_type?: string;
    monitor?: number | string;
    remote_details?: string;
    pc_details?: string;
    specs?: string;
    remarks?: string;
    table_name?: number | string;
    date_purchased?: string;
    date_installed?: string;
    date_returned?: string;
    is_active?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ComputerTaggingProps {
    id?: number;
    control_no?: string;
    name?: string;
    department?: string;
    cost?: string;
    supplier?: string;
    computer_type?: string;
    monitor?: number | string;
    remote_details?: string;
    pc_details?: string;
    specs?: string;
    remarks?: string;
    table_name?: number | string;
    date_purchased?: string;
    date_installed?: string;
    date_returned?: string;
    is_active?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ComputerInventoryContextType {
    computerInventoryList: ComputerInventoryProps[];
    setComputerInventoryList: (computerInventoryList: ComputerInventoryProps[]) => void
    selectedComputer: ComputerInventoryProps | null;
    setSelectedComputer: (computerInventoryList: ComputerInventoryProps) => void
    computerInventoryListRefresh: () => void
    inactiveCount: number
    activeCount: number
}

export interface CellphoneInventoryProps {
    id?: number;
    name?: string;
    department?: string;
    brand?: string;
    cost?: string;
    cp_details?: string;
    plan?: string;
    inclusion?: string;
    specs?: string;
    email_password?: string;
    remarks?: string;
    table_name?: number | string;
    date_ordered?: string;
    date_deployed?: string;
    date_returned?: string;
    is_active?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CellphoneInventoryContextType {
    cellphoneInventoryList: CellphoneInventoryProps[];
    setCellphoneInventoryList: (cellphoneInventoryList: CellphoneInventoryProps[]) => void
    selectedCellphone: CellphoneInventoryProps | null;
    setSelectedCellphone: (computerInventoryList: CellphoneInventoryProps) => void
    cellphoneInventoryListRefresh: () => void
    
}

export interface TaggingProps {
    id?: number;
    asset_id?: number;
    asset_type?: number;
    tagging?: string;
    table_id?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CategoryProps {
    id?: number | string;
    name?: string;
    is_active?: number;
    createdAt?: string;
    updatedAt?: string;
}


export interface AssetInventoryProps {
    id?: number;
    person_in_charge?: string;
    department?: string;
    cost?: string;
    supplier?: string;
    model_number?: string;
    asset_info?: string; // For Computer only
    specs?: string;
    remarks?: string;
    company_id?: number;
    category_id?: number;
    invoice_date?: string;
    invoice_number?: string; 
    date_deployed?: string; // For Computer, Printer and Cellphone only
    date_returned?: string;
    is_active?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface StatusProps {
    id?: number;
    name?: string;
}