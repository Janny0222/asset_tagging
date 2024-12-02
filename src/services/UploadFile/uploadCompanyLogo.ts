import axios from "axios";

export const uploadCompanyLogo = async (file: File, companyCode: string): Promise<string> => {
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('companyCode', companyCode)
    const { data } = await axios.post('/api/upload', formData);
    return data.filename;
};