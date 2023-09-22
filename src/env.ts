import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  DISCORD_BOT_ID: z.string().nonempty(),
  DISCORD_TOKEN: z.string().nonempty(),
  SHEET_ID: z.string().nonempty(),
  SHEET_STARTING_DATE: z.string().nonempty(),
});

export const ENV = envSchema.parse(process.env);