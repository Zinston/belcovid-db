export const AGE_GROUPS_CASES = [
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
export const AGE_GROUPS_MORTALITY = [
    '0-24',
    '25-44',
    '45-64',
    '65-74',
    '75-84',
    '85+',
    'Age unknown'
];
export const PROVINCES = {
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
};
export const PROVINCE_KEYS = Object.keys(PROVINCES).reduce((obj, key) => {
    obj[PROVINCES[key]] = key;
    return obj;
}, {});
export const URLS = {
    hospitalizations: 'https://epistat.sciensano.be/Data/COVID19BE_HOSP.json',
    tests: 'https://epistat.sciensano.be/Data/COVID19BE_tests.json',
    cases: 'https://epistat.sciensano.be/Data/COVID19BE_CASES_AGESEX.json',
    mortality: 'https://epistat.sciensano.be/Data/COVID19BE_MORT.json',
};
