import { Resend } from 'resend';

import * as dotenv from 'dotenv';

// Import node-fetch
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || 're_GeG3StnC_8VPALgX29TvknR3aZJBKEv3L');

export default resend;
