# BelCovid-db

This was built as a backend companion to
[BelCovid](https://belcovid.herokuapp.com), in order to avoid fetching the full
Sciensano json files every day for every user. A cron is setup via
[cron-job.org](https://www.cron-job.org) to update a MongoDB database twice a
day. The database only contains deep diffs from one update to the other. This
way the client can query the diff between its state of the data and the current
state, and avoid redownloading everything again.

In addition, the data is pre-processed here to be formatted for the needs of
[BelCovid](https://belcovid.herokuapp.com).

## Data Structures

All data drom Sciensano is normalized in the following way (drawing inspiration
from typescript syntax for ease of presentation of interfaces).

With:
```js
// Two distributions of age groups exist, due to the way Sciensano reports its data.
CaseAgeGroups = [
    '0-9',
    '10-19',
    '20-29',
    '30-39',
    '40-49',
    '50-59',
    '60-69',
    '70-79',
    '80-89',
    '90+',
    'Age unknown'
];
MortalityAgeGroups = [
    '0-24',
    '25-44',
    '45-64',
    '65-74',
    '75-84',
    '85+',
    'Age unknown'
];
interface AgeSortedFigures<('cases' | 'mortality') as T> {
    total: number,
    [T === 'cases' ? CaseAgeGroups : MortalityAgeGroups]: number, // for each age group
}
interface Provinces {
    be: 'Belgium',
    ant: 'Antwerpen',
    ovl: 'OostVlaanderen',
    vbr: 'VlaamsBrabant',
    lim: 'Limburg',
    wvl: 'WestVlaanderen',
    hnt: 'Hainaut',
    lge: 'Liège',
    lux: 'Luxembourg',
    nam: 'Namur',
    brw: 'BrabantWallon',
    bxl: 'Brussels',
}
```
The data itself looks like this:
```ts
interface cases {
    [province: keyof Provinces]: { // for each province
        [date: string]: AgeSortedFigures<'cases'>, // for each date
    },
}
// The number of people occupying a hospital bed.
interface totalHospitalizations {
    [province: keyof Provinces]: { // for each province
        [date: string]: number, // for each date
    },
}
// The number of new hospital admissions.
interface newHospitalizations {
    [province: keyof Provinces]: { // for each province
        [date: string]: number, // for each date
    },
}
// The number of people occupying an ICU bed.
interface totalICU {
    [province: keyof Provinces]: { // for each province
        [date: string]: number, // for each date
    },
}
interface mortality {
    be: {
        [date: string]: AgeSortedFigures<'mortality'>, // for each date
    },
    [province: keyof Provinces]: {}, // for each province but 'be' (data unavailable)
}
interface tests {
    [province: keyof Provinces]: { // for each province
        [date: string]: number, // for each date
    },
}
```

## API

### `/:variable/:idFrom`

This route is the one to use to get a diff of the data, to build it back from.
- `variable` is the data to be fetched and can be one of the following:
    - `'cases'`
    - `'totalHospitalizations'`
    - `'newHospitalizations'`
    - `'totalICU'`
    - `'mortality'`
    - `'tests'`
- `idFrom` is optional and is the ID of the last fetched diff. If none is
  provided, a full diff is returned, from `[]` to the latest data.

Returns:
```js
{
    start: [
        id: string,
        datetime: Date,
    ],
    end: [
        id: string,
        datetime: Date,
    ],
    changes: object
}
```
where:
- `start` is a tuple with the id of the start diff and the time of its fetching.
- `end` is a tuple with the id of the end diff and the time of its fetching.
  That id is the one to send back to the API for an update at a later date.
- `changes` is the diff itself.

### `/update`

This route is called by a CRON to update the data twice a day (at 6am and 6pm),
and is not meant to be called outside of that context.

## Usage

The diffs are computed using the
[changeset](https://www.npmjs.com/package/changeset) package from npm. To build
back the data from a diff, simply import the package and use it to recompute the
data.

```js
import diff from 'changeset';

const oldData = []; // Your stale data from another day.
const lastDiffId = '123-abc-456'; // The ID received on your last API fetch.
const url = `https://belcovid-db.herokuapp.com/cases/${lastDiffId}`;
const dataDiff = await (await fetch(url).json());
const data = diff.apply(dataDiff.changes, oldData);
```
