export const sendWhatsAppMessage = (phone, message) => {
  if (!phone) return;
  
  let digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
  
  let finalPhone = digits;
  if (digits.length === 10) {
    finalPhone = `91${digits}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    finalPhone = digits;
  }
  
  const waUrl = `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};
