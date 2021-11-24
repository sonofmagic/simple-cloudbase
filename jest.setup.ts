
import { config } from 'dotenv'

config()

process.env.NODE_ENV = 'development'

jest.setTimeout(30000)
