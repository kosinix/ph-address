# PH Address
Philippine addresses with PSGC codes.

## Install

#### Choose 1 of 3 options:

Install from NPM:

    npm install ph-address

Install latest from GitHub:

    npm install github:kosinix/ph-address

Tied to a specific version/release from GitHub:

    npm install github:kosinix/ph-address#1.0.0
    
## Quickstart

Include it:

    const phAddress = require('ph-address')
    
    console.log(phAddress.regions)
    
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


##### phAddress.groupedCitiesMunsByProvince
Return object containing cities/municipalities with province code as key. 
Sorted alphabetically:

     {
        '1013':[ // Bukidnon Province
            {
                id: 1158,
                psgcCode: '101301000',
                citymunDesc: 'Baungon',
                regDesc: '10',
                provCode: '1013',
                citymunCode: '101301'
            },
            ...
        ],
        '1018': [ // Camiguin Province
            {
                id: 1180,
                psgcCode: '101801000',
                citymunDesc: 'Catarman',
                regDesc: '10',
                provCode: '1018',
                citymunCode: '101801'
            }
        ]
        ...
    }



##### phAddress.groupedProvincesByRegion
Return object containing provinces with region code as key:
    
    {
        '10': [ // Region 10
            ...
            {
                id: 54,
                psgcCode: '101800000',
                provDesc: 'Camiguin',
                regCode: '10',
                provCode: '1018'
            },
            ...
        ],
        '11': [ // Region 11
            {
                id: 61,
                psgcCode: '118200000',
                provDesc: 'Compostela Valley',
                regCode: '11',
                provCode: '1182'
            }
            ...
        ]
        ...
    }



##### phAddress.regions
Return array of objects containing regions:

    [
        {
            id: 1,
            psgcCode: '010000000',
            regDesc: 'Region I (Ilocos Region)',
            regCode: '01'
        },
        {
            id: 2,
            psgcCode: '020000000',
            regDesc: 'Region II (Cagayan Valley)',
            regCode: '02'
        },
        {
            id: 3,
            psgcCode: '030000000',
            regDesc: 'Region III (Central Luzon)',
            regCode: '03'
        },
        ...
    ]
    
##### phAddress.provinces
Return array of objects containing provinces:

##### phAddress.citiesMuns
Return array of objects containing cities and municipalities:

##### phAddress.citiesNcr
Return array of objects containing NCR cities:


### Hierarchy of address: 
* Regions
* Provinces (Does not exist for NCR)
* Districts (NCR only - same level as province but not a province)
* Cities and Municipalities
* Sub Municipalities (NCR only)
* Barangay

