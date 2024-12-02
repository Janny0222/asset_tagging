import React, { createContext, useEffect, useState } from 'react';
import { getAllMonitorByCompany, getAllMonitors, getSpecificMonitor } from '@/services/MonitorInventory/monitorService';
import { MonitorContextProps, MonitorProps } from '@/lib/definition';
import { useCompanyStore } from '@/stores/companyStore';

const defaultContext: MonitorContextProps = {
    monitorList: [],
    setMonitorList: () => {},
    selectedMonitor: {},
    setSelectedMonitor: () => {},
    monitorRefresh: () => {}
}

export const MonitorContext = createContext<MonitorContextProps>(defaultContext);

export const MonitorProvider = ({ children }: { children: React.ReactNode }) => {
    const [monitorList, setMonitorList] = useState<MonitorProps[]>([]);
    const [selectedMonitor, setSelectedMonitor] = useState<MonitorProps>();
    const { selectedCompany } = useCompanyStore();

    const fetchMonitors = async () => {
        const monitors = await getAllMonitors();
        setMonitorList(monitors);
    };

    const fetchMonitorsByCompany = async (company_table: number | undefined) => {
        const monitors = await getAllMonitorByCompany(company_table);
        setMonitorList(monitors);
    }
    useEffect(() => {
        fetchMonitorsByCompany(selectedCompany?.id);
    }, [selectedCompany?.id]);

    const monitorRefresh = async () => {
        fetchMonitorsByCompany(selectedCompany?.id);
        fetchMonitors();
    }

    return (
        <MonitorContext.Provider
            value={{
                monitorList,
                setMonitorList,
                selectedMonitor: selectedMonitor || {},
                setSelectedMonitor,
                monitorRefresh
            }}
        >
            {children}
        </MonitorContext.Provider>
    )
}
