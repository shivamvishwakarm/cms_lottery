'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Switch } from 'antd';

interface FormProps {
    // Define your props here
}

const Form: React.FC<FormProps> = () => {
    const initialFormData = {
        mobileno: '',
        name: '',
        ticketno: '',
        withdrawaldate: '',
        winPrice: ''
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState<any>(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLotteryOn, setIsLotteryOn] = useState(false);
  

    const handleCheckboxChange = async (checked: boolean) => {
      setIsLoading(true);
      console.log(checked);
      try {
        const response = await axios.patch('/api/setStatus', {
          status: checked
        });
        setIsLotteryOn(checked);
        console.log(response.data);
        alert(checked ? 'The lottery has started.' : 'The lottery has ended.');

      } catch (error) {
        // Handle error here...
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
      
        // Basic form validation
        if (!formData.mobileno || !formData.name || !formData.ticketno || !formData.withdrawaldate || !formData.winPrice) {
          alert('Please fill all fields');
          setIsLoading(false);
          return;
        }
      
        try {
          const response = await axios.post('/api/getData', formData);
          // Handle response here
          setIsSubmitted(true);
          console.log(response.data);
          setFormData(initialFormData);
          // Remove the success message after 2 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 2000);
        } catch (error: any) {
          // Handle error here
          setIsSubmitted(false);
          console.error(error);
          // Set error message based on error
          if (error.response && error.response.data && error.response.data.message) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage('An error occurred while submitting the form');
          }
          // Remove the error message after 2 seconds
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        } finally {
          setIsLoading(false);
        }
      };
    return (
      <> 
       <label className="flex items-center space-x-2">
       <Switch
  checked={isLotteryOn}
  onChange={handleCheckboxChange}
/>
      <span className="text-gray-700">Start The Lottery</span>
    </label>
        <form className="flex flex-col p-6 space-y-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <label className="flex flex-col space-y-1">
                <span className="text-gray-700">Mobile Number:</span>
                <input className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="text" name="mobileno" value={formData.mobileno || ''} onChange={handleInputChange} />
            </label>
            <label className="flex flex-col space-y-1">
                <span className="text-gray-700">Name:</span>
                <input className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="text" name="name" value={formData.name || ''} onChange={handleInputChange} />
            </label>
            <label className="flex flex-col space-y-1">
                <span className="text-gray-700">Ticket Number:</span>
                <input className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="text" name="ticketno" value={formData.ticketno || ''} onChange={handleInputChange} />
            </label>
            <label className="flex flex-col space-y-1">
                <span className="text-gray-700">Wining price:</span>
                <input className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="text" name="winPrice" value={formData.winPrice || ''} onChange={handleInputChange} />
            </label>
            <label className="flex flex-col space-y-1">
                <span className="text-gray-700">Withdrawal Date:</span>
                <input className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="date" name="withdrawaldate" value={formData.withdrawaldate || ''} onChange={handleInputChange} />
            </label>
            {isSubmitted && <p className="text-green-500">Data successfully inserted!</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none" type="submit" disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Submit'}
    </button>        </form> </>
    );
};

export default Form;