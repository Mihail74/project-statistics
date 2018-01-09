module.exports = {
  apps: [
    {
      name: 'project-statistics',
      script: 'bin/www',
      watch: true,
      env: {
        PORT: 12222,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 12222,
        NODE_ENV: 'production'
      }
    }
  ]
}
