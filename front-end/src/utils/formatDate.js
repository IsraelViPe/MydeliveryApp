export default function formatDate(originalDate) {
  const date = new Date(originalDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const formatedDate = `${day}/${month}/${year}`;
  return formatedDate;
}
