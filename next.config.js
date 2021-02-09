module.exports = {
    env: {
        'MYSQL_HOST': 'localhost',
        'MYSQL_PORT': '3306',
        'MYSQL_DB': 'next_test',
        'MYSQL_USER': 'next',
        'MYSQL_PW': 'kakuryou4liye'
    },
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty',
                net: "empty", // then i put the 'net' line,
                tls: "empty"
            }
        }

        return config
    }
}