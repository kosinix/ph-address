# PH Address
Philippine addresses with PSGC codes.

## Install

#### Choose 1 of 3 options:

Install from NPM:

    npm install ph-address

Install latest from GitHub:

    npm install github:kosinix/ph-address

Tied to a specific version/release from GitHub:

    npm install github:kosinix/ph-address#2.0.0
    
## Quickstart

Include it:

    const phAddress = require('../index').useMemory()
    
    phAddress.find('brgy 168').then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.error(err)
    })
    
    
## Usage
##### phAddress.find($keywords, $limit=10)
Find address starting from barangay level with a given keywords

    console.log(phAddress.find('brgy 168'))
    
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

