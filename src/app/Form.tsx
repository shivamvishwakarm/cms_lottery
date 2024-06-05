'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface FormProps {
    // Define your props here
}

const Form: React.FC<FormProps> = () => {
    const initialFormData = {
        mobileno: '',
        name: '',
        ticketno: '',
        withdrawaldate: ''
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState<any>(false);
    const [errorMessage, setErrorMessage] = useState('');



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic form validation
        if (!formData.mobileno || !formData.name || !formData.ticketno) {
            alert('Please fill all fields');
            return;
        }
        // Send a POST request to your API endpoint
        axios.post('/api/getData', formData)
            .then(response => {
                // Handle response here
                setIsSubmitted(true);
                console.log(response.data);
                setFormData(initialFormData);


        // Remove the success message after 2 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 2000);

            })
            .catch(error => {
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
            });
    };

    return (
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
                <span className="text-gray-700">Withdrawal Date:</span>
                <input className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-blue-500" type="date" name="withdrawaldate" value={formData.withdrawaldate || ''} onChange={handleInputChange} />
            </label>
            {isSubmitted && <p className="text-green-500">Data successfully inserted!</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none" type="submit">Submit</button>
        </form>
    );
};

export default Form;