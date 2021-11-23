import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const config:InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  maxConcurrency: 1,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
}

export default config
