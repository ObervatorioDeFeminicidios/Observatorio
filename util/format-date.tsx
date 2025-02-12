/**
 * formatDate is a function that returns a formatted date string.
 * @param dateKey - The date to format.
 * @returns A formatted date string.
 */
export const formatDate = (dateKey: any) => {
  if (!dateKey) return '-';

  try {
    const date = new Date(dateKey);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Bogota'
    });
  } catch {
    return '-';
  }
}