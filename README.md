# Trifid stat.stadt-zuerich.ch

This server provides API access to the linked open statistical data published by the [Statistics Office of the City of Zurich](https://www.stadt-zuerich.ch/statistik).

Features:
* Provides a [Hydra](http://www.hydra-cg.com/) based API

## Installation

This server is based on [Trifid](https://github.com/zazuko/trifid), a [Node.js](http://nodejs.org/) based Linked Data Server.
To install and run it you need Node.js on your system.

Clone the Github repository and run 

    npm install

to install all module dependencies.

Depending on the environment, specifiying the password for the SPARQL Endpoint as environment variable might be necessary:

    export SPARQL_ENDPOINT_PASSWORD=foopass!_987

To start the server with the default configuration (_config.json_), execute the following command:

    npm start


## Continuous Integration and Deployment

Commits pushed to `master` are automatically deployed to _integration_ :

- [stat.integ.stadt-zuerich.ch](https://stat.integ.stadt-zuerich.ch/)

Tags pushed are automatically deployed to _production_ :

- [stat.stadt-zuerich.ch](https://stat.stadt-zuerich.ch)


## API Update

Part of the Hydra API is generated based on the data in the triplestore. As data may vary between environments, also
the generated API may vary and therefore API generation is triggered manually an selective for an environment. 

What                     | integration | apidev | production
------------------------ | ----------- | -------------- | ------------
Directory with API files | *./api*     | *./api_apidev* | *./api_prod*
Purge API files          | `rm -rf api/*` | `rm -rf api_apidev/*` | `rm -rf api_prod/*`
Re-generate API files    | `npm run update-api` | `npm run update-api-apidev` | `npm run update-api-prod`
Start server with API    | `npm start` | `npm run start-apidev` | `cp config.prod.json config.json; npm start`


## License (3-Clause BSD)

Copyright 2018 Statistik Stadt Zürich

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

https://opensource.org/licenses/BSD-3-Clause 
