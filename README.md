# winston-ninjalog

A ninjalog.io transport for the [winston](https://github.com/winstonjs/winston) logging library.

ninjalog is a secure, open source web service for centralized logging. Checkout [ninjalog.io](http://www.ninjalog.io) to create a free account.

ninjalog.io uses [jwt](http://jwt.io) authentication with rails 5 websockets for live log tailing. Data is persisted via redis and can be downloaded to disk.


## Installation
```bash
$ npm install winston
$ npm install winston-ninjalog
```

## Usage
```js
var winston = require('winston');

var options = {
  email: email,
  client_id: client_id,
  client_secret: client_secret
};

winston.add(require('winston-ninjalog'), options);
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/tysonholub/winston-ninjalog. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
