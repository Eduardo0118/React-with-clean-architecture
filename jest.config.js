module.exports = {
    roots: ['<rootDit>/src'],
    collectCoverageFrom: [
        '<rootDit>/src/**/*.{ts,tsx}'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
}