module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@users/(.*)$': '<rootDir>/src/users/$1',
        '^@entities/(.*)$': '<rootDir>/src/entities/$1',
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@auth/(.*)$': '<rootDir>/src/auth/$1',
        '^@accounts/(.*)$': '<rootDir>/src/accounts/$1',
        '^@transactions/(.*)$': '<rootDir>/src/transactions/$1',
    },
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/**/*.{ts,js}',
        '!src/**/*.d.ts',
        '!src/main.ts',
        '!src/**/index.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 25,
            functions: 35,
            lines: 45,
            statements: 45,
        },
    },
};