const campaignEmail = 'vote4garishan@gmail.com';

const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const phonePattern = /^[0-9+().\-\s]{10,}$/;

export function validatePhone(value: string): boolean {
  return !value || phonePattern.test(value.trim());
}

export function validatePostalCode(value: string, required = false): boolean {
  const trimmed = value.trim();
  if (!trimmed) return !required;
  return postalCodePattern.test(trimmed);
}

export function validateEmail(value: string, required = false): boolean {
  const trimmed = value.trim();
  if (!trimmed) return !required;
  return /.+@.+\..+/.test(trimmed);
}

export function buildMailto(subject: string, body: string): string {
  return `mailto:${campaignEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function clearCustomValidity(...elements: Array<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>): void {
  elements.forEach((element) => element?.setCustomValidity(''));
}

export function setCustomValidity(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null, message: string): void {
  element?.setCustomValidity(message);
}
