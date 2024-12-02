import { InputDateProps, InputProps, SelectProps, TextAreaProps } from '@/lib/definition';
import React from 'react';



export const Input: React.FC<InputProps> = ({disabled, name, label, placeholder, type, onChange, value, navbar, bg }) => {
  return (
    <div className='text-sm w-full'>
      <label htmlFor={name} className={`${navbar ? 'text-navbar' : 'text-white'} font-semibold text-xs`}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={`w-full text-sm mt-1 p-2 border border-border rounded text-navbar bg-main`}
        
      />
    </div>
  );
};

export const InputCost: React.FC<InputProps> = ({disabled, name, label, placeholder, type, onBlur, onChange, value, navbar, bg }) => {
  return (
    <div className='text-sm w-full'>
      <label htmlFor={name} className={`${navbar ? 'text-navbar' : 'text-white'} font-semibold text-xs`}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={`w-full text-sm mt-1 p-2 border border-border rounded text-navbar bg-main`}
        onBlur={onBlur}
      />
    </div>
  );
};

export const InputDate: React.FC<InputProps> = ({disabled,onChange, navbar, name, value, label, type }) => {
  return (
    <div className='text-sm w-full'>
      <label htmlFor={name} className={`${navbar ? 'text-navbar' : 'text-white'} font-semibold text-xs`}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full text-sm mt-1 p-[0.4rem] border border-border rounded text-navbar bg-main`}
        disabled={disabled}
      />
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({selectedValue, computerType, options, navbar, name, label, onChange }) => {
  return (
    <div className='text-sm w-full'>
      <label htmlFor={name} className={`${navbar ? 'text-navbar' : 'text-white'} font-semibold text-xs`}>{label}</label>
        <select disabled={computerType} value={selectedValue} className="w-full mt-1 px-2 py-2 text-navbar bg-main border border-border rounded" onChange={onChange}>
            <option value="">Please select</option> 
            {options.map((option, index) => (
                <option key={index} value={option?.value}>
                    {option?.title}
                </option>
            ))}
        </select>
    </div>
  );
};

export const SelectMonitor: React.FC<SelectProps> = ({selectedValue, computerType, options, navbar, name, label, onChange }) => {
  return (
    <div className='text-sm w-full'>
      <label htmlFor={name} className={`${navbar ? 'text-navbar' : 'text-white'} font-semibold text-xs`}>{label}</label>
        <select value={selectedValue} className="w-full mt-2 px-2 py-2 text-navbar bg-main border border-border rounded" onChange={onChange}>
            <option value="">Please select</option>
            {options.map((option, index) => (
                <option key={index} value={option?.value}>
                    {option?.title}
                </option>
            ))}
        </select>
    </div>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({disabled, name, label, navbar, placeholder, onChange, value, rows }) => {
  return (
    <div className='text-sm w-full'>
      <label htmlFor={name} className={`${navbar ? 'text-navbar' : 'text-white'} font-semibold text-xs`}>{label}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        rows={rows}
        disabled={disabled}
        className="w-full text-sm mt-2 p-2 border border-border rounded text-navbar bg-main"
      />
    </div>
  );
};

export const InputFile: React.FC<InputProps> = ({disabled, name, label, placeholder, type, onChange, value, navbar, bg }) => {
  return (
    <div className='text-sm w-full'>
      <label htmlFor={name} className={`${navbar ? 'text-navbar' : 'text-white'} font-semibold text-xs`}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        {...(type !== 'file' ? { value: '' } : {})}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`w-full text-sm mt-1 p-2 border border-border rounded text-navbar bg-main`}
      />
    </div>
  );
};
