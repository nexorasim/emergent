/**
 * Transactease Payment Gateway Client
 * Version: 1.7
 */

import api from './api';

const TRANSACTEASE_API = '/api/payments/transactease';

/**
 * Initiate a payment request
 * @param {Object} paymentData - Payment details
 * @returns {Promise<Object>} Payment form data and URL
 */
export const initiatePayment = async (paymentData) => {
  try {
    const response = await api.post(`${TRANSACTEASE_API}/initiate`, {
      amount: paymentData.amount,
      invoice_no: paymentData.invoiceNo,
      customer_name: paymentData.customerName,
      customer_phone: paymentData.customerPhone,
      customer_email: paymentData.customerEmail,
      address_line1: paymentData.addressLine1 || 'Yangon',
      address_line2: paymentData.addressLine2 || 'Myanmar',
      city: paymentData.city || 'Yangon',
      postal_code: paymentData.postalCode || '11211',
      state: paymentData.state || 'Yangon',
      country: paymentData.country || 'MM',
      remark: paymentData.remark || 'eSIM Purchase',
      user_defined1: paymentData.esimProfileId || '',
      user_defined2: paymentData.planId || '',
      user_defined3: paymentData.userId || '',
      user_defined4: '',
      user_defined5: ''
    });
    return response.data;
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw error;
  }
};

/**
 * Submit payment form to Transactease gateway
 * @param {string} paymentUrl - Gateway URL
 * @param {Object} formData - Form fields
 */
export const submitPaymentForm = (paymentUrl, formData) => {
  // Create a hidden form and submit it
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = paymentUrl;
  form.style.display = 'none';

  // Add all form fields
  Object.entries(formData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  // Append to body and submit
  document.body.appendChild(form);
  form.submit();
};

/**
 * Get payment status
 * @param {string} requestId - Payment request ID
 * @returns {Promise<Object>} Payment status
 */
export const getPaymentStatus = async (requestId) => {
  try {
    const response = await api.get(`${TRANSACTEASE_API}/status/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Payment status check failed:', error);
    throw error;
  }
};

/**
 * Process payment - combines initiate and submit
 * @param {Object} paymentData - Payment details
 */
export const processPayment = async (paymentData) => {
  try {
    // Step 1: Initiate payment and get form data
    const result = await initiatePayment(paymentData);
    
    if (result.success) {
      // Step 2: Store request ID for tracking
      localStorage.setItem('pending_payment_request_id', result.request_id);
      
      // Step 3: Submit form to gateway
      submitPaymentForm(result.payment_url, result.form_data);
    } else {
      throw new Error('Payment initiation failed');
    }
    
    return result;
  } catch (error) {
    console.error('Payment processing failed:', error);
    throw error;
  }
};

/**
 * Response code messages
 */
export const RESPONSE_CODES = {
  '000': 'Success',
  '001': 'Transaction Failed',
  '002': 'Transaction Canceled',
  '012': 'Invalid Field Information',
  '016': 'Invalid Hash Value',
  '998': 'Invalid Authorization',
  '999': 'Invalid Authentication'
};

/**
 * Get response message from code
 * @param {string} code - Response code
 * @returns {string} Human-readable message
 */
export const getResponseMessage = (code) => {
  return RESPONSE_CODES[code] || 'Unknown Error';
};

export default {
  initiatePayment,
  submitPaymentForm,
  getPaymentStatus,
  processPayment,
  getResponseMessage,
  RESPONSE_CODES
};
