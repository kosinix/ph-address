# PH Address
Philippine addresses with PSGC codes.

## Install

#### Choose 1 of 3 options:

Install from NPM:

    npm install ph-address

Install latest from GitHub:

    npm install github:kosinix/ph-address --omit=dev

Tied to a specific version/release from GitHub:

    npm install github:kosinix/ph-address#3.0.0 --omit=dev
    
## Quickstart

Include it:

    const { PhAddress } = require('../index')

    (async () => {

        const phAddress = new PhAddress()
        const addressFinder = await phAddress.useSqlite()
        let addresses = await addressFinder.find('brgy 168')
        console.log(addresses)

    })()
    
    
## Usage
##### phAddress.find($keywords, $limit=10)
Find address starting from barangay level with a given keywords

    let addresses = await addressFinder.find('brgy 168')
    console.log(addresses)
    
returns

    [
        { 
            id: '133901168',
            name: 'Barangay 168, Tondo I/II, NCR, City Of Manila, First District' 
        } 
    ]

### Hierarchy of address: 
* Regions
* Provinces (Does not exist for NCR)
* Districts (NCR only - same level as province but not a province)
* Cities and Municipalities
* Sub Municipalities (NCR only)
* Barangay

## Development

`git clone {path to repo}`

`cd ph-address`

`npm install`


## Updating the PSGC CSV File
This module includes the latest PSGC data (input/PSGC-3Q-2022-Publication-Datafile.xlsx) during the module's publishing.
If you find the data obsolete and wish to manually update, do the following:

* Download PSGC Excel file here: https://psa.gov.ph/classification/psgc/ and put it in `input` dir

* Run `scripts/to-sqlite.js`. See file header comments for usage.

* View database in `sqlite/ph-addresses.db` using [DB Browser for SQLite](https://sqlitebrowser.org/)

* Run test: `node test/find-sqlite.test.js`

