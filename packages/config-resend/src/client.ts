import { Resend } from 'resend';

import * as dotenv from 'dotenv';

// Import node-fetch
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
