export const CONTACT = {
  phone: '8220322008',
  phoneDisplay: '82203 22008',
  phoneHref: 'tel:+918220322008',
  whatsapp: '7695850762',
  whatsappDisplay: '76958 50762',
  whatsappHref: 'https://wa.me/917695850762',
  location: 'Yercaud, Shevaroy Hills, Salem District, Tamil Nadu - 636601',
  timing: '6:00 AM – 11:00 PM Daily',
};

export function getWhatsAppUrl(message?: string): string {
  if (!message) {
    return `${CONTACT.whatsappHref}?text=Hi%20Namma%20Yercaud,%20I'm%20planning%20a%20trip%20to%20Yercaud%20and%20need%20details.`;
  }
  return `${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`;
}
