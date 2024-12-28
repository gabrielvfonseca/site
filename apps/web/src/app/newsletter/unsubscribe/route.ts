import { deleteContact } from '@/lib/server/email/contacts/delete-contact';
import { type NextRequest } from 'next/server';
 
export function POST (request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (email) {
        deleteContact({ email: email });
    }

    return null;
};