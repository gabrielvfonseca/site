import { Resend } from 'resend';

import * as dotenv from 'dotenv';

// Import node-fetch
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || 're_iXmSVD9x_DQyYxZ4PnqNBx71g5qg1Ga1D');

export default resend;
