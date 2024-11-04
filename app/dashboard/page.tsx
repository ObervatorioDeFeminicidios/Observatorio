import { redirect } from 'next/navigation';
import { API_ROUTES } from '../api';

export default async function Dashboard() {
  redirect(API_ROUTES.registration);
}
