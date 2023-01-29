# PH Address
Philippine addresses using Philippine Standard Geographic Code (PSGC).

## What is this?
This is an npm module that you can include in your projects if you want to use Philippine addresses.

## How does it work?

### Backend:
* In your database you only need to store the PSGC of the barangay. 
* The code for a barangay is self-contained. It is a 10-digit number containing the city/municipality, province, and region.

### Frontend:
* In your front-end you need to implement an autocomplete field of the full address. See `ph-address-demo`.

## Why make this?
For web apps that need to input Philippine address, the usual implementation is:
1. Four fields containing: region, province, city/municipality and barangay.
1. You must provide input to these fields in a sequence. Select region, provinces are listed, select province, city/municipality is listed, select one, barangays are listed, so on and so forth.

This is problematic because this is the reverse of how we fill up form for address on paper. We start with our barangay, then last is province or city.

Also not everyone knows what their region is but everyone knows their barangay.

### With the ph-address implementation, you only need to start typing the barangay and auto suggestions of a full address will show up. You only need an autocomplete field and perhaps a hidden field for the PSGC.


## Install

#### Choose 1 of 3 options:

Install from NPM:

    npm install ph-address

Install latest from GitHub:

    npm install github:kosinix/ph-address --omit=dev

Tied to a specific version/release from GitHub:

    npm install github:kosinix/ph-address#3.0.1 --omit=dev
    
## Quickstart

Include it:

    const { PhAddress } = require('ph-address')

    (async () => {

        const phAddress = new PhAddress()
        const addressFinder = await phAddress.useSqlite()
        let addresses = await addressFinder.find('brgy 168')
        console.log(addresses)

    })()
    

    


## Usage
`phAddress.find(search, minChar = 3, limit = 50, formatter = null)`

Find address starting from barangay level with a given keywords

    const phAddress = new PhAddress()
    const addressFinder = await phAddress.useSqlite()
    let addresses = await addressFinder.find('brgy 168')
    console.log(addresses)
    
Response:

    [
        {
            name: 'Barangay 168, City of Caloocan, National Capital Region (NCR)',
            id: '1380100168'
        },
        {
            name: 'Barangay 168, Pasay City, National Capital Region (NCR)',
            id: '1381100168'
        },
        {
            name: 'Barangay 168, Tondo I/II, City of Manila, National Capital Region (NCR)',
            id: '1380601168'
        }
    ]

NOTE: You can change the response format by providing your own formatter function in the find function.

### Hierarchy of address: 
* Regions
* Provinces (Does not exist for NCR)
* Districts (NCR only - same level as province but not a province)
* Cities and Municipalities
* Sub Municipalities (NCR only)
* Barangay
* SGU - Special Government Unit	(BARMM)



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

